import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <div id="side-navbar" className="absolute left-0">
        <ul>
            <li><Link to="/">PLAYFAIR</Link></li>
        </ul>
        <ul>
            <li><Link to="/railfence">RAILFENCE</Link></li>
        </ul>
        </div>
        <Outlet></Outlet>
        </>
  )
}

export default Layout