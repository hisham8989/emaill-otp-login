## API Reference

#### Create User

```http
  POST /api/v1/users/create
```

| Body (urlencoded) | Type    | Description   |
| :---------------- | :------ | :------------ |
| `email`           | `email` | **Required**. |

#### Generate OTP

```http
  POST /api/v1/auth/generate-otp
```

| Parameter | Type    | Description   |
| :-------- | :------ | :------------ |
| `email`   | `email` | **Required**. |

#### Login

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `email`   | `email`  | **Required**.                             |
| `otp`     | `string` | **Required**. will recieve in email inbox |

## Demo

Insert gif or link to demo

https://emaill-otp-login.onrender.com/

take reference from api section
