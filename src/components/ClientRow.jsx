/* Table Row Component */
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries'

const ClientRow = ({ client }) => { // Receive client object as a prop

  // Prepare deleteClient function
  const [ deleteClient ] = useMutation(
                                      // Execute DELETE_CLIENT mutation using current client.id
                                      DELETE_CLIENT, {
                                      variables: { id: client.id }, // Pass ID of the client to be deleted
                                      refetchQueries: [
                                                        { query: GET_CLIENTS }, 
                                                        { query: GET_PROJECTS } //  Re-run the GET_PROJECTS query after DELETE_CLIENT mutation succeeds
                                                      ], 
                                      /* Deleted client also deletes projects 
                                         - Apollo’s cache might still show stale data (e.g., orphaned projects or broken client fields).
                                         - Refetching ensures that the UI reflects the current state of both clients and projects.                
                                          
                                         a best practice when:
                                         - The mutation has side effects on other parts of the cached data.
                                         - You want to avoid manually updating the cache after a mutation.  
                                      */

                                      // Trigger custom function to directly manipulate Apollo’s normalized cache
                                      /* update(cache, { data: { deleteClient } }) {
                                      /* This updates the UI immediately without waiting for a round trip to the server
                                        - Backend client-deletion is done by useMutation 
                                        - Frontend-cache-update is done by this update() method to reflect the changes immediately in the UI
                                      
                                      try  { 
                                            const { clients } = cache.readQuery({ query: GET_CLIENTS }) // Read existing clients data from cache
                                            // Write new list of clients to cache
                                            cache.writeQuery({ 
                                              query: GET_CLIENTS,
                                              data: {
                                                // Exclude deleted client
                                                clients: clients.filter((client) => client.id !== deleteClient.id),
                                              },
                                            })
                                      } 
                                      catch (err) { // Guard against readQuery errors (e.g. if the cache isn’t populated yet)

                                              console.warn('Cache not ready for GET_CLIENTS');
                                          }    
                                      }, */
                                    })

  return (
    <tr>
      {/* Display client's name, email, and phone in table cells */}
      <td>{ client.name }</td>
      <td>{ client.email }</td>
      <td>{ client.phone }</td>
      <td>

        {/* Include red delete button (btn-danger btn-sm) from react-icons */}
        <button className="btn btn-danger btn-sm"
                // When delete button is clicked, ask to confirm
                onClick={() => { 
                                 if (confirm('Are you sure you want to delete this client?')) {
                                    
                                    deleteClient(); // Run the function if confirmed

                                  }
                               }
                        } 
        >
          <FaTrash /> {/* Include trash can icon */}
        </button>

      </td>
    </tr>
  )
}

export default ClientRow