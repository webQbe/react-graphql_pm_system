import { useState } from 'react' // for managing local component state
import { useMutation } from '@apollo/client'
import { Modal, Button } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'


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

     /* useMutation Hook with ADD_CLIENT */
     const [addClient] = useMutation(ADD_CLIENT, {

        // Automatically pass name, email, and phone state values when mutation runs
        variables: { name, email, phone }, 

        /* Update Function - UI refreshes without refetching from the server*/
        update(cache, { data: { addClient } }) {

          // Read existing client list from Apollo cache
          const { clients } = cache.readQuery({ 
            query: GET_CLIENTS
          })

          // Writes the updated list back to the cache
          cache.writeQuery({
            query: GET_CLIENTS,
            // Append newly added client to the list
            data: { clients: [...clients, addClient] },
          })

        }
        /*  This is a client-side cache update, not a refetch. 
            It keeps the UI in sync and fast. */
     })

     /* Form Submit Handler */
     const onSubmit = async (e) => {
        e.preventDefault()              // Prevent default form submission behavior
        console.log(name, email, phone) // Logs form data to console

        // Validate that all fields are filled
        if(name === '' || email === '' || phone === ''){

          return alert('Please fill in all fields!')

        }

        try {

            // Trigger the mutation
            await addClient(name, email, phone) // wait for it before closing the modal

            setShow(false) // close modal only if mutation succeeds

            // Reset the form fields
            setName('')
            setEmail('')
            setPhone('')

        } 
        catch (err) { // Handle errors

          console.error(err)

      }

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