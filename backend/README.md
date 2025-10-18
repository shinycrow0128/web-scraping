# Business Search API Backend

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Run the server:
\`\`\`bash
python main.py
\`\`\`

The API will be available at `http://localhost:8000`

## Endpoints

- `GET /api/search?keyword={keyword}` - Search for businesses by keyword
- `GET /api/history` - Get search history from database
- `GET /` - API health check

## Database

SQLite database (`business_data.db`) will be created automatically on first run.
