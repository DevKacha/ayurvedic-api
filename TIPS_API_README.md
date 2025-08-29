# Tips API Documentation

This API provides CRUD operations for tips with a simple structure: auto-incrementing ID and tips string field.

## Base URL
```
http://localhost:3001/api
```

## Data Model

### Tips Schema
```javascript
{
  _id: Number (auto-incrementing),
  tips: String (required), // Main tips content
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### 1. Get All Tips
**GET** `/api/tips`

Returns all tips in the database.

**Response:**
```json
[
  {
    "_id": 1,
    "tips": "Drink warm water with honey and lemon in the morning",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Get Tip by ID
**GET** `/api/tips/:id`

Returns a specific tip by its ID.

**Parameters:**
- `id` (number): The ID of the tip

**Response:**
```json
{
  "_id": 1,
  "tips": "Drink warm water with honey and lemon in the morning",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Create New Tip
**POST** `/api/tips`

Creates a new tip.

**Request Body:**
```json
{
  "tips": "Drink warm water with honey and lemon in the morning for better digestion"
}
```

**Response:** Created tip object (201 status)

### 4. Create Multiple Tips
**POST** `/api/tips/bulk`

Creates multiple tips at once.

**Request Body:**
```json
[
  {
    "tips": "First tip content"
  },
  {
    "tips": "Second tip content"
  },
  {
    "tips": "Third tip content"
  }
]
```

**Response:** Array of created tip objects (201 status)

### 5. Update Tip
**PUT** `/api/tips/:id`

Updates an existing tip by its ID.

**Parameters:**
- `id` (number): The ID of the tip to update

**Request Body:**
```json
{
  "tips": "Updated tip content"
}
```

**Response:** Updated tip object

### 6. Delete Tip
**DELETE** `/api/tips/:id`

Deletes a tip by its ID.

**Parameters:**
- `id` (number): The ID of the tip to delete

**Response:**
```json
{
  "message": "Tip deleted successfully"
}
```

## Example Usage

### Using cURL

**Create a tip:**
```bash
curl -X POST http://localhost:3001/api/tips \
  -H "Content-Type: application/json" \
  -d '{
    "tips": "Drink warm water with honey and lemon in the morning"
  }'
```

**Get all tips:**
```bash
curl http://localhost:3001/api/tips
```

**Get tip by ID:**
```bash
curl http://localhost:3001/api/tips/1
```

**Update a tip:**
```bash
curl -X PUT http://localhost:3001/api/tips/1 \
  -H "Content-Type: application/json" \
  -d '{
    "tips": "Updated tip content"
  }'
```

**Delete a tip:**
```bash
curl -X DELETE http://localhost:3001/api/tips/1
```

**Create multiple tips:**
```bash
curl -X POST http://localhost:3001/api/tips/bulk \
  -H "Content-Type: application/json" \
  -d '[
    {"tips": "First tip"},
    {"tips": "Second tip"},
    {"tips": "Third tip"}
  ]'
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

// Create a tip
const createTip = async () => {
  const response = await axios.post('http://localhost:3001/api/tips', {
    tips: 'Drink warm water with honey and lemon in the morning'
  });
  console.log(response.data);
};

// Get all tips
const getAllTips = async () => {
  const response = await axios.get('http://localhost:3001/api/tips');
  console.log(response.data);
};

// Get tip by ID
const getTipById = async (id) => {
  const response = await axios.get(`http://localhost:3001/api/tips/${id}`);
  console.log(response.data);
};

// Update tip
const updateTip = async (id, newTip) => {
  const response = await axios.put(`http://localhost:3001/api/tips/${id}`, {
    tips: newTip
  });
  console.log(response.data);
};

// Delete tip
const deleteTip = async (id) => {
  const response = await axios.delete(`http://localhost:3001/api/tips/${id}`);
  console.log(response.data);
};
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created successfully
- `400`: Bad request (validation errors)
- `404`: Resource not found
- `500`: Internal server error

Error responses include a message field:
```json
{
  "message": "Error description"
}
```

## Testing

Run the test file to verify all endpoints:
```bash
node test_tips_api.js
```

Make sure your server is running on port 3001 before running the tests.

## Seeding Sample Data

The API comes with 85 pre-seeded Ayurvedic tips. To add these tips to your database:

```bash
node seed_tips.js
```

This will clear existing tips and add 85 comprehensive Ayurvedic health tips covering:
- Digestive health
- Mental wellness
- Physical fitness
- Natural remedies
- Lifestyle practices
- Spiritual well-being

## Adding More Tips

You can add individual tips or multiple tips using the provided scripts:

```bash
# Add individual tips
node add_tip.js

# Or use the API directly
curl -X POST http://localhost:3001/api/tips \
  -H "Content-Type: application/json" \
  -d '{"tips": "Your new tip here"}'
```

## Notes

- The ID field is auto-incrementing and managed by MongoDB
- Only the `tips` field is required when creating or updating tips
- The API automatically adds `createdAt` and `updatedAt` timestamps
- The database is pre-populated with 85 Ayurvedic health tips
