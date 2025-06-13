/* GraphQL Mutations */
import { gql } from '@apollo/client'

// Define mutation that deletes client by id & return deleted client's details
const DELETE_CLIENT = gql`
                        mutation deleteClient($id: ID!){

                                deleteClient(id: $id) {     
                                                        id
                                                        name
                                                        email
                                                        phone
                                                    }

                        }`

export { DELETE_CLIENT }