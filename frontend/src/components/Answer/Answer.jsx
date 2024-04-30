import { useState } from "react";

const Answer = ({
  selectedTrack,
  shuffledArtistAnswerList,
  onAnswerButtonClick,
  interactionDisabled,
}) => {
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState(
    new Array(4).fill("bg-box-color")
  );

  const answerClick = (artist, id) => {
    const isCorrect = selectedTrack.artist === artist;
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 1);
      newButtonColors[id] = "bg-correct-color";
    } else {
      newButtonColors[id] = "bg-incorrect-color";
    }
    setButtonColors(newButtonColors);
    onAnswerButtonClick();

    setTimeout(() => {
      setButtonColors(new Array(4).fill("bg-box-color"));
    }, 400);
  };

  return (
    <>
      <div className={`grid grid-cols-1 gap-y-2 md:grid-cols-2 gap-x-40`}>
        {" "}
        {/* 'grid grid-cols-2' this turns the row of answers into two columns. Adding md: applies the changes only when the screen is wider than the md breakpoint*/}
        {shuffledArtistAnswerList.map((artist, id) => (
          <button
            key={id}
            onClick={() => answerClick(artist, id)}
            disabled={interactionDisabled}
            className={`btn overflow-hidden relative
                w-64 text-text-color py-4 px-4 rounded-xl font-bold uppercase rounded-lg shadow-md hover:text-hover-text-color
                before:block before:absolute before:h-full before:w-full
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${
                  buttonColors[id]
                }  
                ${
                  buttonColors[id] === "bg-box-color"
                    ? "hover:bg-hover-color"
                    : ""
                } 
            `}
          >
            {artist}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h1 className="results-header text-2xl font-bold text-question-text-color">
          {buttonColors.includes("bg-correct-color") && (
            <div className="bg-green-500 border border-green-500 rounded-xl">
              <p className="text-white">Correct!</p>
            </div>
          )}
          {buttonColors.includes("bg-incorrect-color") && (
            <div className="bg-red-500 border border-red-500 rounded-xl">
              <p className="text-white">Wrong!</p>
            </div>
          )}
        </h1>
      </div>
    </>
  );
};

export default Answer;
