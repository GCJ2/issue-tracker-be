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

<summary><b>GET - Get all users</b></summary>

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

<details>

<summary><b>GET - Get user by ID</b></summary>

<b>Endpoint:</b> `/users/:id`

No request body required but token is needed

On success, returns status code 200 and user object

Object contains user's information as well as currently assigned issues

<i>(Example: "baseURL/users/id/2")</i>

```json
{
    "id": 2,
    "userName": "CodyyLee",
    "firstName": "Cody",
    "lastName": "Lee",
    "role": "Manager",
    "issues": [
        {
            "id": 1,
            "title": "Infinite Loop in UserDisplay Component",
            "description": "useEffect on line 16 triggers infinite loop",
            "importance": "Dire",
            "assigned_to": "CodyyLee",
            "created_by": "GCJ2",
            "status": 1,
            "last_updated_by": "Reececap",
            "created_at": "2020-07-28 17:32:00",
            "updated_at": "2020-07-28 17:32:00"
        }
    ]
}
```

</details>

<details>

<summary><b>GET - Get user by username</b></summary>

<b>Endpoint:</b> `/users/:username`

No request body required but token is needed

On success, returns status code 200 and user object

Object contains user's information as well as currently assigned issues

<i>(Example: "baseURL/users/username/QuieroPizza")</i>
```json
{
    "id": 4,
    "userName": "QuieroPizza",
    "firstName": "Gabe",
    "lastName": "Smith",
    "role": "Guest",
    "issues": [
        {
            "id": 3,
            "title": "JSON Web Tokens Not Active",
            "description": "JSON Web Tokens need to replace session cookies",
            "importance": "Major",
            "assigned_to": "QuieroPizza",
            "created_by": "CodyyLee",
            "status": 0,
            "last_updated_by": "GCJ2",
            "created_at": "2020-07-28 17:32:00",
            "updated_at": "2020-07-28 17:32:00"
        },
        {
            "id": 4,
            "title": "Test 4",
            "description": "Test 4",
            "importance": "Major",
            "assigned_to": "QuieroPizza",
            "created_by": "CodyyLee",
            "status": 0,
            "last_updated_by": "GCJ2",
            "created_at": "2020-07-28 17:32:00",
            "updated_at": "2020-07-28 17:32:00"
        }
    ]
}
```

</details>

<details>
<summary><b>PUT - Edit a user</b></summary>

<b>Endpoint:</b> `/users/:id` 

Authorization token required in headers
 
Only the user and system admin may edit user data

Body of request contains changes to be made 

<i>(Example: "baseURL/users/2")</i>

```json
{
    "user_name": "GCJ2",
    "password": "hashedPassword2",
    "first_name": "Greg",
    "last_name": "Johnson"
}
```

On success, returns status code 200 and user object

```json
{
    "id": 1,
    "userName": "GCJ2",
    "password": "hashedPassword2",
    "firstName": "Greg",
    "lastName": "Johnson",
    "role": "Admin"
}
```

</details>

<details>
<summary><b>DELETE - Delete User by ID</b></summary>

<b>Endpoint:</b> `/users/:id` 
</br>Authorization token required in headers. Only the user can delete their own account.
</br>No request body required.

On success, returns status code 200 and success message

<i>(Example: "baseURL/users/21")</i>
```json
{
    "message": "User deleted"
}
```

</details>