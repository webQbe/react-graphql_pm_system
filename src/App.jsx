import { useState } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import Clients from './components/Clients'
import './App.css' // for global and component styles

/* Set up ApolloClient to talk to GraphQL server */
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // backend GraphQL endpoint
  cache: new InMemoryCache()            // enable ApolloClient caching for efficient reuse and re-rendering
})

function App() {

  return (
    <>
      <ApolloProvider client={client}> {/* wraps your app & injects the client into context */}
        <Header />                     {/* <Header /> component at the top */}
        <div className="container">    {/* centered container */}
          <Clients />
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
