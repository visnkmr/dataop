import React from "react";
import { ListSessions } from "./listsessions";

export default function ListLinks({username}){
    var data=ListSessions(username);
    const [showdivname,setshowdivname] = React.useState("")

    const [contents, setcontents] = React.useState(
        //   [{
          //   sessionname:"",
          //   browsername:"",
          //   tablist:[]
          // }]
          []
          )
          const refresh=()=> {
            // setss("List updated.");
          // var data=listsessions(username);
          console.log(typeof(data))
          // setcontents((response.data))
          // setuname(uname.value)
          // setsa(true)

          let tcon=[];
          let topbar=[];
          // let children;
          let persl=[];
          let ddata=JSON.parse(data.data)
          console.log(typeof(ddata))
          ddata.forEach(item => {
            let children=[];
            console.log(typeof(item))
            let titem=JSON.parse(item);
            console.log(titem)
            // var children;
            for(var tinfo in titem.tablist){  
              // let tinfoeach=JSON.parse(tinfo)
              // console.log(typeof(tinfo))
              children.push(
              <>
              <tr>
              {/* <td className='text-clip overflow-hidden'>{titem.tablist[tinfo].url}</td>   */}
              <td><a href={titem.tablist[tinfo].url}>{titem.tablist[tinfo].title}</a></td>
              </tr>
              </>
              );

            }
            persl.push(<div className={showdivname==titem.sessionname ? `display-block` : 'hidden'}>{children}</div>)

            topbar.push(<button onClick={()=>{setshowdivname(titem.sessionname);console.log(showdivname)}}>{titem.sessionname}_{titem.browsername}_{titem.tablist.length}</button>);
            
            // tcon.props.children.props.children.push(rows);
            // tcon+=(titem.sessionname)
            // tcon+="\n"
            // tcon+=(titem.tablist)
            
            // tcon+="\n"
            // Do something with each item in the array
          });
          tcon.push(<>
              
            <div >
            {topbar}
            <br/>
            <table className='border-spacing-0 border-gray-100'>
              {/* <th>

              <td>{titem.sessionname}_{titem.browsername}_{titem.tablist.length}</td>
              </th> */}
              {/* <tr> */}
              {/* <td>test</td> */}
              {/* </tr> */}
              {persl}
            </table>
            </div>
            </>);
          setcontents(tcon)
            // var data:object;
            // axios.request({
            //   method: "post",
            //   url: `https://listallfrompscale.vercel.app/api/user/${username}`
             
            // })
            // .then(response => 
            //   {
                // if(response.data)
                //   {
                    
                //   }
                // else
                //   setss("Failed to add.")
                // console.log(response.json());
                
                // console.log(response)
            //   })
            // .catch(error => {
            //   if (error.response) {
            //     if(error.response.status==400)
            //     setss("Issue with server\n"+error.response.status)
            //     else
            //     setss("User not found.")
            //   }
            //   else
            //   // Handle any errors
            //   setss("Issue with server\n"+error)
            //   console.error(error);
            // });
          
            
          }
    
    return(
        <>
        <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={refresh}>Refresh</button>
            {contents}
        </>
    );
}