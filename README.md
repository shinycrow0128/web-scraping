# Connecticut Business Search Platform

A full-stack web application for searching and exploring business entities registered in Connecticut.

## Tech Stack

- **Frontend**: Next.js 15 with React
- **Backend**: FastAPI (Python)
- **Database**: SQLite
- **UI**: shadcn/ui components with Tailwind CSS

## Features

- Search business entities by keyword
- Fetch data from Connecticut's open data API
- Display comprehensive business information including:
  - Entity Name
  - Business Address
  - Mailing Address
  - Date Formed
  - NAICS Code
  - Business Email
  - Principal Name
- Store search results in SQLite database
- Responsive design (desktop table view, mobile card view)
- Modern dark theme interface

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install Python dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Start the FastAPI server:
\`\`\`bash
python main.py
\`\`\`

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env.local` file with:
\`\`\`
BACKEND_URL=http://localhost:8000
\`\`\`

3. Start the Next.js development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Backend (FastAPI)
- `GET /api/search?keyword={keyword}` - Search for businesses
- `GET /api/history` - Get search history from database

### Frontend (Next.js)
- `GET /api/search?keyword={keyword}` - Proxy to backend search
- `GET /api/history` - Proxy to backend history

## Database Schema

SQLite table: `businesses`
- `id` - Primary key
- `business_id` - Unique business identifier
- `entity_name` - Business name
- `business_address` - Physical address
- `mailing_address` - Mailing address
- `date_formed` - Registration date
- `naics_code` - Industry classification code
- `business_email` - Contact email
- `principal_name` - Principal contact name
- `created_at` - Record creation timestamp

## Data Sources

This application fetches data from Connecticut's open data portal:
- Business entities: https://data.ct.gov/resource/n7gp-d28j.json
- Principal information: https://data.ct.gov/resource/ka36-64k6.json
\`\`\`



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay13YWl0aW5nLXYxIiwiY3JlYXRlZEF0IjoxNzYwODI5NjQyODYxLCJmaW5pc2hlZEF0IjoxNzYwODI5NjQyODYxLCJpZCI6InpTNHY3ZGlHRlNsN2pHUXIiLCJsYXN0UGFydFNlbnRBdCI6MTc2MDgyOTY0Mjg2MSwicGFydHMiOlt7InR5cGUiOiJ0b29sLWNhbGxzIn1dfQ==" />



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay1tYW5hZ2UtdG9kb3MtdjEiLCJpZCI6Ik82ZDkwU2JQZWVzZHNPNVkiLCJ0YXNrTmFtZUFjdGl2ZSI6IkNvbXBsZXRpbmcgcHJvamVjdCIsInRvb2xDYWxsSWQiOiJ0b29sdV8wMUVMS29EbkN4NHNSeWdYZTF3dEZxY2MiLCJ0YXNrTmFtZUNvbXBsZXRlIjoiUHJvamVjdCBjb21wbGV0ZWQiLCJjcmVhdGVkQXQiOjE3NjA4Mjk2NDM2MzUsImZpbmlzaGVkQXQiOm51bGwsInBhcnRzIjpbXSwibGFzdFBhcnRTZW50QXQiOm51bGx9" />
