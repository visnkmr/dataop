"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import axios from "axios";
// import {ListSessions} from '@/components/listsessions';
const ListLinks = dynamic(() => import('../components/listlinks'), {
  ssr: false,
});

import dynamic from 'next/dynamic';

export default function Home() {
  
  const [ss, setss] = React.useState("")
  
      const [showall, setsa] = React.useState(true)
      const [username, setuname] = React.useState("try")
      const [showcreateuser, setcreateuser] = React.useState(false)
      
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};
const handleSignIn=(event:React.FormEvent)=> {
  event.preventDefault();
  
  const uname = document.getElementById('username') as HTMLInputElement;
  const pwd = document.getElementById('password') as HTMLInputElement;
  axios.request({
    method: "post",
    url: `https://listallfrompscale.vercel.app/api/login`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {uid: uname.value, pswd: pwd.value}
   
  })
  .then(response => 
    {
      if(response.data.got)
        {
          setss("Login Successfull");
          setuname(uname.value)
          setsa(true)
        }
      else
        setss("Invalid Login. Create account first.")
      // console.log(response.json());
      
      // console.log(response)
    })
  .catch(error => {
    if (error.response) {
      if(error.response.status==400)
      setss("Issue with server\n"+error.response.status)
      else
      setss("User not found.")
    }
    else
    // Handle any errors
    setss("Issue with server\n"+error)
    console.error(error);
  });
};
const addToDb=(event:React.FormEvent)=> {
  event.preventDefault();
  
  const url = document.getElementById('url') as HTMLInputElement;
  axios.request({
    method: "post",
    url: `https://listallfrompscale.vercel.app/api/update`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {uid: username, datatoadd: url.value}
   
  })
  .then(response => 
    {
      if(response.data.got)
        {
          setss("Added URL successfully.");
          // setuname(uname.value)
          // setsa(true)
        }
      else
        setss("Failed to add.")
      // console.log(response.json());
      
      console.log(response)
    })
  .catch(error => {
    if (error.response) {
      if(error.response.status==400)
      setss("Issue with server\n"+error.response.status)
      else
      setss("User not found.")
    }
    else
    // Handle any errors
    setss("Issue with server\n"+error)
    console.error(error);
  });
}

const createUser=(event:React.FormEvent)=> {
  event.preventDefault();
  
  const uname = document.getElementById('nuusername') as HTMLInputElement;
  const pwd = document.getElementById('nupassword') as HTMLInputElement;
  axios.request({
    method: "post",
    url: `https://listallfrompscale.vercel.app/api/create`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {uid: uname.value, pswd: pwd.value}
   
  })
  .then(response => 
    {
      if(response.data.SUCCESS)
        {
          setss("User created successfully.");
          setcreateuser(false)
        }
      else
        setss("Failed to create user.")
      // console.log(response.json());
      
      console.log(response)
    })
  .catch(error => {
    if (error.response) {
      if(error.response.status==400)
      setss("Issue with server\n"+error.response.status)
      else
      setss("Failed to create user.")
    }
    else
    // Handle any errors
    setss("Issue with server\n"+error)
    console.error(error);
  });
}
  // axios.request({
  //   method: "post",
  //   // headers:headers,
  //   url: `https://listallfrompscale.vercel.app/api/listall`,
  //   // onUploadProgress: (progressEvent) => {
  //   //   progressEvent.total
  //   //   const percentCompleted = Math.round(
  //   //     (progressEvent.loaded * 100) / progressEvent.total!
  //   //   );
  //   //   console.log(percentCompleted);
  //   //   // Update your progress UI here
  //   // },
  // })
  // // .then((response) => {
  // //   console.log(response.data);
  // //   // Handle the response here
  // // });
  // // fetch(`http://${ipaddress}/api/upload`, {
  // //   method: 'POST',
  // //   body: formData
  // // })
  // .then(response => 
  //   {
  //     // console.log(response.json());
      
  //     console.log(response)
  //   })
  // .catch(error => {
  //   // Handle any errors
  //   console.error(error);
  // });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showall ? (
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <p>{ss}</p>
        <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={()=>{setsa(false); setuname("");}}>logout</button>
          
        </div>
      </div>
) : null}
      {!showall ? (
  <div>
    <form className='grid grid-flow-row gap-2'>
      <input id="username" name="username" placeholder="Username" className='h-12 p-2 rounded-md text-black'/>
      <input type="password" id="password" name="password" placeholder="Password" className='h-12 p-2 rounded-md text-black' />
      <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={handleSignIn}>Login</button>
    </form>
    
    <button type="button" className='p-2 h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={()=>setcreateuser(true)}>createuser</button>
  </div>
) : null}
{showcreateuser ? (
  <div>
    <form className='grid grid-flow-row gap-2'>
      <input id="nuusername" name="username" placeholder="Username" className='h-12 p-2 rounded-md text-black'/>
      <input type="password" id="nupassword" name="password" placeholder="Password" className='h-12 p-2 rounded-md text-black' />
      <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={createUser}>Create User</button>
    </form>
  </div>
) : null}

{/* {showall?(
<>
<form className='grid grid-flow-row gap-2'>
      <input id="url" name="url" placeholder="enter url here" className='h-12 p-2 rounded-md text-black'/>
      <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={addToDb}>Add to db</button>
    </form>
</>
  ):null} */}
  
  
  {showall?(
<>
      
      <ListLinks username={username}/>

</>
  ):null}
      
    </main>
  )
}
