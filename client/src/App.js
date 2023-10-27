import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Loginpage from './pages/Loginpage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div>
      <BrowserRouter><Routes>
        <Route path='/' element={<Loginpage/>}/>
        <Route path='/home' element={<Homepage/>}/>
        
        </Routes></BrowserRouter>
    
    </div>
  );
}

export default App;
