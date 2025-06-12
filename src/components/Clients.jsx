/* Fetching Clients via GraphQL */
import { gql, useQuery } from  '@apollo/client'
import ClientRow from './ClientRow'

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
      {/* Render Full Table */}

      <table className="table table-hover mt-3">
        {/* Use Bootstrap’s table, table-hover, and mt-3 classes for styling */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { data.clients.map(client => ( // Maps over fetched client data
              // Render <ClientRow /> for each item
              <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  )

}

export default Clients