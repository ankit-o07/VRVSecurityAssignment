import { Routes , Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import RefreshHandler from './Helper/RefreshHandler';



import './App.css';

import Login from './Pages/Login';
import Register from './Pages/Registration';
import Home from './Pages/Home';

function App() {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const PrivatesRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="login" />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        
        
        <Route path='/home' element={<PrivatesRoute element={<home/>} />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
