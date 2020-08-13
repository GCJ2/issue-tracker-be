# Issue Tracker Back End

baseURL: https://issue-tracker-be.herokuapp.com/

A REST API using Node.js, Express, knex.js, and SQLite with JSON
webtokens and bcrypt.

# Endpoints

<!------------- Authentication ------------->

### Authentication

<!------------- Register a new User ------------->

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

<!------------- Logging in user ------------->

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

<!------------- User ------------->

### User

<!------------- Get all users ------------->

<details>

<summary><b>GET - Get all users</b></summary>

<b>Endpoint:</b> `/users`

No request body needed

Token required

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

<!------------- Get user by ID ------------->

<details>

<summary><b>GET - Get user by ID</b></summary>

<b>Endpoint:</b> `/user/:id`

No request body needed

Token required

On success, returns status code 200 and user object

Object contains user's information as well as currently assigned issues

<i>(Example: baseURL/users/id/2)</i>

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

<!------------- Get user by username ------------->

<details>

<summary><b>GET - Get user by username</b></summary>

<b>Endpoint:</b> `/users/:username`

No request body needed

Token needed

On success, returns status code 200 and user object

Object contains user's information as well as currently assigned issues

<i>(Example: baseURL/users/username/QuieroPizza)</i>

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

<!------------- Edit a user by ID ------------->

<details>
<summary><b>PATCH - Edit a user by ID</b></summary>

<b>Endpoint:</b> `/users/:id`

Authorization token required in headers

Only the user and system admin may edit user data

Body of request contains changes to be made

<i>(Example: baseURL/users/2)</i>

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

<!------------- Delete user by ID ------------->

<details>
<summary><b>DELETE - Delete User by ID</b></summary>

<b>Endpoint:</b> `/users/:id`
Authorization token required in headers

Only the user can delete their own account

No request body required

On success, returns status code 200 and success message

<i>(Example: baseURL/users/21)</i>

```json
{
  "message": "User deleted"
}
```

</details>

### Issues

<!------------- Issues ------------->

<!------------- Get all issues ------------->
<details>

<summary><b>GET - Get all issues</b></summary>

<b>Endpoint:</b> `/issues`

No request body needed

Token required

On success, returns status code 200 and array of issues

```json
[
  {
    "id": 1,
    "title": "Infinite Loop in UserDisplay Component",
    "description": "useEffect on line 16 triggers infinite loop",
    "importance": "Dire",
    "created_by": "GCJ2",
    "status": 1,
    "assigned_to": "CodyyLee",
    "last_updated_by": "GCJ2",
    "created_at": "2020-07-29 17:24:22",
    "updated_at": "2020-07-29 17:24:22"
  },
  {
    "id": 2,
    "title": "CSS issues in Header",
    "description": "Header not responding to media queries",
    "importance": "Minor",
    "created_by": "GCJ2",
    "status": 1,
    "assigned_to": "Reececap",
    "last_updated_by": "GCJ2",
    "created_at": "2020-07-29 17:24:22",
    "updated_at": "2020-07-29 17:24:22"
  },
  {
    "id": 3,
    "title": "JSON Web Tokens Not Active",
    "description": "JSON Web Tokens need to replace session cookies",
    "importance": "Major",
    "created_by": "CodyyLee",
    "status": 0,
    "assigned_to": "QuieroPizza",
    "last_updated_by": "CodyyLee",
    "created_at": "2020-07-29 17:24:22",
    "updated_at": "2020-07-29 17:24:22"
  }
]
```

</details>

<!------------- Get Issue by issue ID ------------->

<details>

<summary><b>GET - Get Issue by issue ID</b></summary>

<b>Endpoint:</b> `/issues/:id`

No request body needed

Token required

On success, returns status code 200 and issue object

Object contains issue information as well as comments attached to issue

<i>(Example: baseURL/issues/2)</i>

```json
{
  "id": 1,
  "title": "Infinite Loop in UserDisplay Component",
  "description": "useEffect on line 16 triggers infinite loop",
  "importance": "Dire",
  "created_by": "GCJ2",
  "status": 1,
  "assigned_to": "CodyyLee",
  "last_updated_by": "Reececap",
  "created_at": "2020-07-29 17:24:22",
  "updated_at": "2020-07-29 17:24:22",
  "comments": [
    {
      "commentId": 34,
      "comment": "Updated useEffect dependency array.",
      "createdBy": "CodyLee",
      "createdAt": "2020-07-29 17:24:22"
    },
    {
      "commentId": 35,
      "comment": "Infinite loop fixed, flagged for closing.",
      "createdBy": "ReeceCap",
      "createdAt": "2020-07-29 17:24:22"
    },
    {
      "commentId": 36,
      "comment": "Issue closed",
      "createdBy": "GCJ2",
      "createdAt": "2020-07-29 17:24:22"
    }
  ]
}
```

</details>

<!------------- Get Issues by user ID ------------->

<details>

<summary><b>GET - Get Issue by user ID</b></summary>

<b>Endpoint:</b> `/issues/users/:id`

No request body needed

Token required

On success, returns status code 200 and array of issues
assigned to that particular user ID

<i>(Example: baseURL/issues/user/4)</i>

```json
[
  {
    "id": 3,
    "title": "JSON Web Tokens Not Active",
    "description": "JSON Web Tokens need to replace session cookies",
    "importance": "Major",
    "assigned_to": "QuieroPizza",
    "created_by": "CodyyLee",
    "status": 0,
    "last_updated_by": "GCJ2",
    "created_at": "2020-07-29 17:24:22",
    "updated_at": "2020-07-29 17:24:22"
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
    "created_at": "2020-07-29 17:24:22",
    "updated_at": "2020-07-29 17:24:22"
  }
]
```

</details>

<!------------- Post a new issue ------------->

<details>

<summary><b>POST - Posting a new issue</b></summary>

<b>Endpoint:</b> `/issues`

Request body requires a title, description, importance,
created_by(user ID), last_updated_by(user ID) and
assigned_to(user ID)

Token required

<i>(Example: baseURL/issues)</i>

```json
{
  "title": "Update README",
  "description": "Test 5",
  "importance": "Major",
  "created_by": 1,
  "last_updated_by": 1,
  "assigned_to": 3
}
```

On success, returns status code 201, the user object,
and the id of the issue created

```json
[13]
```

</details>

<!------------- Delete issue by ID ------------->

<details>
<summary><b>DELETE - Delete issue by ID</b></summary>

<b>Endpoint:</b> `/issues/:id`

No request body needed

Token required

Only managers can delete issues

On success, returns status code 200 and success message

<i>(Example: baseURL/users/21)</i>

```json
{
  "message": "Issue deleted"
}
```

</details>

<!------------- Edit an issue by ID ------------->

<details>
<summary><b>PATCH - Edit an issue by ID</b></summary>

<b>Endpoint:</b> `/users/:id`

Authorization token required in headers

Only the user and system admin may edit user data

Body of request contains changes to be made

<i>(Example: baseURL/issues/12)</i>

```json
{
  "title": "Update README",
  "description": "Add endpoints",
  "importance": "Major",
  "assigned_to": 3,
  "last_updated_by": 1
}
```

On success, returns status code 200 and issue object

```json
{
  "id": 12,
  "title": "Update README",
  "description": "Add endpoints",
  "importance": "Major",
  "created_by": "GCJ2",
  "status": 1,
  "assigned_to": "Reececap",
  "last_updated_by": "GCJ2",
  "created_at": "2020-07-29 17:54:17",
  "updated_at": "2020-07-29 17:54:17"
}
```

</details>

<!------------- Comments ------------->

### Comments

<!------------- Get all comments ------------->

<details>

<summary><b>GET - Get all comments</b></summary>

<b>Endpoint:</b> `/comments`

No request body needed

Token required

On success, returns status code 200 and array of all comments

```json
[
  {
    "commentId": 34,
    "comment": "Updated useEffect dependency array",
    "createdBy": "GCJ2",
    "createdAt": "2020-07-29 17:24:22",
    "issueId": 1,
    "issue": "Infinite Loop in UserDisplay Component"
  },
  {
    "commentId": 35,
    "comment": "Test 2",
    "createdBy": "GCJ2",
    "createdAt": "2020-07-29 17:24:22",
    "issueId": 1,
    "issue": "Infinite Loop in UserDisplay Component"
  },
  {
    "commentId": 36,
    "comment": "Test 3",
    "createdBy": "CodyyLee",
    "createdAt": "2020-07-29 17:24:22",
    "issueId": 1,
    "issue": "Infinite Loop in UserDisplay Component"
  }
]
```

</details>

<!------------- Get Comment by Comment ID ------------->

<details>

<summary><b>GET - Get comment by comment ID</b></summary>

<b>Endpoint:</b> `/comments/:id`

No request body needed

Token required

On success, returns status code 200 and comment object

Object contains comment ID, the comment itself, the issue id
and name for which it belongs, who wrote the comment, and when

<i>(Example: baseURL/comments/34)</i>

```json
[
  {
    "commentId": 34,
    "issue": "Infinite Loop in UserDisplay Component",
    "issueId": 1,
    "comment": "Updated useEffect dependency array",
    "createdBy": "GCJ2",
    "created_at": "2020-07-29 17:24:22"
  }
]
```

</details>

<!------------- Get Comment by Issue ID ------------->

<details>

<summary><b>GET - Get comment by Issue ID</b></summary>

<b>Endpoint:</b> `/comments/issue/:id`

No request body needed

Token required

On success, returns status code 200 and array of comments

Object contains comment ID, the comment itself, the issue id
and name for which it belongs, who wrote the comment, and when

<i>(Example: baseURL/comments/issue/3)</i>

```json
[
  {
    "commentId": 38,
    "comment": "Updated media queries for mobile",
    "createdBy": "GCJ2",
    "createdAt": "2020-07-29 17:24:22"
  },
  {
    "commentId": 39,
    "comment": "Added mixins",
    "createdBy": "ReeceCap",
    "createdAt": "2020-07-29 17:24:22"
  },
  {
    "commentId": 40,
    "comment": "Removed mixins",
    "createdBy": "CodyLee",
    "createdAt": "2020-07-29 17:24:22"
  },
  {
    "commentId": 44,
    "comment": "Flagged for closing",
    "createdBy": "CodyyLee",
    "createdAt": "2020-07-29 17:24:22"
  }
]
```

</details>

<!------------- Post a new comment ------------->

<details>

<summary><b>POST - Posting a new comment</b></summary>

<b>Endpoint:</b> `/comments`

Request body requires a title, description, importance,
created_by(user ID), last_updated_by(user ID) and
assigned_to(user ID)

Token required

<i>(Example: baseURL/comments)</i>

```json
{
  "comment": "Updated migrations",
  "createdBy": 1,
  "issue": 3
}
```

On success, returns status code 201, and the comment object

Comment object contains comment ID, issue title, issue ID,
comment body, comment author, and when comment was created

```json
[
  {
    "commentId": 46,
    "issue": "JSON Web Tokens Not Active",
    "issueId": 3,
    "comment": "Updated migrations",
    "createdBy": "GCJ2",
    "created_at": "2020-07-29 18:48:15"
  }
]
```

</details>

<!------------- Delete comment by ID ------------->

<details>
<summary><b>DELETE - Delete issue by ID</b></summary>

<b>Endpoint:</b> `/issues/:id`

No request body needed

Token required

Users can only delete their own comments; Managers can delete all comments

On success, returns status code 200 and success message

<i>(Example: baseURL/users/21)</i>

```json
{
  "message": "Comment deleted"
}
```

</details>

<!------------- Edit an comment by ID ------------->

<details>
<summary><b>PATCH - Edit an issue by ID</b></summary>

<b>Endpoint:</b> `/comments/:id`

Authorization token required in headers

Only the user and system admin may edit user data

Body of request contains changes to be made

<i>(Example: baseURL/comments/34)</i>

```json
{
  "comment": "Never mind its fine"
}
```

On success, returns status code 200 and comment

```json
[
  {
    "commentId": 34,
    "comment": "Never mind its fine",
    "createdBy": "GCJ2",
    "createdAt": "2020-07-29 17:24:22",
    "issueId": 1,
    "issue": "Infinite Loop in UserDisplay Component"
  }
]
```

</details>
