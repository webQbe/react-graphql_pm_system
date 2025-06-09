 /* GraphQL Schema */

 // Imports & Setup
 const { projects, clients } = require('../sampleData');
 const { GraphQLObjectType, 
         GraphQLID, 
         GraphQLString, 
         GraphQLSchema, 
         GraphQLList 
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
            resolve(parent, args) { // `parent` is the current project object that GraphQL is resolving
                return clients.find(client => client.id === parent.clientId);
                /* parent.clientId refers to the ID of the client associated with this project */
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
            resolve(parent, args) { // fetch the data (from the clients array here)
                return clients.find(client => client.id === args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType), // Return an array of objects shaped like ClientType
            // Return the clients array from sampleData.js
            resolve(parent, args){  
                return clients;
            }
        },
        // Define queries that return project data
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType), 
            resolve(parent, args){  
                return projects;
            }
        }
    }
});

// Export the Schema
module.exports = new GraphQLSchema({
    query: RootQuery
})