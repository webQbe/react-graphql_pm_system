import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'
import Spinner from '../components/Spinner'
 
const Project = () => {

    const { id } = useParams() // Extract id param from URL

    // Execute GET_PROJECT GraphQL query using id
    const { loading, error, data } = useQuery(GET_PROJECT, 
                                            { variables: { id } })

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong!</p>

  return (
    <>
        { !loading && !error && ( // On success render
            <div className="mx-auto w-75 card p-5">

                {/* Render "Back" button */}
                <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                    Back
                </Link>

                {/* Project details (name, description, status) */}
                <h1>{ data.project.name }</h1>
                <p>{ data.project.description }</p>

                <h5 className="mt-3">
                    Project Status
                </h5>
                <p className="lead">
                    { data.project.status }
                </p>

                {/* Render associated client's details via <ClientInfo />  */}
                <ClientInfo client={ data.project.client } />

                <EditProjectForm 
                    project={data.project} // Pass project object retrieved via GraphQL
                /> 

                {/* Project delete button */}
                <DeleteProjectButton 
                    projectId={data.project.id} // pass the current project’s id
                />
            </div>
        )}
    </>
  )
}

export default Project