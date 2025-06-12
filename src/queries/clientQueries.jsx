/* Define and export your GraphQL queries */
import { gql } from '@apollo/client'

// Define GraphQL query to ask for id, name, email, and phone of all clients
const GET_CLIENTS = gql`
                        query getClients {
                            clients {
                                id
                                name
                                email
                                phone
                            }
                        }`

export { GET_CLIENTS } // export GET_CLIENTS so it can be used in other components