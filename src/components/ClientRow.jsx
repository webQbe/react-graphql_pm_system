/* Table Row Component */
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries';

const ClientRow = ({ client }) => { // Receive client object as a prop

  // Prepare deleteClient function
  const [ deleteClient ] = useMutation(
                                      // Execute DELETE_CLIENT mutation using current client.id
                                      DELETE_CLIENT, {
                                      variables: { id: client.id },
                                      // Refetch clients query after deletion
                                      refetchQueries: [{ query: GET_CLIENTS }],
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