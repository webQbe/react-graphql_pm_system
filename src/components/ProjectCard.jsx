import { Link } from "react-router-dom" // handles navigation without full reload

const ProjectCard = ({ project }) => { // Receive project data as a prop
  return (
    <div className="col-md-6">
        {/* Render Bootstrap-style card */}
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">  

                    {/* Show Project Name */}
                    <h5 className="card-title">
                        { project.name }
                    </h5>

                    {/* Show View Button */}
                    <Link  
                        className='btn btn-light' 
                        to={`/project/${project.id}`}
                    >
                        View
                    </Link>

                    {/* Show Project Status */}
                    <p className="small">
                        Status:     
                        <span className="badge bg-black m-1">
                            {project.status}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard