let attempt = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const alertElement = document.querySelector(".alert");
    alertElement.style.display = "block";
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempt === 5) return gameOver();
    attempt++;
    index = 0;
  };

  const handleEnterKey = () => {
    let correctTxt = 0;
    const answer = "APPLE";
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempt}${i}']`
      );
      const enteredTxt = block.innerText;
      const answerTxt = answer[i];
      if (enteredTxt === answerTxt) {
        block.style.background = "#6AAA64";
        correctTxt++;
      } else if (answer.includes(enteredTxt))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (correctTxt === 5) gameOver();
    else nextLine();
  };
  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-block[data-index='${attempt}${index - 1}']`
      );
      prevBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    const startTime = new Date();
    function setTime() {
      const currentTime = new Date();
      const passedTime = new Date(currentTime - startTime);
      const timeH1 = document.querySelector(".timer");
      const min = passedTime.getMinutes().toString().padStart(2, "0");
      const sec = passedTime.getSeconds().toString().padStart(2, "0");
      timeH1.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
