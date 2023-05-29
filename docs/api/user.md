# User API Reference

Note: the authentication is required.

### Get all user data

#### Request

```http
GET /api/user
```

#### Response

```json
{
  "user": {
    "id": 2,
    "email": "a@a.it",
    "name": "admin",
    "surname": "admin",
    "Wallet": {
      "id": 10,
      "startingAmount": "1000"
    }
  }
}
```

### Create a new user

#### Request

```http
POST /api/user
```

| Parameter | Type     | Description                            |
|:----------|:---------|:---------------------------------------|
| `name`   | `string`    | **Required**. Name of the user |
| `surname`     | `string`    | **Required**. Surname of the user |
| `email`  | `string` | **Required**. Email of the user |
| `password`  | `string` | **Required**. Password of the user |

If record doesn't exist it will be created.

#### Response

```json
{
  "success": "true"
}
```
