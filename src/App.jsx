import { useState } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import Clients from './components/Clients'
import Projects from './components/Projects'
import AddClientModal from './components/AddClientModal'
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
        <Header />                     {/* <Header /> component at the top */}
        <div className="container">    {/* centered container */}
          <Projects />
          <Clients />
          <AddClientModal />
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
