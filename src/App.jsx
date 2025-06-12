import { useState } from 'react'
import Header from './components/Header'

import './App.css' // for global and component styles

function App() {

  return (
    <>
      <Header />                  {/* <Header /> component at the top */}
      <div className="container"> {/* centered container */}
        <h1>Welcome</h1>
      </div>
    </>
  )
}

export default App
