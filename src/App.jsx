import { BrowserRouter as Router, 
         Route, 
         Routes } from 'react-router-dom' // For Client-Side Routing
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'
import './App.css' // for global and component styles

// Replace existing data with incoming data 
const cache = new InMemoryCache({ // InMemoryCache:	Apollo's built-in caching system
  
  // typePolicies:	Customize how Apollo stores and merges specific types/fields
  typePolicies: { 
    Query: {
      fields: {
        clients: {
          // Control how Apollo cache merges new data into its existing cache
          merge(existing, incoming){ 
            return incoming // overriding merge() to return only new data instead of merging
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming 
            /* By overriding the merge function and returning only incoming, you ensure:
                1. Every time you query `clients` or `projects`, you get a fresh and accurate list.
                2. Prevents weird bugs when deleting or updating items. 
            */

          }
        }
      }
    }
  }
})

/* Set up ApolloClient to talk to GraphQL server */
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // backend GraphQL endpoint
  cache // Call whenever a new response is fetched         
})

function App() {

  return (
    <>
      <ApolloProvider client={client}> {/* wraps your app & injects the client into context */}
        
        <Router>                         {/* <Router> sets up the client-side router */}
          <Header />                     
          <div className="container">    
            <Routes>                     {/* <Routes> defines your route configuration */}
              
              {/* When the browser is at /, render Home component */}
              <Route  path='/' element={<Home />} /> 

              {/* Define a route like /project/123 */}
              <Route 
                path='/project/:id' // :id param becomes available in useParams()
                element={ <Project /> } 
              />

              <Route path='*' element={<NotFound />} /> {/* Routing to Catch All Undefined Paths 
                This line catches all routes not matched by previous <Route> entries
                It must be last in the <Routes> block
              */}

            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
