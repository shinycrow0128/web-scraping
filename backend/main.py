from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import sqlite3
from typing import List, Optional
import urllib.parse
from contextlib import asynccontextmanager

# Database initialization
def init_db():
    conn = sqlite3.connect('business_data.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS businesses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id TEXT UNIQUE,
            entity_name TEXT,
            business_address TEXT,
            mailing_address TEXT,
            date_formed TEXT,
            naics_code TEXT,
            business_email TEXT,
            principal_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    yield
    # Shutdown (if needed)

app = FastAPI(lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BusinessEntity(BaseModel):
    business_id: str
    entity_name: str
    business_address: str
    mailing_address: str
    date_formed: Optional[str]
    naics_code: Optional[str]
    business_email: Optional[str]
    principal_name: Optional[str]

@app.get("/")
async def root():
    return {"message": "Business Search API"}

@app.get("/api/search")
async def search_businesses(keyword: str):
    if not keyword:
        raise HTTPException(status_code=400, detail="Keyword is required")
    
    # Clean keyword for URL
    clean_keyword = keyword.lower().replace(' ', '').replace('&', '').replace('-', '').replace('.', '').replace(',', '')
    
    # Fetch business entities
    business_url = f"https://data.ct.gov/resource/n7gp-d28j.json?$where=(lower(replace(replace(replace(replace(replace(name, ' ', ''), '%26', ''), '-', ''), '.', ''), ',', '')) like '%25{clean_keyword}%25')&$order=name asc"
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(business_url)
            response.raise_for_status()
            businesses = response.json()
            
            results = []
            
            # Fetch principal info for each business
            for business in businesses[:50]:  # Limit to 50 results
                business_id = business.get('business_id', '')
                
                if not business_id:
                    continue
                
                # Fetch principal information
                principal_url = f"https://data.ct.gov/resource/ka36-64k6.json?$where=(business_id='{business_id}')"
                
                try:
                    principal_response = await client.get(principal_url)
                    principal_response.raise_for_status()
                    principals = principal_response.json()
                    principal = principals[0] if principals else {}
                except Exception as e:
                    print(f"Error fetching principal for {business_id}: {e}")
                    principal = {}
                
                # Build business address
                address_parts = []
                if business.get('billingstreet'):
                    address_parts.append(business['billingstreet'])
                if business.get('billingcity'):
                    address_parts.append(business['billingcity'])
                if business.get('billingstate'):
                    address_parts.append(business['billingstate'])
                if business.get('citizenship') and business.get('citizenship', '').lower() != 'domestic':
                    address_parts.append(business['citizenship'])
                if business.get('billingpostalcode'):
                    address_parts.append(business['billingpostalcode'])
                
                business_address = ', '.join(address_parts) if address_parts else 'N/A'
                
                # Create business entity
                entity = {
                    'business_id': business_id,
                    'entity_name': business.get('name', 'N/A'),
                    'business_address': business_address,
                    'mailing_address': business.get('mailing_address', 'N/A'),
                    'date_formed': business.get('date_registration', 'N/A'),
                    'naics_code': business.get('naics_code', 'N/A'),
                    'business_email': business.get('business_email_address', 'N/A'),
                    'principal_name': principal.get('name__c', 'N/A')
                }
                
                # Save to database
                save_to_db(entity)
                results.append(entity)
            
            return {"results": results, "count": len(results)}
    
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

def save_to_db(entity: dict):
    conn = sqlite3.connect('business_data.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT OR REPLACE INTO businesses 
            (business_id, entity_name, business_address, mailing_address, 
             date_formed, naics_code, business_email, principal_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            entity['business_id'],
            entity['entity_name'],
            entity['business_address'],
            entity['mailing_address'],
            entity['date_formed'],
            entity['naics_code'],
            entity['business_email'],
            entity['principal_name']
        ))
        conn.commit()
    except Exception as e:
        print(f"Error saving to database: {e}")
    finally:
        conn.close()

@app.get("/api/history")
async def get_history():
    conn = sqlite3.connect('business_data.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT business_id, entity_name, business_address, mailing_address,
               date_formed, naics_code, business_email, principal_name
        FROM businesses
        ORDER BY created_at DESC
        LIMIT 100
    ''')
    
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        results.append({
            'business_id': row[0],
            'entity_name': row[1],
            'business_address': row[2],
            'mailing_address': row[3],
            'date_formed': row[4],
            'naics_code': row[5],
            'business_email': row[6],
            'principal_name': row[7]
        })
    
    return {"results": results, "count": len(results)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
