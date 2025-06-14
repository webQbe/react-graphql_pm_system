import { FaExclamationTriangle } from 'react-icons/fa' // for warning icon
import { Link } from 'react-router-dom'
 
const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">

        {/* Display large warning icon */}
        <FaExclamationTriangle className='text-danger' size='5em' />
        <h1>404</h1>

        {/* Show friendly error message */}
        <p className="lead text-center">Sorry! This page does not exist.</p>

        {/* Button to go back to home */}
        <Link to='/' className='btn btn-primary'>
            Go Back
        </Link>

    </div>
  )
}

export default NotFound