import { gql } from '@apollo/client'

// Define GraphQL mutation to add a project
/* Takes 4 required parameters: name, description, status, and clientId.
   Returns the full project details (including its related client) after creation.
 */
const ADD_PROJECT = gql`
                        mutation addProject(
                                    $name: String!, 
                                    $description: String!,  
                                    $status: ProjectStatus!, 
                                    $clientId: ID!) {
                                                    addProject(
                                                            name: $name, 
                                                            description: $description, 
                                                            status: $status, 
                                                            clientId: $clientId) {
                                                                                    id
                                                                                    name
                                                                                    description
                                                                                    status
                                                                                    client {
                                                                                                id
                                                                                                name
                                                                                                email
                                                                                                phone
                                                                                            }
                                                                                 }
                                                    }`

// Define GraphQL mutation to delete a project                                                    
/*  Take an id of a project and delete it 
    return deleted project's id   */                                                  
const DELETE_PROJECT = gql`
                        mutation deleteProject($id: ID!){
                                            deleteProject(id: $id){
                                                                    id
                                                                }
                        }`                                                   


export { ADD_PROJECT, DELETE_PROJECT }
