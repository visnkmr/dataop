"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import axios from "axios";


export default function Home() {
  const [ss, setss] = React.useState("")
  const [contents, setcontents] = React.useState(
  //   [{
  //   sessionname:"",
  //   browsername:"",
  //   tablist:[]
  // }]

  )
  const [showall, setsa] = React.useState(false)
  const [username, setuname] = React.useState("")
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
const refresh=()=> {
  // var data:object;
  axios.request({
    method: "post",
    url: `https://listallfrompscale.vercel.app/api/user/${username}`
   
  })
  .then(response => 
    {
      if(response.data)
        {
          setss("List updated.");
          var data=response.data
          console.log(typeof(data))
          // setcontents((response.data))
          // setuname(uname.value)
          // setsa(true)

          let tcon;
          let children=[];
          let ddata=JSON.parse(data.data)
          console.log(typeof(ddata))
          ddata.forEach(item => {
            console.log(typeof(item))
            let titem=JSON.parse(item);
            console.log(titem)
            // var children;
            for(var tinfo in titem.tablist){  
              // let tinfoeach=JSON.parse(tinfo)
              console.log(typeof(tinfo))
              children.push(
              <>
              <tr>
                
              <td className='inline-block overflow-hidden'><a href={titem.tablist[tinfo].url}>{titem.tablist[tinfo].title}</a></td>
              </tr>
              </>
              );

            }
            
            tcon= (<>
            <div  className='inline-block overflow-hidden'>

            <table>
              <th>

              <td>{titem.sessionname}</td>
              </th>
              {/* <tr> */}
              {/* <td>test</td> */}
              {/* </tr> */}
              {children}
            </table>
            </div>
            </>);
            // tcon.props.children.props.children.push(rows);
            // tcon+=(titem.sessionname)
            // tcon+="\n"
            // tcon+=(titem.tablist)
            
            // tcon+="\n"
            // Do something with each item in the array
          });
          setcontents(tcon)
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
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <p>{ss}</p>
        <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={()=>{setsa(false); setuname("");}}>logout</button>
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
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
      <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={refresh}>Refresh</button>
      <p>{(contents)}</p>

</>
  ):null}
      {showall?(
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      ):null}
    </main>
  )
}
