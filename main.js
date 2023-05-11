let triviaString;
let questionID = 0;
let score = 0;
let triviaLength;

document.querySelector('#triviaSection').style.display = 'none';

function getSettingData() {
  let categoria = document.querySelector('#category');

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://opentdb.com/api_category.php',
    headers: {
      Cookie: 'PHPSESSID=03ea71d8fbc908968b553def4c83c8d9',
    },
  };

  axios
    .request(config)
    .then((response) => {
      let categorias = response.data.trivia_categories;
      let listaCategorias = '';
      for (let i = 0; i < categorias.length; i++) {
        listaCategorias =
          listaCategorias +
          `<option value = '${categorias[i].id}'>${categorias[i].name}</option>`;
      }

      categoria.innerHTML = listaCategorias;
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector('#btnStartTrivia').onclick = () => {
  triviaString = '';
  questionID = 0;
  score = 0;

  document.querySelector('#score').style.display = 'none';

  getTrivia()
    .then(function (response) {
      let trivia = response.data.results;
      triviaString = JSON.stringify(trivia);
      showTrivia(questionID);
    })
    .catch((error) => console.error('error', error));
};

function showTrivia(id) {
  let trivia = JSON.parse(triviaString);
  let answersList = [];

  //let answersList = [...trivia[id].incorrect_answers];
  answersList.push(trivia[id].correct_answer);

  for (let j = 0; j < trivia[id].incorrect_answers.length; j++) {
    answersList.push(trivia[id].incorrect_answers[j]);
  }

  answersList.sort(() => Math.random() - 0.5);

  for (let z = 0; z < answersList.length; z++) {
    document.querySelector(`#btn_answer${z}`).innerHTML = answersList[z];
  }

  document.querySelector('#question_txt').innerHTML = trivia[id].question;

  document.querySelector('#triviaSection').style.display = 'flex';
  document.querySelector('#question').style.display = 'block';
  document.querySelector('#answers').style.display = 'block';

  answersList = [];
}

function next() {
  if (questionID < 5) {
    showTrivia(questionID);
  } else {
    console.log(score);
    document.querySelector('#question').style.display = 'none';
    document.querySelector('#answers').style.display = 'none';
    document.querySelector('#score_txt').innerHTML =
      'Puntuacion Final: ' + score + ' puntos';
    document.querySelector('#score').style.display = 'flex';
  }
}

function checkAnswer(selected, btnID) {
  let trivia = JSON.parse(triviaString);
  let correctAnswer = trivia[questionID].correct_answer;

  if (correctAnswer == selected) {
    document.querySelector(`#${btnID}`).style.backgroundColor = 'green';
    score += 100;
    document.querySelector('#score_txt').innerHTML = score + ' puntos';
    document.querySelector('#score').style.display = 'flex';
  } else {
    console.log(score);
    document.querySelector(`#${btnID}`).style.backgroundColor = 'red';
  }
  questionID++;
  setTimeout(function () {
    next();
    document.querySelector(`#${btnID}`).style.backgroundColor = 'black';
  }, 1000);
}

document.querySelector('#btn_answer0').onclick = () => {
  let selected = document.querySelector(`#btn_answer0`).innerHTML;

  checkAnswer(selected, 'btn_answer0');
};

document.querySelector('#btn_answer1').onclick = () => {
  let selected = document.querySelector(`#btn_answer1`).innerHTML;
  checkAnswer(selected, 'btn_answer1');
};

document.querySelector('#btn_answer2').onclick = () => {
  let selected = document.querySelector(`#btn_answer2`).innerHTML;
  checkAnswer(selected, 'btn_answer2');
};

document.querySelector('#btn_answer3').onclick = () => {
  let selected = document.querySelector(`#btn_answer3`).innerHTML;
  checkAnswer(selected, 'btn_answer3');
};

function getTrivia() {
  let url = 'https://opentdb.com/api.php?amount=5';
  let difficulty = document.querySelector('#difficulty').value;
  let category = document.querySelector('#category').value;
  url = `${url}&category=${category}&difficulty=${difficulty}&type=multiple`;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Cookie: 'PHPSESSID=03ea71d8fbc908968b553def4c83c8d9',
    },
  };

  return axios(config);
}

getSettingData();
