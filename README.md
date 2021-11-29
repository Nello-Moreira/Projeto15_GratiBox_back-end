# Projeto15_GratiBox (back-end)

The idea of this app is to serve as a subscription club for a Zen audience. The user can enroll in different types of plan to receive one or more selected products on the specified date.

This is the back-end repository. You can check the front-end repository [here](https://github.com/Nello-Moreira/Projeto15_GratiBox_front-end)

## Try it yourself!

You can access the [_project url_](https://gratibox-ivory.vercel.app/) and create a profile or use this example one:

- e-mail: teste@teste.com
- password: 123

## How to run

- Clone this repository
- Install all dependencies

```
npm i
```

- Run on terminal: (at project's root directory)

```
 node config.js
```

You'll need to provide the desired name for database. Ex:

```
Enter your database name: gratibox
Enter your username for this database: gratibox_user
Enter your password: ******
Enter your password: ******
```

This step will create a production, a development and a test database and envs variables. It will also create a local user role for postgres database, if it doesn't exist.

- Download and run [front-end repository](https://github.com/Nello-Moreira/Projeto15_GratiBox_front-end)

- Then enter one of the following commands

## Commands to run

| Command                   | Action                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------- |
| npm run start             | Start server at production mode                                                         |
| npm run start:development | Start server at development mode                                                        |
| npm run start:test_driven | Start server at test driven development mode (it runs all tests each time files change) |
| npm run test              | Run all tests once                                                                      |

# API Docs

## Sign-up:

- action: create an account
- route /sign-up
- method: post
- request body:

```
{
  "name": (string),
  "email": (string)@(string)(.com, .net or .com.br),
  "password": (string)
}
```

- response: 201 created
- response: 400 bad request (for invalid body)

## Login:

- action: login
- route /login
- method: post
- request body:

```
{
  "email": (string)@(string)(.com, .net or .br),
  "password": (string)
}
```

- response: 200 OK
- response body:

```
{
  "username": (string),
  "token": (string),
  "isSubscriber": (boolean)
}
```

- response: 400 bad request (for invalid body)
- response: 404 not found (for wrong email or password)

## Plan options:

- action: get plan options and their delivery options
- route /plan-options
- method: get
- response: 200 OK
- response body:

```
[
  {
    "planTypeId": (integer),
    "planType": (string),
    "deliveryOptions": [
      {
        "id": (integer),
        "name": (string)
      }
    ]
  }
]
```

- response: 204 no content

## Products:

- action: get products options
- route /products
- method: get
- response: 200 OK
- response body:

```
[
  {
    "id": (integer),
    "name": (string)
  }
]
```

- response: 204 no content

## States:

- action: get states available for delivery
- route /states
- method: get
- response: 200 OK
- response body:

```
[
  {
    "id": (integer),
    "name": (string),
    "initials": (string)
  }
]
```

- response: 204 no content

## Subscribe:

- action: subscribe user at a plan
- route /subscribe
- request must provide a token (bearer authorization)
- method: post
- request body:

```
{
  "planTypeId": (integer),
  "deliveryOptionId": (integer),
  "productsList": [
    (integer: products id's)
  ],
  "address": {
    "receiverName": (string),
    "zipCode": (string: format "00000-000"),
    "streetName": (string),
    "city": (string),
    "stateId": (integer)
  }
}
```

- response: 201 created
- response: 400 bad request (for invalid body)
- response: 409 conflict (when user is already subscribed)

## Plan informations:

- action: get user plan informations
- route /plan-informations
- request must provide a token (bearer authorization)
- method: get
- response: 200 OK
- response body:

```
{
  "planType": (string),
  "subscriptionDate": (Date),
  "productsList": [
    (string: products names)
  ],
  "nextDeliveries": [
    (Date),
    (Date),
    (Date)
  ] (always length = 3)
}
```

- response: 204 no content (if user isn't subscribed)
