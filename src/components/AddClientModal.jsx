import { useState } from 'react' // for managing local component state
import { Modal, Button } from 'react-bootstrap'; 


const AddClientModal = () => {
     
     // Track modal show state
     const [show, setShow] = useState(false);
     /* show: A boolean state variable (initially false).
        setShow: A function to change the value of show. */

  return (
    <>
      {/* <!-- Button trigger modal -->  */}
      <Button 
          variant="primary" 
          onClick={() => setShow(true)} // open modal by setting show to true
      >
        Launch demo modal
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
                Modal Body
            </Modal.Body>
            <Modal.Footer>
                {/* Footer buttons */}
                <Button 
                  variant="secondary" 
                  onClick={() => setShow(false)} // Hide modal by calling setShow(false)
                >
                    Close
                </Button>
                {/* Placeholder for saving form data */}
                <Button variant="primary">
                    Save changes
                </Button> 
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default AddClientModal