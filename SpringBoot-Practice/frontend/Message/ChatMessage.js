import React from 'react'
import { useSelector } from 'react-redux'

export const ChatMessage = ({item}) => {
  console.log("Chat Messages: ",item)
  const {auth}=useSelector((store)=>store)
  const isReqUserMessage = auth.user?.id === item.user?.id;

  console.log("IsRequser: ",isReqUserMessage," =>",auth.user?.id,"=>",item)
  return (
    <div className={`flex ${isReqUserMessage?"justify-start":"justify-end "}`}>
    <div className={`p-1 m-2 ${item.image ? "rounded-md bg-[#26678A] ":" rounded-full bg-[lightBlue]"} `} style={{color:"white"}}>
        {item.image && <img src='' style={{height:"200px",width:"150px"}}/>}
        <p className={`${true?"py-2":"py-1"}`}>{item.content}</p>
    </div>

</div>
  )
}
