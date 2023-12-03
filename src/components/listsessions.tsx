'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const listsessions=(username:string)=>{
  let { data } = 
  useQuery(
    { 
      queryKey:[`https://listallfrompscale.vercel.app/api/user/${username}`],
      queryFn: async()=>{
    const response = await axios.post(`https://listallfrompscale.vercel.app/api/user/${username}`)
    console.log(response.data)
      return await response.data
  } })
if(!data){
  data=[]
}
  return data;

};