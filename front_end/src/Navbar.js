// type sfc tab to get the following skeleton/stateless functional component
// dont need to use an arrow function here, but we'll be using arrow funcs
// for the components
//shift option down to duplicate a line
// line 12-16 shows inline styling, a dynamic value (JS object) w/ key/value pairs
const  Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>The Roadtrip App</h1>
            <div className="links">
                <a href="/">Homepage</a>
                <a href="/profile" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>My Profile</a>
            </div>
        </nav>
    );
}
 
export default Navbar;
