import React from "react";
import Topbar from "./Topbar";

export default function ListLinks({username}: {username: string}){
    return(
        <div className="min-h-screen bg-gray-50">
            <Topbar username={username}/>
        </div>
    );
}