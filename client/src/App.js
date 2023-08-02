import './App.css';
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home' 
import Detail from './components/Detail'
import CreateVideogame from './components/CreateVideogame';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/> 
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/create' element={<CreateVideogame/>}/>
      </Routes>
    </div>
  );
}

export default App;
