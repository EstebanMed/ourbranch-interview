import React from 'react';
import './layout.css'

const Layout = (props) => (
    <div className="container" >
        {props.children}
    </div>
)

export default Layout