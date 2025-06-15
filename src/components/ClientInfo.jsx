import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'

const ClientInfo = ({ client }) => {
  return (
    <>
        <h5 className="mt-5">
            Client Information
        </h5>
        <ul className="list-group"> {/* Bootstrap-styled list */}
            {/* Display client’s name */}
            <li className="list-group-item">
                <FaIdBadge className='icon' /> { client.name }
            </li>
            {/* Display client’s email */}
            <li className="list-group-item">
                <FaEnvelope className='icon' /> { client.email }
            </li>
            {/* Display client’s phone */}
            <li className="list-group-item">
                <FaPhone className='icon' /> { client.phone }
            </li>
        </ul>
    </>
  )
}

export default ClientInfo