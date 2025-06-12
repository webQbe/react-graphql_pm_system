import logo from './assets/logo.png'

// Define navigation bar (<nav>) at the top of the page
const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0"> 
            {/* Bootstrap classes - navbar: for basic nav styling, bg-light: for light background, 
                mb-4: for bottom margin, p-0: for no padding */}

        <div className="container">         {/* .container: keeps content centered with proper padding. */}
            <div className="navbar-brand">  {/* .navbar-brand: holds the logo and the site title. */}
                <div className="d-flex">    {/* .d-flex: uses Flexbox to arrange image and text horizontally. */}
                    {/* Display logo & title */}
                    <img src={logo} alt="logo" className="mr-2" /> {/* mr-2 to give margin-right spacing. */}
                    <div>Project Management System</div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header