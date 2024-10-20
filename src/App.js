import './App.css';
import { Route,Routes, useLocation } from 'react-router-dom';
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import Navbar from './pages/NavBar';
import { OpenRoute } from './components/routeType/OpenRoute';
import { PrivateRoute } from './components/routeType/PrivateRoute';
import DataGraphs from './pages/DataGraphs';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
          <Route path='/dataGraph/IsYoung/:IsYoung/Gender/:Gender/StartDate/:startDate/EndDate/:endDate' element={<PrivateRoute><DataGraphs/></PrivateRoute>}/>  
      </Routes>
    </div>
  );
}

export default App;
