import './App.css';
import React,{useState} from 'react';
import {Routes, Route,useNavigate ,Navigate} from 'react-router-dom';
import {NavBar} from "./Navbar"
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signin } from './components/Signin';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  return (
  <div>
    <div>
       <NavBar/>
     <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route  path="/discover"  element={<Home/>}/>
        <Route  path="/signin"  element={<Signin/>}/>
        <Route  path="/Login"  element={<Login/>}/>
       <Route  path="/jobs"  element={<RequiredAuth><Jobs/></RequiredAuth>}/>
       <Route  path="/live"  element={<Home/>}/>
     </Routes>
 </div>
 <Routes>
      
      
  </Routes>
 </div>
   
  )
}
function RequiredAuth({children}){
  const token = localStorage.getItem("token")
  return token ? children : <Navigate replace to ="/Login"/>       
  
}
function Jobs(){
  const [img, setImage]= useState()
  const [title, settitle]= useState()
  const [type, settype]= useState()
  const navigate = useNavigate()
  const submit=()=>{
       const data ={
        img,
        title,
        type
       }
       console.log(img)
       fetch("https://capstonebackend--q.herokuapp.com/jobs", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data=>data.json()).then(data=>{
        if(data){
          navigate("/")
        }
      })
  }
  return(
    <>
       <h3 className="text-center"><u>Update your Gallery</u></h3>
        <div className="editing-container ">
          <div className="editing border">
          <TextField id="outlined-basic" onChange={e => setImage(e.target.value)} style={{ width: 200 }} label="Image" variant="outlined" />
          <TextField id="outlined-basic" onChange={e => settitle(e.target.value)} style={{ width: 200 }} label="Title" variant="outlined" />
          <TextField id="outlined-basic" onChange={e => settype(e.target.value)} style={{ width: 200 }} label="type" variant="outlined" />
          <Button variant="contained" onClick={() => submit()} style={{ width: 200 }}>Update</Button>

          </div> 
        </div>
    </>
  )

      
  
}

export default App;
