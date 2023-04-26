import './App.css';
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from './components/Home'
import Navar from './components/Navar';
import About from './components/About';
import { useEffect } from 'react';  
import axios from 'axios';
import Deatil from './components/Detail'
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';   
import Favoritos  from './components/Favoritos'
import Login from './components/Login';

function App() {
  const navigate = useNavigate();
  const [access, Setaccess] = useState(false);
  function login(userData) {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
       const { access } = data;
       Setaccess(data);
       access && navigate('/home');
    });
 }
 const cerrar = () => {
  Setaccess(false)
}

useEffect(() => {
  !access && navigate('/');
}, [access,navigate]);
// Estado para traer la informacion del servidor de la api de donde obtenemos nuestras imagenes 
const [characters, setCharacters] = useState([]);
const location = useLocation();
// Funcion con la que realizaremos las peticiones pro medio de axios 
function onSearch(id) {
  axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
     if (data.id) {
        setCharacters((oldChars) => [...oldChars, data]);
     } else {
        window.alert('¡No hay personajes con este ID!');
     }
  
  },[]);

}
const onClose = (id) => {
  const Characterfilter = characters.filter(characters => characters.id !== id)
  setCharacters(Characterfilter)

}
  return (
    <div>
       {location.pathname === '/' ? <Login login={login}/> : <Navar cerrar={cerrar} onSearch={onSearch}/>}
      <Routes>
      <Route path='/home' element={<Home onClose={onClose} characters={characters} />} />
         <Route path='/About' element={<About/>} />
         <Route path='/detail/:id' element={<Deatil/>} />
         {/* <Route path='/Forms' element={<Formsbostrap/>} /> */}
         <Route path='/favorites' element={<Favoritos/>} />
      </Routes>
      
    </div>
  );
}

export default App;
