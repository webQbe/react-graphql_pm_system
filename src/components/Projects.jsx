import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import ProjectCard from './ProjectCard'
import { GET_PROJECTS } from '../queries/projectQueries'

const Projects = () => {

    // Fetch Projects
    const { loading, error, data } = useQuery(GET_PROJECTS)
    /* useQuery sends GET_PROJECTS request automatically when the component mounts */

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong!</p>
 
  return (
    <>
      <h1>Projects</h1>
      { data.projects.length > 0 ? ( // Check if there are projects
          <div className="row mt-4">
            { // Map through projects array
              data.projects.map((project) => ( 
                /* Display project using <ProjectCard /> component */
                <ProjectCard key={project.id} project={project} />
            )) }
          </div>
        ) : ( // Otherwise, a fallback & show "No Projects" 
              <p>No Projects</p>
            ) 
      } 
    </>
  )
}

export default Projects