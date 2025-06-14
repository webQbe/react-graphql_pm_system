import Clients from '../components/Clients'
import Projects from '../components/Projects'
import AddClientModal from '../components/AddClientModal'

const Home = () => {
  return (
    <>
        <div className="container my-4"> {/* consistent margin and horizontal padding */}
            <Projects />  {/* Display project cards from GraphQL */}
            <hr />        {/* A horizontal line */}
            <Clients />   {/* Display a table of clients */}

            {/* Wrap <AddClientModal /> inside Bootstrap-style flex layout */}
            <div className="d-flex gap-3 mb-4">
                <AddClientModal />
            </div>
        </div>
    </>
  )
}

export default Home