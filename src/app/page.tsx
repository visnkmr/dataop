"use client"
import React from 'react';
import axios from "axios";
const ListLinks = dynamic(() => import('../components/listlinks'), {
  ssr: false,
});
import { useUser } from '@auth0/nextjs-auth0/client';

import dynamic from 'next/dynamic';
import LoginButton from '@/components/loginbutton';

export default function Home() {
   const { user, error, isLoading } = useUser();

  console.log(user)
  let showall=!user;
  console.log(showall)
  
  const [ss, setss] = React.useState("")
 
      // const [showall, setsa] = React.useState(true)
      // const [username, setuname] = React.useState("try")
      // const [showcreateuser, setcreateuser] = React.useState(false)
      // if(user){
      //   setss("Logged In successfully.");
      //   setuname(user?.sub!)
      // }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};
// const handleSignIn=(event:React.FormEvent)=> {
//   event.preventDefault();
  
//   const uname = document.getElementById('username') as HTMLInputElement;
//   const pwd = document.getElementById('password') as HTMLInputElement;
//   axios.request({
//     method: "post",
//     url: `https://listallfrompscale.vercel.app/api/login`,
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//     data: {uid: uname.value, pswd: pwd.value}
   
//   })
//   .then(response => 
//     {
//       if(response.data.got)
//         {
//           setss("Login Successfull");
//           setuname(uname.value)
//           setsa(true)
//         }
//       else
//         setss("Invalid Login. Create account first.")
//       // console.log(response.json());
      
//       // console.log(response)
//     })
//   .catch(error => {
//     if (error.response) {
//       if(error.response.status==400)
//       setss("Issue with server\n"+error.response.status)
//       else
//       setss("User not found.")
//     }
//     else
//     // Handle any errors
//     setss("Issue with server\n"+error)
//     console.error(error);
//   });
// };
const addToDb=(event:React.FormEvent)=> {
  event.preventDefault();
  
  const url = document.getElementById('url') as HTMLInputElement;
  axios.request({
    method: "post",
    url: `https://listallfrompscale-git-othernew-visnkmrs-projects.vercel.app/api/update`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {uid: user?.sub, datatoadd: url.value}
   
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

// const createUser=(event:React.FormEvent)=> {
//   event.preventDefault();
  
//   const uname = document.getElementById('nuusername') as HTMLInputElement;
//   const pwd = document.getElementById('nupassword') as HTMLInputElement;
//   axios.request({
//     method: "post",
//     url: `https://listallfrompscale.vercel.app/api/create`,
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//     data: {uid: uname.value, pswd: pwd.value}
   
//   })
//   .then(response => 
//     {
//       if(response.data.SUCCESS)
//         {
//           setss("User created successfully.");
//           setcreateuser(false)
//         }
//       else
//         setss("Failed to create user.")
//       // console.log(response.json());
      
//       console.log(response)
//     })
//   .catch(error => {
//     if (error.response) {
//       if(error.response.status==400)
//       setss("Issue with server\n"+error.response.status)
//       else
//       setss("Failed to create user.")
//     }
//     else
//     // Handle any errors
//     setss("Issue with server\n"+error)
//     console.error(error);
//   });
// }
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
    <>
      {showall ? (
        <LoginButton/>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">DataOp</h1>
                </div>
                <div className="flex items-center space-x-4">
                  {ss && (
                    <div className="text-sm text-gray-600">
                      {ss}
                    </div>
                  )}
                  <a 
                    href="/api/auth/logout"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New URL</h2>
              <form onSubmit={addToDb} className="flex gap-3">
                <input 
                  id="url" 
                  name="url" 
                  placeholder="Enter URL here..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to Database
                </button>
              </form>
            </div>

            <ListLinks username={user?.sub || ""}/>
          </div>
        </div>
      )}
    </>
  )
}
