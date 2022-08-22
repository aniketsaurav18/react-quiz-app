import React, { useState, useEffect } from "react";
import QuestionCard from "./components/questioncard";
import { api } from "./api";
import "./index.css";
const TOTAL_QUESTION = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);
  const [level, setlevel] = useState("easy");
  const [visible, setVisible] = useState(false);

  async function startTrivia() {
    setLoading(true);
    setGameover(false);

    const data = await api(TOTAL_QUESTION, level);
    // console.log(data);
    setQuestions(data);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e) => {
    if (!gameover) {
      const answerSelected = e.currentTarget.value;
      const check = answerSelected === questions[number].correct_answer;
      if (check) {
        // console.log("correct");
        e.currentTarget.classList.toggle("correctans");
        setScore(score + 1);
      } else {
        e.currentTarget.classList.toggle("wrongans");
      }
      const answerobject = {
        question: questions[number].question,
        answerSelected,
        check,
        correctAns: questions[number].correct_answer,
      };
      setUserAnswer([...userAnswer, answerobject]);
    }
    if (number === TOTAL_QUESTION - 1) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const nextQuestion = () => {
    if (number + 1 === TOTAL_QUESTION) {
      setGameover(true);
    } else {
      setNumber(number + 1);
    }
    setVisible(false);
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameover || userAnswer.length === TOTAL_QUESTION ? (
        <button onClick={startTrivia} className="start">
          Start
        </button>
      ) : null}
      {!gameover ? <p className="score">score:{score}</p> : null}
      {loading ? <p className="loading">loading question...</p> : null}

      {!loading && !gameover && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestion={TOTAL_QUESTION}
          questions={questions[number].question}
          answer={questions[number].answer}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}

      <button
        className={visible ? "button-40  active" : "button-40"}
        onClick={nextQuestion}
      >
        Next Question
      </button>
    </div>
  );
}

export default App;
