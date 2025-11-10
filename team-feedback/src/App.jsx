import { useState } from "react";
import MemberCard from "./MemberCard";
import ResetButton from "./ResetButton";

const members = ["Prashant", "Rahul", "Sita", "Aman"];

export default function App(){

      const [counts, setCounts] = useState([0, 0, 0, 0]);
      function addFeedback(index){
               let newArray = [...counts];
               newArray[index] = newArray[index]+1;
               setCounts(newArray);
      } 
      function resetFeedback() {
               let newArray = [...counts];
               let arr = newArray.map((num) =>( num = 0));
               setCounts(arr);
      }
      return (
             <div>
                   {members.map((member,index)=>(<MemberCard name={member} count={counts[index]} onIncrease={()=>addFeedback(index)}/>))}
                    <ResetButton reset={resetFeedback}/>
             </div>
      );
    
}