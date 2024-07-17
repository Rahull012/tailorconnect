
import {useState} from 'react';
import '../styles/userlogin.scss';
import { useHistory, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

function Login() {
 
  const[password,setpassword]=useState("");
  const[name,setusername]=useState("");
  const navigate = useNavigate();

  async function loginuser(e) {
    e.preventDefault();

      const result = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "password": password,
        })
      });
    
  
      const data = await result.json();
       if(data.status=='ok')
       {
        const {name}=data;
          alert("Login Successfull");
          navigate(`/userdashboard/:${name}`);
       }
       else
       {
         alert("Invalid Credentia");
       }
  }

  const textvariants={
    initial:{
      x:-500,
      opacity:0
    },
  
    animate:{
      x:0,
      opacity:1,
      transition:{
        duration:1,
        staggerchildren:0.5
      }
    },
  }
  

  return (
    <motion.div className="App">


        <motion.div className="form-page" initial="initial" animate="animate" >


<motion.div variants={textvariants} className="form-container">
<p className="title">Login</p>
<form className="form" onSubmit={loginuser}>
<div className="input-group">
<label>Username</label>
<input type="text" name="name"  value={name} onChange={(e)=>setusername(e.target.value)} />
</div>
<div className="input-group">
<label >Password</label>
<input value={password} onChange={(e)=> setpassword(e.target.value)} type="password" name="password" id="password" placeholder=""/>

</div>
<br />
<button type='submit' value="Login" className="sign">Sign in</button>
</form>
<p className="signup">Don't have an account?
<a rel="noopener noreferrer" href="http://localhost:3000/register" className="">Sign up</a>
</p>
</motion.div>
</motion.div>
    </motion.div>

  );
}

export default Login;


