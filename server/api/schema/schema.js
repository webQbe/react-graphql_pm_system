 /* GraphQL Schema */

 // Imports & Setup
 const { projects, clients } = require('../sampleData');
 const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql');

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

// Define the queries clients can make to the API
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // A query that returns a single client by ID
        client:{
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { // fetch the data (from the clients array here)
                return clients.find(client => client.id === args.id);
            }
        }
    }
});

// Export the Schema
module.exports = new GraphQLSchema({
    query: RootQuery
})