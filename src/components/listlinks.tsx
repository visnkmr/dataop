import React, { useEffect } from "react";
import { ListSessions } from "./listsessions";
import Topbar from "./Topbar";

export default function ListLinks({username}){
          
    return(
        <>
        {/* <button type="submit" className='h-10 px-6 font-semibold rounded-md bg-blue-600' onClick={refresh}>Refresh</button> */}
        <Topbar username={username}/>
        </>
    );
}