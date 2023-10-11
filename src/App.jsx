import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from './appwrite/auth'
import { login,logout } from './store/authslice'
import {useDispatch} from 'react-redux'

function App() {
 const [loading, setloading] = useState(true)
 const dispatch=useDispatch();
 useEffect(()=>{
         authService.getCurrentUser()
         .then((userdata)=>{
          console.log("fggf");
          if(userdata)
             dispatch(login({userdata}))
          else
          dispatch(logout());
         }).finally(()=>{
          setloading(false);
         })
 },[]);

  return !loading?
     (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
   
    </>
  ):(<>
  <h1>Loading</h1>
  </>);
}

export default App
