import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestion] = useState([]);

  //Fetch GET
  useEffect(() => {
    fetch(`http://localhost:4000/questions`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
      })
  },[]);

  function handleDeleteClick(id) {
    //Fetch DELETE
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = question.filter((q) => q.id !== id);
        setQuestion(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    //Fetch PATCH
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = question.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestion(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      {question.map((q) => (
        <ul>
          <QuestionItem 
            key={q.id}
            question={q}
            onDeleteClick={handleDeleteClick}
            onAnswerChange={handleAnswerChange}
          />
        </ul>
      ))
      }
    </section>
  );
}

export default QuestionList;