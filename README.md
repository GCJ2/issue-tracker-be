# Issue Tracker Back End

A REST API using Node.js, Express, knex.js, and SQLite with JSON
webtokens and bcrypt.

# Endpoints

### Authentication

<details>

<summary><b>POST - Registering a new user</b></summary>

<b>Endpoint:</b> `/auth/register`

Requires a user_name, password, first, and last name

```json
{
    "user_name": "JSmith12",
    "password": "8675309",
    "first_name": "John",
    "last_name": "Smith"
}
```

On success, returns status code 201, the user object, and auth token

All users are defaulted to the role of developer and can be made managers
or administrators by administrators only

```json
{
    "user": {
        "userName": "JSmith12",
        "firstName": "John",
        "lastName": "Smith",
        "role": "Developer"
    },
    "token": "eyJhbGciO..."
}
```
</details>

<details>
<summary><b>POST - Logging in a user</b></summary>

<b>Endpoint:</b> `/auth/login`

Requires an object with a valid username and password:

```json
{
  "user_name": "JSmith12",
  "password": "8675309"
}
```

On success, returns status code 201, the user object, and auth token
```json
{
  "user": {
          "id": 18,
          "userName": "JSmith12",
          "firstName": "John",
          "lastName": "Smith",
          "role": "Developer"
      },
  "token": "JhbGciOiJIUzI1NiIsI..."
}
```

</details>

### User

<details>

<summary><b>Get - Get all users</b></summary>

<b>Endpoint:</b> `/users`

No request body required but token is needed

On success, returns status code 200 and array of users

```json
[
    {
        "id": 1,
        "userName": "JSmith12",
        "firstName": "John",
        "lastName": "Smith",
        "role": "Admin"
    },
    {
        "id": 2,
        "userName": "CodyyLee",
        "firstName": "Cody",
        "lastName": "Lee",
        "role": "Manager"
    },
    {
        "id": 3,
        "userName": "Reececap",
        "firstName": "Reece",
        "lastName": "Gabriel",
        "role": "Developer"
    }
]
```

</details>

