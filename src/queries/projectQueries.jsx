/* GraphQL Query (GET_PROJECTS) */
import { gql } from '@apollo/client'

// Fetch an array of project objects from backend with their id, name, and status
const GET_PROJECTS = gql`
    query getProjects {
                        projects {
                                    id
                                    name
                                    status
                        }
                    }`

export { GET_PROJECTS }