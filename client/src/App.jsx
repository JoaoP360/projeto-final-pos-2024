import { Outlet } from "react-router-dom";
import './App.css'

import Navbar from './components/NavBar'

function App() {

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  )
}

export default App