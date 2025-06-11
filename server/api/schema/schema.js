 /* GraphQL Schema */

 // Mongoose models
 const Project = require('../models/Project');
 const Client = require('../models/Client');

 const { GraphQLObjectType, 
         GraphQLID, 
         GraphQLString, 
         GraphQLSchema, 
         GraphQLList,
         GraphQLNonNull
        } = require('graphql');

 // Defines what a Client object looks like in GraphQL
 const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString } 
 })
});

 // Project Type
 const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        /* Find the corresponding client in the clients array */
        client: { // Allow GraphQL to also fetch the associated client
            type: ClientType,
            resolve(parent, args) { 
                // Fetch corresponding Client document from MongoDB
                return Client.findById(parent.clientId); 
                /* `parent` is the current project object that GraphQL is resolving
                    `parent.clientId` refers to the ID of the client associated with this project */
            }
        }
 })
});

// Define the queries clients can make to the API
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // Define query that returns a single client by ID
        client:{
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Fetch a single client by _id from MongoDB
                return Client.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType), // Return an array of objects shaped like ClientType
            // Return the clients array from sampleData.js
            resolve(parent, args){  
                // Fetch all clients from MongoDB
                return Client.find();
            }
        },
        // Define queries that return project data
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Fetch a single project by _id from MongoDB
                return Project.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType), 
            resolve(parent, args){  
                // Fetch all projects from MongoDB
                return Project.find();
            }
        }
    }
});

// Create root Mutation object
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /* Add a client */
        addClient: {
            type: ClientType, // return newly created client object
            args: { 
                    /* Required input fields */
                    name: { type: GraphQLNonNull(GraphQLString) },
                    email: { type: GraphQLNonNull(GraphQLString) },
                    phone: { type: GraphQLNonNull(GraphQLString) },
                    /* GraphQLNonNull means all fields must be provided */
            },
            // resolve() runs when mutation is called
            resolve(parent, args) { 
                // Create new instance of `Client` Mongoose model using `args` values 
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                // Save the instance to MongoDB and return saved object
                return client.save();
            },
        },
        /* Delete a client */
        deleteClient:{
            type: ClientType, // Tells GraphQL that mutation returns deleted Client object
            args: { // accept a single required argument
                id: { type: GraphQLNonNull(GraphQLID) } // MongoDB ObjectId of client to delete
            },
            resolve(parent, args){
                // delete client with given ID from database
                return Client.findByIdAndDelete(args.id); // Return deleted client object
            },
        },
    },
});

// Export the Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation  // Add mutation capabilities
})