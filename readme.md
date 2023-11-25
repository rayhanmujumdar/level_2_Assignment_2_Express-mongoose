# Assignment - 2 -**Mongoose Express CRUD Mastery**

**Date : 23/11/23**

************Agenda:************

# Analysis:

### Entity/Schema/Model:

- User
    - userId → string
    - username → string
    - password → string
    - fullName
        - firstName → string
        - lastName → string
    - age → number
    - email → string
    - isActive → boolean
    - hobbies → string[]
    - address
        - street → string
        - city → string
        - country → string
    - orders → object[]
- Order
    - productName: string
    - price → int
    - Quantity → number

### Endpoint:

**base url :  api/users/****

- User
  - Create a new user
        
        Method: POST
        
        Access: public
        
        Path: /api/users
        
        Request Body:
        
        - user Data:
            - userId
            - username
            - password
            - fullName
                - firstName
                - lastName
            - age
            - email
            - isActive
            - hobbies → array of string
            - address
                - street
                - city
                - country
        
        Response
        
        - 201
            - success
            - message
            - data → new user data
        - 500
            - success
            - message
            - error
                - code
                - description
    - Get All User
        
        Method: GET
        
        Access: public
        
        Path: /api/users
        
        Response:
        
        - 200
            - success
            - message
            - data → array of object
                - username
                - fullName
                - age
                - email
                - address
        - 500
            - success
            - message
            - error
                - code
                - description
    - Get specific user by userId
        
        Method: GET
        
        Access: public
        
        Path: /api/users/:userId
        
        Response:
        
        - 200
            - success
            - message
            - data
        - 500
            - success
            - message
            - error
                - code
                - description
    - Update user by userId
        
        Method:
        
        Access:
        
        Path:
        
        Request:
        
        - user data
            - userId
            - username
            - fullName
                - firstName
                - lastName
            - age
            - email
            - isActive
            - hobbies → array of string
            - address
                - street
                - city
                - country
        
        Response:
        
        - 200
            - success
            - message
            - data → user updated data
        - 500
            - success
            - message
            - error
                - code
                - description
        
    - Delete user by userId
        
        Method: delete
        
        Access: public
        
        Path: **/api/users/:userId**
        
        Response
        
        - 200
            - success
            - message
            - data → null
        - 500
            - success
            - message
            - error
                - code
                - description
- Order
    - create new order with userId
        
        Method:  PUT
        
        Access: public
        
        Path: /api/users/:userId/**orders**
        
        Request:
        
        - order data
            - productName
            - price
            - quantity
        
        Response
        
        - 200
            - success
            - message
            - data → null
        - 500
            - success
            - message
            - error
                - code
                - description
        
    - All orders for a specific user
        
        Method: GET
        
        Access: public
        
        Path: **/api/users/:userId/orders**
        
        Response:
        
        - 200
            - success
            - message
            - data → order of array
        - 500
            - success
            - message
            - error
                - code
                - description
    - Calculate total price of orders for a specific user
        
        Method: GET
        
        Access: public
        
        Path: **/api/users/:userId/orders/total-price**
        
        Response:
        
        - 200
            - success
            - message
            - data
                - totalPrice
        - 500
            - success
            - message
            - error
                - code
                - description

## Technology / Tools:

- Express → for creating node server
- Router → for handle express api router handle
- mongoose → for management mongodb database
- Zod → for validation
- dotenv → for .env file managing secret data
- morgan → for log my client request
- cors → for cross platform support

## How to Set up project locally?

1. first of all , clone project from git hub
    
    ```jsx
    git clone https://github.com/rayhanmujumdar/level_2_Assignment_2_Express-mongoose.git
    ```
    
2. then install all dependencies
    
    ```jsx
    yarn install
    ```
    
3. this command using to start you project
    
    ```jsx
    yarn run start:dev
    ```
    

## Deploy and Git:

GitHub Link → https://github.com/rayhanmujumdar/level_2_Assignment_2_Express-mongoose

Host Link →  [simple-use-project](https://simple-user-project-rayhanmujumdar.vercel.app/health)

## Reference:

1. Assignment requirement git hub link: [GitHub - Apollo-Level2-Web-Dev/L2-B2-assignment-2: Assignment-2 (Batch-2)](https://github.com/Apollo-Level2-Web-Dev/L2-B2-assignment-2)