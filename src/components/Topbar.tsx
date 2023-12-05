import React from "react";
import { ListSessions } from "./listsessions";


export default function Topbar({username}){
    var {isLoading,isError,data}=ListSessions(username);
    const [showdivname,setshowdivname] = React.useState("")
    let sessionlist=[];
    if(!isLoading && !isError){

        let ddata=JSON.parse((data.data))
        // let dddata=JSON.parse(ddata);
        //   console.log(typeof(ddata)) 
        ddata.map((eitem)=>{
            let item=JSON.parse(eitem);
            // console.log("tdata---------->"+(item.sessionname))
                sessionlist.push({
                    sname:item.sessionname,
                    bname:item.browsername,
                    slength:item.tablist.length
                });
          });
          
          return (
          <>
          
          <section className="flex flex-row w-full overflow-x-scroll space-x-4 p-4 scrollbar-hide items-start">
           {
           sessionlist.map((slist) => {
           return (
            <>
            
        <div className="flex flex-col items-center border rounded-lg p-4">
            <button onClick={()=>{setshowdivname(slist.sname);console.log(showdivname)}}><h3 className="font-semibold text-lg">{slist.sname}_{slist.bname}_{slist.slength}</h3></button>
          </div>
          <div className="flex flex-col items-center border rounded-lg p-4">
            <button onClick={()=>{setshowdivname(slist.sname);console.log(showdivname)}}><h3 className="font-semibold text-lg">{slist.sname}_{slist.bname}_{slist.slength}</h3></button>
          </div>
            </>
           );
           })
           }
           </section>
          {ddata.map((item) => {
            let titem=JSON.parse(item);

            return (
                <>
                {/* <table className='border-spacing-0 border-gray-100'> */}
                <div 
                className={showdivname==titem.sessionname ? `display-block` : 'hidden'}
                >
                {
                titem.tablist.map((etab) => {
                return (
                    <>
                    {/* <tr> */}
                    {/* <td className='text-clip overflow-hidden'>{titem.tablist[tinfo].url}</td>   */}
                    {/* <td> */}
                        <p>
                            <a href={etab.url}>{etab.title}</a>
                        </p>
                        {/* </td> */}
                    {/* </tr> */}
                    </>
                );
                })}
                </div>
                {/* </table> */}
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