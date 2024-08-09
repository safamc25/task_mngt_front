
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

import Edit from './pages/Edit';
import ViewTask from './pages/ViewTask';





function App() {
  return (
    <div className="App">
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/authentication' element={<Auth></Auth>}></Route>
    <Route path='/register' element={<Auth register></Auth>}></Route>

      
      <Route path='/dashboard' element={<Dashboard ></Dashboard>}></Route>
     
      <Route path='/edit/:taskId' element={<Edit ></Edit>}></Route>
      <Route path='/viewtask/:taskId' element={  <ViewTask> </ViewTask>}></Route>
      
     
   </Routes>
   <Footer></Footer>
    </div>
  );
}

export default App;
