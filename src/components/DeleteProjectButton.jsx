import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { DELETE_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECTS } from "../queries/projectQueries"
import { useMutation } from "@apollo/client"

const DeleteProjectButton = ({ projectId }) => {

    const navigate = useNavigate()

    /* Implement DELETE_PROJECT mutation */
    const [ deleteProject ] = useMutation(DELETE_PROJECT, {
        
        variables: { id: projectId },        // Provide projectId to the mutation
        onCompleted: () => navigate('/'),    // Redirect user back to home page after deletion
        
        // refetchQueries: [{ query: GET_PROJECTS }] // Re-fetch the list of projects to keep the UI in sync
        /* Using update() for better performance: */
        update(cache, { data: { deleteProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                    query: GET_PROJECTS,
                    data: { projects: projects.filter(p => p.id !== deleteProject.id) },
                })
        }

    })

  return (
    <div className="d-flex mt-5 ms-auto">
        <button 
            className="btn btn-danger m-2" 
            onClick={() => { // confirmation prompt 
                            if (window.confirm("Are you sure you want to delete this project?")) {
                                deleteProject();} // trigger the mutation
                    }} 
        >
            <FaTrash className="icon" /> Delete Project
        </button>
    </div>
  )
}

export default DeleteProjectButton