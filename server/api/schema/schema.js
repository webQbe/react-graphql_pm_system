 /* GraphQL Schema */

 // Mongoose models
 const Project = require('../models/Project');
 const Client = require('../models/Client');

 const { GraphQLObjectType, 
         GraphQLID, 
         GraphQLString, 
         GraphQLSchema, 
         GraphQLList,
         GraphQLNonNull, 
         GraphQLEnumType
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
            async resolve(parent, args){

                // Remove all projects tied to this client first
                await Project.deleteMany({ clientId: args.id });
                /* deleteMany() is a Mongoose method that deletes all documents matching a condition. */

                // Delete client with given ID from database
                return Client.findByIdAndDelete(args.id); // Return deleted client object
            },
        },
        /* Add a project */
        addProject:{
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { // This field uses an Enum, which restricts input to: new, progress, completed
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started', // The defaultValue: 'Not Started' ensures status is set even if omitted
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            }
        },
        /* Delete a project */
        deleteProject:{
            type: ProjectType, 
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            resolve(parent, args){
                return Project.findByIdAndDelete(args.id); 
            },
        },
        /* Update a project */
        updateProject:{
            type: ProjectType,
            args: { // Accept project id and any fields you want to update 
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { // must be one of the defined values
                        type: new GraphQLEnumType({
                            name: 'ProjectUpdateStatus', // renamed to avoid duplicate enum name
                            values: {
                                'new': { value: 'Not Started' },
                                'progress': { value: 'In Progress' },
                                'completed': { value: 'Completed' },
                            }
                        }),
                        // No defaultValue 
                    },
            },
            resolve(parent, args){
                
                /* Filter Out Undefined Fields */

                const updates = {}; // Initialize empty object 

                /* `args` contains values passed into the mutation */
                if (args.name !== undefined) updates.name = args.name;
                if (args.description !== undefined) updates.description = args.description;
                if (args.status !== undefined) updates.status = args.status;

                /*  
                The conditionals check if each field was actually included in the       mutation request. If it was included, it adds that field to the updates object.

                Fields that are not passed are ignored — they stay as they are in the DB.

                This avoids overwriting undefined fields, which MongoDB would otherwise interpret as "clear this field." 
                */

                /* MongoDB Logic */
                return Project.findByIdAndUpdate( 
                    args.id,           // Locate project by id
                    { $set: updates }, // Only update the fields in `updates`
                    { new: true }      // Return updated document instead of the original
                );
            }
        },
    },
});

// Export the Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation  // Add mutation capabilities
})