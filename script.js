let qarr = [
  {
    q: "What country has the highest life expectancy?",
    options: ["India", "Canada", "HongKong", "Australia"],
    ans: "HongKong",
  },
  {
    q: "Where would you be if you were standing on the Spanish Steps?",
    options: ["Greece", "Vienna", "Italy", "Rome"],
    ans: "Rome",
  },
  {
    q: "What city is known as The Eternal City?",
    options: ["Rome", "Spain", "Delhi", "Amsterdam"],
    ans: "Rome",
  },
  { q: "Who discovered that the earth revolves around the sun?", options: ["Galileo", "Einstein", "Alexander", "Copernicus"], ans: "Copernicus"},
  {
    q: "Which planet has the most moons?",
    options: ["Saturn", "Venus", "Jupiter", "Mars"],
    ans: "Saturn",
  },
  { q: "What is the world's fastest bird", options: ["Falcon", "Eagle", "Vulture", "Woodpecker"], ans: "Falcon"},
  { q: "In what country is the Chernobyl nuclear plant located?", options: ["Ukraine", "America", "Austria", "Russia"], ans: "Ukraine"},
  { q: "What software company is headquartered in Redmond, Washington?", options: ["Microsoft", "Apple", "Google", "Facebook"], ans: "Microsoft"},
  { q: "In what country would you find Mount Kilimanjaro?", options: ["China", "India", "Tanzania", "Mongolia"], ans: "Tanzania"},
  { q: "Which English city is known as the Steel City?", options: ["Manchester", "Milton", "Sheffield", "Newcastle upon Tyne"], ans: "Sheffield"},
  { q: "What was Meta Platforms Inc formerly known as?", options: ["Facebook", "Twitter", "Apple", "Whatsapp"], ans: "Facebook"},
  { q: "Which is the only planet in our solar system not named after a Roman or Greek god?", options: ["Earth", "Venus", "Mars", "Saturn"], ans: "Earth"},
  { q: "What is zero points in tennis known as?", options: ["Start", "Zero", "One", "Love"], ans: "Love"},
  { q: "The famous Dilwara Temples are situated in?", options: ["Uttar Pradesh", "Rajasthan", "Maharashtra", "Madhya Pradesh"], ans: "Rajasthan"},
  { q: "Entomology is the science that studies", options: ["Behavior of human beings", "Insects", "The origin of scientific terms", "The formation of rocks"], ans: "Insects"},
  { q: "Garampani sanctuary is located at", options: ["Junagarh, Gujarat", "Diphu, Assam", "Kohima, Nagaland", "Gangtok, Sikkim"], ans: "Diphu, Assam"},
  { q: "For which of the following disciplines is Nobel Prize awarded?", options: ["Physics and Chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All of the above"], ans: "All of the above"},
  { q: "In which year of First World War Germany declared war on Russia and France?", options: ["1914", "1915", "1916", "1917"], ans: "1914"},
  { q: "India has largest deposits of ____ in the world.", options: ["gold", "copper", "mica", "None of the above"], ans: "mica"},
  { q: "In a normal human body, the total number of red blood cells is", options: ["15 trillion", "20 trillion", "25 trillion", "30 trillion"], ans: "30 trillion"},
];
console.log(qarr.length);
let answers = [];
console.log(answers);
var qno;
var currq;
var playing = false;
var score;
var timer;

let panel = document.querySelector(".panel");
let scoreDiv = panel.querySelector(".scoreBox");
let startResetbtn = panel.querySelector(".startResetGameBtn");
let ansBtn = panel.querySelectorAll(".box");
let scoreVal = panel.querySelector("#scoreValue");
let timerDiv = panel.querySelector(".timer");
let timerSpan = panel.querySelector("#TimerVal");
let questionDiv = panel.querySelector(".questionDiv");
let correctansbox = panel.querySelector(".correct");
let wrongansbox = panel.querySelector(".wrong");
let gameOver = panel.querySelector(".gameOver");
let currTool = null;
startResetbtn.innerHTML = "Start Game";

// if we click on start/reset
startResetbtn.onclick = function (e) {
  answers = [];
  console.log(answers);

  //if we are not playing->
  if (!playing) {
    timer = 60;
    score = 0;
    scoreDiv.style = "display:block";
    // change button to reset
    e.target.innerHTML = "Reset Game";
    // hide gameover box
    gameOver.style = "display:none";

    //0) set score to zero
    scoreVal.innerHTML = score;

    //1) show timer box
    timerSpan.innerHTML = `${timer} secs`;
    timerDiv.style = "display:block";

    //4) countdown
    countdown();

    //2) display question 3) display options
    qno = Math.floor((qarr.length)* Math.random());    //0,0.1,0.02*14   0-13.9999913
    qno = displayQuestionandOptions(qno);
    answers.push(qno);

    playing = true;
  }
  //if we are playing -> reload page
  else if (playing) {
    //reload page
    location.reload();
  }
  // console.log(playing);
};

for (let i = 0; i < ansBtn.length; i++) {
  // if we click on answer box
  ansBtn[i].onclick = function (e) {
    console.log(e.target);
    console.log(playing);
    if (playing) {
      console.log("qno->" + qno);
      var correctans = qarr[qno].ans;
      console.log(correctans);
      var inputans = ansBtn[i].innerHTML;
      console.log(inputans);
      if (inputans == correctans) {
        // if we are playing -> ans correct?
        console.log("ans is correct");

        //if yes -> inc score by 1
        score++;
        scoreVal.innerHTML = score;

        //show correct box for one second
        correctansbox.style = "display:block";
        let intverval1 = setInterval(myfunc, 1000);
        function myfunc() {
          correctansbox.style = "display:none";
          clearInterval(intverval1);
        }

        //generate and display new Q&A
        qno = displayQuestionandOptions(qno);
        answers.push(qno);
      } else {
        wrongansbox.style = "display:block";
        let intverval1 = setInterval(myfunc, 1000);
        function myfunc() {
          wrongansbox.style = "display:none";
          clearInterval(intverval1);
        }
        console.log("ans is wrong");
      }
    }
  };
}

function displayQuestionandOptions(qno) {
  console.log(answers);
  if (answers.includes(qno)) {
    do {
      if (answers.length >= qarr.length) {
        gameOver.innerHTML = `Game over! <br> score: ${score} `;
        gameOver.style = "display:block";
        timerDiv.style = "display:none";
        scoreDiv.style = "display:none";
        startResetbtn.innerHTML = "Start Game";
        playing = false;
        break;
      }
      //generarte another question
      qno = Math.floor((qarr.length)* Math.random()); //0,1,2,3,4
    } while (answers.includes(qno));
  }
  questionDiv.innerHTML = `${qarr[qno].q}`;
  for (let i = 0; i < ansBtn.length; i++) {
    ansBtn[i].innerHTML = `${qarr[qno].options[i]}`;
  }
  return qno;
}

function countdown() {
  let interval = setInterval(function () {
    console.log(timer);
    if (timer == 0) {
      gameOver.innerHTML = `Game over! <br> score: ${score} `;
      gameOver.style = "display:block";
      timerDiv.style = "display:none";
      scoreDiv.style = "display:none";
      startResetbtn.innerHTML = "Start Game";
      playing = false;
      clearInterval(interval);
    } else {
      timerSpan.innerHTML = `${timer} secs`;
      timer = timer - 1;
    }
  }, 1000);
}
