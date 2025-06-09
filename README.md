# React-GraphQL Project Management System

- Creating a simple **Project Management System** to **add/manage clients**, **add projects**, **connect projects to clients** 
- Displaying project and client **information** 
- Allow users to **update** the details and **delete** projects
- Creating a **modal** to add new clients and new projects
- Using **express-graphql** package which is GraphQL server for Node.js with tools to use it with Express 
- **Front-end:** React Framework, Bootstrap UI and Apollo Client (GraphQL API)
- **Back-end:** 
    - **Server:** GraphQL, Node.js, Express-graphql (Mongoose ODM) 
    - **Database:** Atlas MongoDB


## Getting Started:

### 1. Setup Backend
1. Create folder `server/` and open it in VSCode integrated terminal
2. Run `npm init -y` and create `package.json` file
3. Install Dependencies: 
    ```
    npm i express express-graphql graphql mongoose cors colors
    ```
    These are required at runtime:
    - `express`: Web server framework.
    - `cors`: Middleware to allow cross-origin requests (e.g., from frontend).
    - `graphql + express-graphql`: For building a GraphQL API.
    - `mongoose`: For connecting to MongoDB.
    - `colors`: Used for styling console output (e.g., colorful logs).

4. Install Dev dependencies: 
    ```
    npm i -D nodemon dotenv
    ```
    Used only during development:
    - `dotenv`: Loads environment variables from `.env`.
    - `nodemon`: Auto-restarts your server on changes during development.

5. Add scripts to `package.json` file:
    ```
    "scripts": {
                "start": "node api/index.js",
                "dev": "nodemon api/index.js"
        }
    ```
    - `yarn start` or `npm start` runs the app using plain Node.js.
    - `yarn dev` or `npm run dev` runs the app using Nodemon, which auto-restarts the server when file changes are detected (useful in development).

6.  Create  `server/.env` file to store environment-specweific variables:
    ```
    NODE_ENV=development
    PORT=5000
    ```
    - `NODE_ENV`: Conventionally used to define the environment *(e.g., 'development', 'production').*
    - `PORT`: Used in `index.js` to determine which port the server should run on.
7. Create `server/.gitignore` file and exclude `.env` file and `node_modules` folder from the git repository:
    ```
    .env
    node_modules
    ```

### 2. Test GraphQL Queries
1. Run the Express server with `npm run dev`
2. Open GraphiQL UI in the browser: `http://localhost:5000/graphql`
3. Run query to get only the client's `name`:
    ```
    {
        client(id: "1"){
                            name
                    }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "client": {
                            "name": "Tony Stark"
                        }
            }
        }
        ```
4. Run query to request all fields:
    ```
    {
        client(id: "1"){
                            id,
                            name,
                            email,
                            phone
                        }
    }
    ```
    - Response:
        ```
        {
            "data": {
                        "client": {
                                    "id": "1",
                                    "name": "Tony Stark",
                                    "email": "ironman@gmail.com",
                                    "phone": "343-567-4333"
                                }
                    }
        }
        ```
5. Run query to request all clients:
    ```
    {
        clients {
                    id,
                    name,
                    email,
                    phone
                }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "clients": [
                {
                    "id": "1",
                    "name": "Tony Stark",
                    "email": "ironman@gmail.com",
                    "phone": "343-567-4333"
                },
                {
                    "id": "2",
                    "name": "Natasha Romanova",
                    "email": "blackwidow@gmail.com",
                    "phone": "223-567-3322"
                },
                {...},
                {...}.
                ...
                ]
            }
        }
        ```