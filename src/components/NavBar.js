import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = ({params}) => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-primary" style={{width: "100%"}}>
    <div className="navbar-brand">
      RoboSchool
    </div>
    <ul className="navbar-nav">
        {params.map(x =>(
            <li key={x.title.toString()} className="nav-item">
                <NavLink
                className="nav-link"
                to={x.link}
                exact>
                {x.title}
                </NavLink>
      </li>
        ))}
    </ul>
  </nav>
)