# Transactions API Reference

Note: the authentication is required.

### Find all transactions for user

#### Request

```http
GET /api/transactions
```

#### Response

```json
[
  {
    "id": 8,
    "amount": -0.000015,
    "createdAt": "2023-05-24T08:10:26.496Z",
    "updatedAt": "2023-05-24T17:18:32.479Z",
    "currency": "bitcoin"
  },
  {
    "id": 9,
    "amount": 0.001,
    "createdAt": "2023-05-24T08:30:32.101Z",
    "updatedAt": "2023-05-24T17:18:53.359Z",
    "currency": "ethereum"
  },
  {
    "id": 10,
    "amount": 0.0002,
    "createdAt": "2023-05-24T08:44:31.663Z",
    "updatedAt": "2023-05-24T17:18:14.800Z",
    "currency": "bitcoin"
  }
]
```
