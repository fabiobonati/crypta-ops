# Crypta Ops

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



## Authors

- [@diegocividini](https://www.github.com/diegocividini)
- [@fabiobonati](https://www.github.com/fabiobonati)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Contributing

Contributions are always welcome!

See `README.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo

- [cryptaops.it](https://www.cryptaops.it)

