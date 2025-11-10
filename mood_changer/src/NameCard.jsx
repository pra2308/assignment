import { useState } from "react" ;

export default function NameCard (props){
    const [mood, setMood] = useState("Happy");
    function ToodleMood (){
             if (mood === "Happy 😃") {
                setMood("Sad 😞")
            } else {
              setMood("Happy 😃")
            }
    }
       return ( <div>
                  Hey! my name is {props.name} and  My Current Mood: {mood}!
                  <br></br>
                  <button onClick={ToodleMood} > Change Mood </button>
       </div>);
}