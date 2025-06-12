/* Fetching Clients via GraphQL */
import { gql, useQuery } from  '@apollo/client'

// GraphQL query definition
const GET_CLIENTS = gql`
                        query getClients {
                            clients {
                                id
                                name
                                email
                                phone
                            }
                        }
                    `

const Clients = () => {

    // Execute query using Apollo's useQuery hook
    const { loading, error, data } = useQuery(GET_CLIENTS)

    // Handle loading and error states
    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

  // Render content
  return (
    <>
      <h1>Clients</h1>
      {/* Display results */}
      <ul>
        {data.clients.map((client) => ( // Map through clients array
          <li key={client.id}>
            {client.name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>
    </>
  )

}

export default Clients