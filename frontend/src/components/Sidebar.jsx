import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span>Goal handler</span>
                <small>Web de productividad y metas</small>
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <p className="sidebar-section-title">Menú</p>
                    <NavLink to="/" className="sidebar-link">Dashboard</NavLink>
                </div>

                <div className="sidebar-section">
                    <p className="sidebar-section-title">Goals and Thoughts</p>
                    <NavLink to="/Goals" className="sidebar-link">Goals</NavLink>
                    <NavLink to="/Journal" className="sidebar-link">Journal</NavLink>
                </div>

                <div className="sidebar-section">
                    <p className="sidebar-section-title">Productivity</p>
                    <NavLink to="/Daily_tasks" className="sidebar-link">Daily tasks</NavLink>
                </div>

                <div className="sidebar-section">
                    <p className="sidebar-section-title">Achieved</p>
                    <NavLink to="/Galery" className="sidebar-link">Galery</NavLink>
                </div>
            </nav>
        </aside>
    )
}
export default Sidebar