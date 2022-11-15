import {Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Trending from './components/Trending'
import Movies from './components/Movies'
import Tv from './components/Tv'
import './App.css'
import Search from './components/Search'




function App() {
  return (
    <div>
    <Routes>
     <Route path='/' element={<NavBar/>}/>
     <Route path='/trending' element={<Trending/>}/>
     <Route path='/movies' element={<Movies/>}/>
     <Route path='/tv' element={<Tv/>}/>
     <Route path='/search' element={<Search/>}/>
    
    </Routes>
    </div>
  );
}



export default App;
