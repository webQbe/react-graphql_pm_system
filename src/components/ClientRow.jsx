/* Table Row Component */
import { FaTrash } from 'react-icons/fa'

const ClientRow = ({ client }) => { // Receive client object as a prop
  return (
    <tr>
      {/* Display client's name, email, and phone in table cells */}
      <td>{ client.name }</td>
      <td>{ client.email }</td>
      <td>{ client.phone }</td>
      <td>
        {/* Include red delete button (btn-danger btn-sm) from react-icons */}
        <button className="btn btn-danger btn-sm">
          <FaTrash /> {/* Include trash can icon */}
        </button>
      </td>
    </tr>
  )
}

export default ClientRow