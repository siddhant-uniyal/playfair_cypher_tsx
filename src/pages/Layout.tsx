import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        {/* <div id="side-navbar" className="absolute left-0"> */}
        <div id="side-navbar" className="absolute left-0 flex flex-col justify-center items-center h-screen">
        <ul>
            <li><Link to="/">PLAYFAIR</Link></li>
            <li><Link to="/railfence">RAILFENCE</Link></li>
        </ul>
        </div>
        <Outlet></Outlet>
        </>
  )
}

export default Layout