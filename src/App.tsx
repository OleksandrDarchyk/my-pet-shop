
import './App.css'
import {Link, Outlet} from "react-router-dom";

function App() {


  return (
    <>
        <div  style={{padding: 16}}>
            <h1>Pet App</h1>
          <nav style={{display:"flex",gap:12,marginBottom:16}}>
            <Link to="/">Home</Link>
              <Link to={"/create"}>Create Pet</Link>
          </nav>
          <Outlet></Outlet>
          <hr/>
        </div>

    </>
  )
}

export default App
