# Wallet API Reference

Note: the authentication is required.

### Create a new wallet to a user

#### Request

```http
POST /api/wallet
```

| Parameter | Type     | Description                            |
|:----------|:---------|:---------------------------------------|
| `userId`   | `int`    | **Required**. ID of the user |
| `startingAmount`     | `decimal`    | **Required**. Starting amount of the user (FIAT) |

If record doesn't exist it will be created.

#### Response

```json
{
  "success": "true"
}
```



