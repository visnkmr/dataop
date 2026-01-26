'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ListSessions=(username:string, accessToken:string)=>{
  return useQuery(
    { 
      queryKey:[`${username}`],
      queryFn: async()=>{
    const response = await axios.post(`https://listallfrompscale-git-othernew-visnkmrs-projects.vercel.app/api/user/${username}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    // console.log(response.data)
      return await response.data
  } });

};
