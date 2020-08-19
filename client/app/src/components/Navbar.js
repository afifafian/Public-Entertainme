import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <p className="navbar-brand text-white" style={{marginRight: "80px"}}>
                    Entertainme-App
                </p>
                <p>
                <Link className="navbar-brand text-white" to={{ pathname: '/',}} >Home
                </Link>
                </p>
                <p>
                <Link className="navbar-brand text-white" to={{ pathname: '/movies',}}>Movies
                </Link>
                </p>
                <p>
                <Link className="navbar-brand text-white" to={{ pathname: '/series',}}>Series
                </Link>
                </p>
                <p>
                <Link className="navbar-brand text-white" 
                    to={{ pathname: '/favorites',state: "favorites"}}>
                    My Favorites
                </Link>
                </p>
            </nav>
        </>
    );  
}

export default Navbar;