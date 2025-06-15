import { gql } from '@apollo/client'

// GET_PROJECTS GraphQL Query
const GET_PROJECTS = gql`
                        query getProjects {
                                            projects {
                                                        id
                                                        name
                                                        status
                                            }
                                        }`
                        /*  Fetch an array of project objects from backend 
                            with their id, name, and status
                        */

                            
// GET_PROJECT GraphQL Query              
const GET_PROJECT = gql`
                        query getProject($id: ID!) {
                            project(id: $id){
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
                        /* Fetches a single project by ID:
                            Includes an embedded client object to get full client data 
                            (so no second request is needed)
                        */   

export { GET_PROJECTS, GET_PROJECT }