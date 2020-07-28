# Issue Tracker Back End

A REST API using Node.js, Express, knex.js, and SQLite with JSON
webtokens and bcrypt.

# Endpoints

### Authentication

<details>

<summary><b>POST - Registering a new user</b></summary>

<b>Endpoint:</b> `/auth/register`

Requires a userName, password, first, and last name

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
    "id": 2,
    "username": "amanda",
    "email": "admin@email.com",
    "created_at": "2019-11-24 22:30:29",
    "avatar_url": "https://static.wixstat...",
    "location": null,
    "about": "Share your story about your art."
  },
  "token": "eyJhbGciOiJ..."
}
```

</details>



