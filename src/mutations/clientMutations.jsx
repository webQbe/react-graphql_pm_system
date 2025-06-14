/* GraphQL Mutations */
import { gql } from '@apollo/client'

const ADD_CLIENT = gql`
                        mutation addClient(
                                            $name: String!, 
                                            $email: String!,
                                            $phone: String!
                                        )
                            {
                                addClient(name: $name, email: $email, phone: $phone)
                                    {
                                        id
                                        name
                                        email
                                        phone
                                    }
                            }
                        `

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

export { DELETE_CLIENT, ADD_CLIENT }