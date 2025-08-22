
import './App.css'
import {Link, Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";


function App() {


  return (
    <>
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Pet App</h1>

            <nav className="flex gap-4 mb-6">
                <Link to="/" className="btn btn-outline">Home</Link>
                <Link to="/create" className="btn btn-primary">Create Pet</Link>
            </nav>

            <Outlet />
            <hr className="mt-6" />
        </div>
        <Toaster position="top-center"></Toaster>
    </>
  )
}

export default App
