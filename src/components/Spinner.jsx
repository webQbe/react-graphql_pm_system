import React from 'react'

const Spinner = () => {
  
  return (
    <div className="d-flex justify-content-center"> {/* Center spinner horizontally using `d-flex` and `justify-content-center` */}
      
      {/* Bootstrap spinner */}
      <div className="spinner-border" 
           role='status' /* let screen readers know this is loading indicator */
      > 

        <span className="sr-only">Loading...</span> {/* used for screen readers */}
        
      </div>
    </div>
  )
}

export default Spinner