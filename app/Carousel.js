"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./globals.css";

export default function Carousel({
  handleSelect,
  questions,
  replies,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);

  const makeChoice = ( id, option) => {
    handleSelect(id, option);
  };

  const prev = () => {
    setCurr((curr) => (curr === 0 ? questions.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === questions.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const isOptionSelected = (questionId, option) => {
    switch (questionId) {
      case 1:
        return replies.connectionType === option;
      case 2:
        return replies.userCount === option;
      case 3:
        return replies.activities.includes(option);
      case 4:
        return replies.deviceCount === option;
      case 5:
        return replies.buildingSize === option;
      default:
        return false;
    }
  }; 

  return (
    <div className="overflow-hidden relative w-full h-[90%]">
      <div
        className="flex flex-row w-full h-[90vh] mt-[20vh] overflow-x-hidden items-start justify-center ">
         <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white mt-[15vh]"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
  
        <div 
        className="w-[70%] question-container flex flex-col h-auto">
            <h3 className="text-xl mb-8 text-center cursor-pointer text-blue-400">
              {questions[curr].id}. {questions[curr].question}
            </h3>
            <div className="text-center flex flex-col items-center">
              {questions[curr].answers.map((option, ind) => (
                <button
                  key={ind}
                  className={`text-l p-2 mb-2 cursor-pointer w-fit hover:underline ${
                  isOptionSelected(questions[curr].id, option)
                    ? "bg-blue-500 text-white rounded-xl" // selected answer
                    : "bg-transparent" // default style
                }`}
                  onClick={() => makeChoice(questions[curr].id, option)}
                >
                {option} 
                </button>
              ))}
            </div>
        </div>
          <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white mt-[15vh]"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
