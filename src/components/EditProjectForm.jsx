import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutations"

const EditProjectForm = ({ project }) => {  // Receive {project} object as a prop

    // Initial form values are set from the passed project
    const [ name, setName ] = useState(project.name)
    const [ description, setDescription ] = useState(project.description)

    // Use statusMap to convert display value to select value
    const statusMap = {
                        'Not Started': 'new',
                        'In Progress': 'progress',
                        'Completed': 'completed'
                    }
    const [ status, setStatus ] = useState(statusMap[project.status])
    
    // GraphQL Mutation Hook
    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        // use current form state (name, description, status) as variables
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ // refetch the latest version of  updated project
                            query: GET_PROJECT, 
                            variables: { id: project.id } 
                        }],
        onCompleted: () => { // On success, alert the user
                                alert("Project updated successfully!")
                            }
    })

    // Form Submission
    const onSubmit = (e) => {

        if (!name || !description || !status){
            return alert('Please fill out all fields')
        }

        // Call the mutation to submit update
        updateProject()
 
    }

  return (
    <div className="mt-5">
        <h3>Update Project Details</h3>
        <form onSubmit={ onSubmit }>
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
                onChange={(e) => setStatus(e.target.value)} // changes update local status state
            >
              {/* selected option in the dropdown reflects the mapped status */}
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
         </div>  

         <button type="submit" className="btn btn-primary">
            Update
         </button>
        </form>
    </div>
  )
}

export default EditProjectForm