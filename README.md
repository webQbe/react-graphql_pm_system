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
7. Create `server/.gitignore` file to exclude `.env` file and `node_modules` folder from the git repository:
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
5. Run query to request all fields of all clients:
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
6. Run query to request name field of all clients:
    ```
    {
        clients {
                    name
                }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "clients": [
                                {
                                    "name": "Tony Stark"
                                },
                                {
                                    "name": "Natasha Romanova"
                                },
                                {
                                    "name": "Thor Odinson"
                                },
                                {
                                    "name": "Steve Rogers"
                                },
                                {
                                    "name": "Bruce Banner"
                                }
                ]
            }
        }
        ```

7. Run query to request name field of all projects:
    ```
    {
        projects {
                    name
                }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "projects": [
                                {
                                    "name": "eCommerce Website"
                                },
                                {
                                    "name": "Dating App"
                                },
                                {
                                    "name": "SEO Project"
                                },
                                {
                                    "name": "Design Prototype"
                                },
                                {
                                    "name": "Auction Website"
                                }
                ]
            }
        }
        ```

8. Run query to request `name`, `status`, and `description` fields of all projects:
    ```
    {
        projects {
                     name,
                     status,
                     description
                }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "projects": [
                                {
                                    "name": "eCommerce Website",
                                    "status": "In Progress",
                                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu."
                                },
                                {
                                  ...
                                },
                                {
                                   ...
                                },
                ]
            }
        }
        ```


9. Run query to request `name`, `status`, and `description` fields of a single `project`:
    ```
    {
        project(id: "1") {
                            name,
                            status,
                            description
                        }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "project": {
                            "name": "eCommerce Website",
                            "status": "In Progress",
                            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu."
                }
            }
        }
        ```

10. Run query to request the fields of a single `project` and the `name` and `id` of its `client`:
    ```
    {
        project(id: "1") {
                            name,
                            status,
                            description,
                            client {
                                     name,
                                     id
                                }
                        }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "project": {
                    "name": "eCommerce Website",
                    "status": "In Progress",
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
                    "client": {
                                "name": "Tony Stark",
                                "id": "1"
                            }
                    }
            }
        }
        ```

### 3. Setup MongoDB

1. Log in to MongoDB Cloud: `https://cloud.mongodb.com`
2. Click on **`mongodb_basics`** dropdown and select **New Project**
    1. Name Your Project: `PM System`
    2. **Create Project**
3. **Create Cluster**
    1. Choose **Free** plan
    2. **Create Deployment**
4. Copy database user's credentials > **Create Database User** > Close
5. In **Cluster0** > Click **Add data** 
6. In **Add Data Options** > **Create Dataset** > **Create Database on Atlas** > **START**
7. In **Create Database on Atlas** :
    1. Enter a name for your new database : `pm_system`
    2. Enter a name for your new collection : `clients`
    3. **Create Database**
8. Download and Install **MongoDB Compass**
9. Go back to **Database** > **Overview**
10. Click **Connect** > Add current IP address
11. Select **Compass** option and copy the **connection string**
12. Open **MongoDB Compass** > **Add New Connection**
    1. Enter your **connection string** to the URI section
    2. Edit the **connection string**:
        1. `mongodb+srv://<username>:<db_password>@cluster0.z7eoin2.mongodb.net/<database_name>`
        2. Replace `<username>`, `<password>` and `<database_name>`
    3. Click **Save & Connect**
    4. Open your database `pm_system` and `clients` collection
13. Go back to **Database** > **Overview** > **Connect**
    1. Select **Connect to your application** > **Drivers**
    2. Copy the connection string
14. Go back to VSCode 
    1. Open `server/.env` file
    2. Add line with connection string:
        ```
        MONGO_URI=mongodb+srv://<username>:<db_password>@cluster0.z7eoin2.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0
        ```
15. Create folder and file: `server/api/config/db.js`
16. Run the server and check `MongoDB Connected: ....` is logged


### 4. Test GraphQL Mutations
1. Run the Express server with `npm run dev`
2. Open GraphiQL UI in the browser: `http://localhost:5000/graphql`
3. Run **mutation** to add a new client:
    ```
    mutation {
        addClient(name: "Tony Stark", email: "ironman@gmail.com", phone: "555-555-5555"){
            id
            name
            email
            phone
        }
    }
    ```
    - Response:
        ```
        {
            "data": {
                "addClient": {
                                "id": "68485aa62d3bb8d863ce475c",
                                "name": "Tony Stark",
                                "email": "ironman@gmail.com",
                                "phone": "555-555-5555"
                             }
            }
        }
        ```
4. Open **MongoDB Compass**
    1. Connect to MongoDB cluster
    2. Select your database `pm_system` > `clients` (model)
    3. See the new client you added