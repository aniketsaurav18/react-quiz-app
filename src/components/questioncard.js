import React, { useState } from "react";

const QuestionCard = ({
  questions,
  answer,
  callback,
  userAnswer,
  questionNumber,
  totalQuestion,
}) => {
  const [className, setClassName] = useState("answerbtn");
  console.log(userAnswer);
  return (
    <div className="questionCard">
      <p className="number">
        Question:{questionNumber}/{totalQuestion}
      </p>
      <p className="questiontext">{questions}</p>
      <div key={answer} className="answerdiv">
        {answer.map((ans) => {
          return (
            <button
              type="button"
              disabled={userAnswer ? true : false}
              value={ans}
              onClick={callback}
              className={className}
            >
              {ans}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
