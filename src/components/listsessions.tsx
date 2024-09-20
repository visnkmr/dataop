'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ListSessions=(username:string)=>{
  return useQuery(
    { 
      queryKey:[`${username}`],
      queryFn: async()=>{
    const response = await axios.post(`https://listallfrompscale-git-othernew-visnkmrs-projects.vercel.app/api/user/${username}`)
    // console.log(response.data)
      return await response.data
  } });

};
