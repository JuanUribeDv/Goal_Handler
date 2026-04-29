import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Goal Tracker</h2>
            <ul className='Menú'>
                Menú
                <li><Link to="/">Dashboard</Link></li>
            </ul>
            <ul className='Goals-Thoughts'>
                Goals and Thoughts
                <li><Link to="/Goals">Goals</Link></li>
                <li><Link to="/Journal">Journal</Link></li>
            </ul>
            <ul className='Prodcutivity'>
                Productivity
                <li><Link to="/Focus_mode">Focus Mode</Link></li>
                <li><Link to="/Daily_tasks">Daily tasks</Link></li>
            </ul>
            <ul className='Achieved'>
                Achieved
                <li><Link to="/Galery">Galery</Link></li> 
            </ul>
        </div>
    )
}
export default Sidebar