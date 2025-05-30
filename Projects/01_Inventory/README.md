# Assembly Parts Backend API

A comprehensive backend system for managing raw parts and assembled parts inventory, built with Express.js, TypeScript, and MongoDB following the MVC architecture pattern.

## 🚀 Features

### Raw Parts Management
- CRUD operations for raw parts purchased from external suppliers
- Stock quantity tracking and management
- Supplier-based part organization
- Low stock alerts and monitoring
- Advanced filtering and search capabilities

### Assembled Parts Management
- CRUD operations for assembled parts composed of other parts
- Component relationship management
- Assembly cost calculation
- Component availability checking
- Skill level categorization
- Assembly time tracking

### Additional Features
- Comprehensive input validation
- Pagination and sorting
- Error handling and logging
- Rate limiting for API protection
- CORS configuration
- Health check endpoints

## 🛠 Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC Pattern
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd assembly-parts-backend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update the \`.env\` file with your configuration:
   \`\`\`env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/assembly-parts
   ALLOWED_ORIGINS=http://localhost:3000
   \`\`\`

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   
   Development mode:
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Production mode:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## 📚 API Documentation

### Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

### Health Check
\`\`\`
GET /health
\`\`\`

### Raw Parts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/raw-parts\` | Get all raw parts with filtering |
| GET | \`/raw-parts/:id\` | Get raw part by ID |
| POST | \`/raw-parts\` | Create new raw part |
| PUT | \`/raw-parts/:id\` | Update raw part |
| DELETE | \`/raw-parts/:id\` | Delete raw part |
| PATCH | \`/raw-parts/:id/stock\` | Update stock quantity |
| GET | \`/raw-parts/low-stock\` | Get low stock parts |
| GET | \`/raw-parts/supplier/:supplier\` | Get parts by supplier |

### Assembled Parts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/assembled-parts\` | Get all assembled parts with filtering |
| GET | \`/assembled-parts/:id\` | Get assembled part by ID |
| POST | \`/assembled-parts\` | Create new assembled part |
| PUT | \`/assembled-parts/:id\` | Update assembled part |
| DELETE | \`/assembled-parts/:id\` | Delete assembled part |
| GET | \`/assembled-parts/:id/cost\` | Calculate total cost |
| GET | \`/assembled-parts/:id/availability\` | Check component availability |
| GET | \`/assembled-parts/skill/:skillLevel\` | Get parts by skill level |

### Query Parameters

#### Filtering and Pagination
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 10, max: 100)
- \`sortBy\`: Sort field (name, price, stockQuantity, createdAt, updatedAt)
- \`sortOrder\`: Sort direction (asc, desc)
- \`search\`: Text search in name and description
- \`minPrice\`: Minimum price filter
- \`maxPrice\`: Maximum price filter
- \`inStock\`: Filter by stock availability (true/false)
- \`category\`: Filter by category (raw parts only)

## 📝 Data Models

### Raw Part
\`\`\`json
{
  "name": "M8 Bolt",
  "description": "Standard M8 hex bolt, 20mm length",
  "price": 0.50,
  "stockQuantity": 1000,
  "supplier": "FastenerCorp",
  "partNumber": "M8-20-HEX",
  "category": "fasteners",
  "weight": 15.5,
  "dimensions": {
    "length": 20,
    "width": 8,
    "height": 8
  }
}
\`\`\`

### Assembled Part
\`\`\`json
{
  "name": "Bracket Assembly",
  "description": "L-shaped mounting bracket with hardware",
  "price": 25.00,
  "stockQuantity": 50,
  "components": [
    {
      "partId": "60d21b4667d0d8992e610c85",
      "partType": "RawPart",
      "quantity": 4,
      "isOptional": false
    },
    {
      "partId": "60d21b4667d0d8992e610c86",
      "partType": "RawPart",
      "quantity": 1,
      "isOptional": false
    }
  ],
  "assemblyInstructions": "1. Position bracket vertically. 2. Insert bolts through holes. 3. Tighten to 10 Nm.",
  "assemblyTime": 15,
  "skillLevel": "beginner"
}
\`\`\`

## 🧪 Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

Run tests with coverage:
\`\`\`bash
npm run test:coverage
\`\`\`

Watch mode:
\`\`\`bash
npm run test:watch
\`\`\`

## 🔍 Code Quality

Linting:
\`\`\`bash
npm run lint
npm run lint:fix
\`\`\`

Formatting:
\`\`\`bash
npm run format
\`\`\`

Type checking:
\`\`\`bash
npm run type-check
\`\`\`

## 🏗 Project Structure

\`\`\`
src/
├── config/          # Database and other configurations
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── validators/      # Input validation rules
├── app.ts           # Express app setup
└── server.ts        # Server entry point
\`\`\`

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request limiting
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses

## 🚀 Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Set production environment variables**
   \`\`\`bash
   export NODE_ENV=production
   export MONGODB_URI=your_production_mongodb_uri
   export PORT=3000
   \`\`\`

3. **Start the application**
   \`\`\`bash
   npm start
   \`\`\`

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.