let answer = "";
let answerState = "";
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  lettersState = getDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  generateWord();
}

function generateWord() {
  answer = dictionary[Math.floor(Math.random() * dictionary.length)];
  answerState = "*".repeat(answer.length);
  drawAnswerState(answerState);
}

function onKeyClick(letter) {
  if (mistakesCount === 7) {
    alert(`Конец игры. Неотгаданное слово: ${answer}`);
    startGame();
    return;
  }

  let letterFromState;

  for (let i = 0; i < lettersState.length; i++) {
    const element = lettersState[i];
    if (element.char === letter) {
      letterFromState = element;
      break;
    }
  }

  if (!answer.includes(letter) && !letterFromState.error) {
    mistakesCount++;
    letterFromState.error = true;
  } else if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;

    let answerStateArray = answerState.split("");

    for (let i = 0; i < answer.length; i++) {
      const element = answer[i];
      if (element === letter) {
        answerStateArray[i] = letter;
      }
    }

    answerState = answerStateArray.join("");
  }

  drawPerson(mistakesCount);

  drawBoard(lettersState);

  drawAnswerState(answerState);

  if (answerState === answer) {
    winGame();
  }
}
