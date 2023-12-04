import React from "react";
import { ListSessions } from "./listsessions";


export default function Topbar({username}){
    var {isLoading,isError,data}=ListSessions(username);
    const [showdivname,setshowdivname] = React.useState("")

    if(!isLoading && !isError){

        console.log("tdata---------->"+data)
          let ddata=JSON.parse(data.data)
          console.log(typeof(ddata))
          
          return (
          <>
          {ddata.map((item) => {
                    let titem=JSON.parse(item);

                    return (
                        <>
                        <button onClick={()=>{setshowdivname(titem.sessionname);console.log(showdivname)}}>{titem.sessionname}_{titem.browsername}_{titem.tablist.length}</button>
                        <table className='border-spacing-0 border-gray-100'>
                        <div className={showdivname==titem.sessionname ? `display-block` : 'hidden'}>
                            {titem.tablist.map((etab) => {
                                    return (
                                        <>
                                        <tr>
                                        {/* <td className='text-clip overflow-hidden'>{titem.tablist[tinfo].url}</td>   */}
                                        <td><a href={etab.url}>{etab.title}</a></td>
                                        </tr>
                                        </>
                                    );
                                })}
                        </div>
                        </table>
                        </>
                        );
                })}
           
          </>
          );
    }
}
// function eachitem(ddata){
//     console.log("eachitem---->"+ddata)
//     // const [showdivname,setshowdivname] = React.useState("")

//     ddata.forEach(item => {
//         let titem=JSON.parse(item);

//         return (
//         <button onClick={()=>{setshowdivname(titem.sessionname);console.log(showdivname)}}>{titem.sessionname}_{titem.browsername}_{titem.tablist.length}</button>);
//       });
// }