# Assembly Parts Backend

A backend system for managing raw parts and assembled parts inventory.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC Pattern

## Features

- CRUD operations for raw parts (purchased from external suppliers)
- CRUD operations for assembled parts (composed of other parts)
- Validation of all incoming requests
- Cost calculation for assembled parts
- Comprehensive test suite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd assembly-parts-backend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file based on `.env.example`
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your MongoDB connection string

### Running the Application

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm run build
npm start
\`\`\`

### Running Tests
\`\`\`bash
npm test
\`\`\`

## API Endpoints

### Parts

- `GET /api/parts` - Get all parts (query param `type` can filter by 'raw' or 'assembled')
- `GET /api/parts/:id` - Get a specific part by ID
- `POST /api/parts/raw` - Create a new raw part
- `POST /api/parts/assembled` - Create a new assembled part
- `PUT /api/parts/raw/:id` - Update a raw part
- `PUT /api/parts/assembled/:id` - Update an assembled part
- `DELETE /api/parts/:id` - Delete a part
- `GET /api/parts/assembled/:id/cost` - Calculate the cost of an assembled part

## Data Models

### Raw Part
\`\`\`json
{
  "name": "Bolt",
  "description": "Standard bolt",
  "price": 1.5,
  "stockQuantity": 100,
  "type": "raw",
  "supplier": "Acme Bolts",
  "partNumber": "B-123"
}
\`\`\`

### Assembled Part
\`\`\`json
{
  "name": "Bracket Assembly",
  "description": "Standard bracket assembly",
  "price": 15,
  "stockQuantity": 20,
  "type": "assembled",
  "components": [
    {
      "part": "60d21b4667d0d8992e610c85",
      "quantity": 4
    },
    {
      "part": "60d21b4667d0d8992e610c86",
      "quantity": 1
    }
  ],
  "assemblyTime": 15,
  "assemblyInstructions": "Attach bolts to bracket"
}
\`\`\`

## Code Structure

- `src/models` - Database models
- `src/controllers` - Request handlers
- `src/services` - Business logic
- `src/routes` - API routes
- `src/dtos` - Data Transfer Objects for validation
- `src/middleware` - Express middleware
- `src/utils` - Utility functions and classes
- `src/tests` - Test files
