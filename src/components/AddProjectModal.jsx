import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { Modal, Button } from 'react-bootstrap'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectQueries' 
import { GET_CLIENTS } from '../queries/clientQueries' 



const AddProjectModal = () => {
     
     const [show, setShow] = useState(false);
     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [clientId, setClientId] = useState('') 
     const [status, setStatus] = useState('new')

    // Use ADD_PROJECT mutation
    const [addProject] = useMutation(ADD_PROJECT, { // prepare the mutation for use in the component
                                        // Pass in variables from component state
                                        variables: { name, description, status, clientId },
                                        // Add custom update() function
                                        update(cache, { data: { addProject } }) { 
                                            // Read current list of projects from Apollo Client’s normalized cache
                                            const { projects } = cache.readQuery({ query: GET_PROJECTS })
                                            // Write new project back to the cache to update the UI immediately (without needing a refetch)
                                            cache.writeQuery({
                                                query: GET_PROJECTS,
                                                // Add new project to the list
                                                data: { projects: [...projects, addProject] },
                                            })
                                        },
                                    })  
 
     const {loading, error, data} = useQuery(GET_CLIENTS)

     if (loading) return null
     if (error) return "Something Went Wrong!" 
     
     // Submit the form
     const onSubmit = async (e) => {
        e.preventDefault()             

        if(name === '' || description === '' || status === '' || clientId === ''){

          return alert('Please fill in all fields!')

        }

        try { 
            await addProject() // Execute GraphQL mutation & wait for completion
            setShow(false)     // Close the modal
            // Clear all the form fields
            setName('')
            setDescription('')
            setStatus('new')
            setClientId('')
        } 
        catch (err) { 
          console.error(err)
      }

     }
     
  return (
    <>
      { !loading && !error && (
            <>
                <Button 
                    className="btn btn-primary" 
                    onClick={() => setShow(true)} 
                >
                    <div className="d-flex align-items-center"> 
                        <FaList className='icon' />               
                        <div>New Project</div>                    
                    </div>            
                </Button>

                <Modal 
                    show={show} 
                    onHide={() => setShow(false)} 
                    >
                        <Modal.Header closeButton> 
                            <Modal.Title>Add Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">  
                                    <label className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id='name' 
                                        value={name}
                                        onChange={ (e) => setName(e.target.value) } 
                                    />
                                    <label className="form-label">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id='description' 
                                        value={description}
                                        onChange={ (e) => setDescription(e.target.value) }
                                    >
                                    </textarea>
                                    <label className="form-label">Status</label>
                                    <select 
                                        id="status"
                                        className='form-select'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Client</label>
                                    <select 
                                        id="clientId" 
                                        className="form-select"
                                        value={clientId}
                                        onChange={(e) => setClientId(e.target.value)} // Update state
                                    >   
                                        <option value="">
                                            Select Client
                                        </option>
                                        { data.clients.map((client) => ( // Map through clients
                                                // Display each client as an option
                                                <option key={client.id} value={client.id}>
                                                    { client.name }
                                                </option>
                                            ))
                                        }                                
                                    </select>
                                </div>

                                <button 
                                    type="submit"
                                    className="btn btn-primary"
                                > 
                                    Submit
                                </button>
                            </form>
                    </Modal.Body>
                </Modal>
            </>
        )
      }
    </>
  )
}

export default AddProjectModal