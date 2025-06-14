import { useState } from 'react' // for managing local component state
import { Modal, Button } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'


const AddClientModal = () => {
     
      /* State Hooks */
     // Track modal show state
     const [show, setShow] = useState(false);
     /* show: A boolean state variable (initially false).
        setShow: A function to change the value of show. */
     
     // Initialize three pieces of state to track user input
     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [phone, setPhone] = useState('')

     /* Form Submit Handler */
     const onSubmit = (e) => {
        e.preventDefault()              // Prevent default form submission behavior
        console.log(name, email, phone) // Logs form data to console
     }
     
  return (
    <>
      {/* <!-- Button trigger modal -->  */}
      <Button 
          variant="secondary" 
          onClick={() => setShow(true)} // open modal by setting show to true
      >
        <div className="d-flex align-items-center"> {/* Align icon & text vertically centered */}
          <FaUser className='icon' />               {/* Font Awesome user icon */}
          <div>Add Client</div>                     {/* Label text */}
        </div>
      </Button>

        {/* <!-- Modal --> */}
        <Modal 
          show={show} // Tell modal whether to appear or not
          onHide={() => setShow(false)} // Close modal when you click outside it or press "Esc"
        >
            <Modal.Header closeButton> {/* Header of the modal with a close (×) button */}
                <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form content goes here */}
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    {/* Render controlled input fields for Name, Email, and Phone */}
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id='name' 
                      value={name}
                      onChange={ (e) => setName(e.target.value) } // Update state
                    />
                    <label className="form-label">Email</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id='email' 
                      value={email}
                      onChange={ (e) => setEmail(e.target.value) }
                    />
                    <label className="form-label">Phone</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id='phone' 
                      value={phone}
                      onChange={ (e) => setPhone(e.target.value) }
                    />
                  </div>
                  {/*  Call onSubmit() */}
                  <button 
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  > 
                  Submit
                  </button>
                </form>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default AddClientModal