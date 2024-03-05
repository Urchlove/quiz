import React, { useRef } from 'react'
import './Quiz.css';
import {data} from "../Data"


function Quiz() {
  let [index,setIndex] = React.useState(0);
  let [questions,setQuestions] = React.useState(data[index]);
  let [lock,setLock] = React.useState(false);
  let [score,setScore] = React.useState(0);
  let [result,setResult] = React.useState(false)
 
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1,Option2,Option3,Option4];

  const checkAns = (e,ans) => {
      if (questions.Ans===ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev + 1)
      }
      else{
        e.target.classList.add("wrong");
        setLock(true);
        option_array[questions.Ans-1].current.classList.add("correct");
      }
    }
  

  const Next = ()=> {
      if(lock === true) {
         if(index === data.length -1){
            setResult(true)
            return 0;
         }
        setIndex(++index);
        setQuestions(data[index]);
        setLock(false);
        option_array.map((option)=> {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct")
        })
      }
  }
  const reset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);

  }

  return (
    <div className='cont'>
      <h1>LOVE QUIZ APP</h1>
      <hr className='hrr'/>
      {result?<></>:<>
      <h2 className='h22'>{index + 1}. {questions.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=> {checkAns(e,1)}}>{questions.option1}</li>
        <li ref={Option2} onClick={(e) =>{checkAns(e,2)}}>{questions.option2}</li>
        <li ref={Option3} onClick={(e) =>{checkAns(e,3)}}>{questions.option3}</li>
        <li ref={Option4} onClick={(e) =>{checkAns(e,4)}}>{questions.option4}</li>
      </ul>
      <button onClick={Next}>Next</button>
      <div className='index'>
        {index + 1} of {data.length} questions
      </div>
      </>
      }
      {result?<>
        <h2>You score {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button>
      <footer>
      NO NEED FOR RESET I WILL CHOOSE YOU ALL OVER AGAIN BABY
      </footer>
     
      </>: <></>}
      
      </div>
      
  )
  }
export default Quiz