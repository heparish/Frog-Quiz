//countdown code
var timerEl = document.getElementById('countdown');

function countdown() {
    var timeLeft = 50;

    var timeInterval = setInterval(function() {

        if (timeLeft > 1) {

            timerEl.textContent = 'Time: ' + timeLeft;

            timeLeft--;
        }
        else if (timeLeft === 1) {

            timerEl.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        }
        else {

            timerEl.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 1000);
}

//display timer message
function displayMessage() {
    document.getElementById('countdown').innerHTML = 'Times up!';
}

//start of questions code

    function buildQuiz() {
       
        const output = [];

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                const answers = [];

                for (letter in currentQuestion.answers) {

                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }
                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        //combines output list into one string of HTML and puts it on the page
        quizContainer.innerHTML = output.join('');
    }

    let score = 0;

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;
       

        myQuestions.forEach((currentQuestion, questionNumber) => {

            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // adds to the number of correct answers
                numCorrect++;
                score++;
            }
        });
        // displays final results
        resultsContainer.innerHTML = `You got ${score} out of 5 questions correct!`;

        scoreContainer.innerHTML = ` ${score}`;
        

    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const scoreContainer = document.getElementById('score');
   // const resultsUserContainer = document.getElementById('resultsUser');
    const submitButton = document.getElementById('submit');
    const startButton = document.getElementById('start')
    const myQuestions = [{
            question: "How many species of frogs are there?",
            answers: {
                a: "100",
                b: "1000",
                c: "5000",
                d: "10,000"
            },
            correctAnswer: "c"
        },
        {
            question: "Frogs are scientifically classified in what 'order' of animals?",
            answers: {
                a: "Squamata",
                b: "Anura",
                c: "Urodela",
                d: "Gymnophiona"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the largest species of frog?",
            answers: {
                a: "African Bull Frog",
                b: "Cane Toad",
                c: "Pacman Frog",
                d: "Goliath Frog"
            },
            correctAnswer: "d"
        },
        {
            question: "What frog is considered the most toxic animal in the world?",
            answers: {
                a: "Red Posion Dart Frog",
                b: "Blue Posion Arrow Frog",
                c: "Golden Posion Frog",
                d: "Mimic Posion Frog"
            },
            correctAnswer: "c"
        },
        {
            question: "What species of frog was once used for pregnancy tests?",
            answers: {
                a: "African Clawed Frog",
                b: "Fire-bellied Toad",
                c: "Western Spadefoot Toad",
                d: "Icelandic Knocker Frog"
            },
            correctAnswer: "a"
        },
    ];

    // var score = document.getElementById('score').value;
    var saveButton = document.getElementById("saveButton");
 
 // variable to store score.
 var scoreArr=[]   
//  function to get items from localstorage
    function getScore() {
    scoreArr =JSON.parse(localStorage.getItem("scoreUserInitials"))
    console.log(scoreArr,"get item")
     //get div to append the scores by id
     var displayScores= document.querySelector("#displayScores") 
     var scoreTable= document.querySelector("#table")  
    //style it so it can be displayed
    displayScores.style.display="block"
    //do a loop to iterate through the different scores
    for(var i=0; i<scoreArr.length;i++){
        //create elements that we can append to the displayScores div
        var test=scoreArr[0]
        console.log(test, "first index")
        var scoreRow=document.createElement("li")
        scoreRow.setAttribute('class', 'scores')
        var userInitials=scoreArr[i].userInitials
        var scoreSave=scoreArr[i].score
        scoreRow.textContent=userInitials + ":" +scoreSave
        scoreTable.append(scoreRow)
        console.log(scoreTable)
    }

    }

    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const saveButn = document.querySelectorAll(".saveButton");
    let currentSlide = 0;


    // Shows the first page and then disappears and makes time start
    startButton.addEventListener('click', function(e) {
        e.preventDefault()
        disappear.style.display = "none"
        container.style.display = "block"
        buttons.style.display = "block"
        showSlide(currentSlide);
        countdown();
    });

    submitButton.addEventListener('click', function(e) {
        e.preventDefault()
        showFinal.style.display = "none"
        container.style.display = "block"
        buttons.style.display = "block"
        ResultsPage.style.display = ""
        showSlide(currentSlide);
    });

    saveButton.addEventListener('click', function(e) {
        showFinal.style.display = "none"
        container.style.display = "block"
        buttons.style.display = "block"
        ResultsPage.style.display = ""
        showSlide(currentSlide);
    });

  saveButton.addEventListener("click", function(event) {
   event.preventDefault();
   var userInitials = document.getElementById("userInitials").value.trim();
   
//   saveScore
  var highScore = {
    score: score,
    userInitials: userInitials,
  };
  scoreArr.push(highScore)
  console.log(scoreArr, "set item")
  localStorage.setItem("scoreUserInitials", JSON.stringify(highScore));;
    getScore();

    document.getElementById("displayScores").innerHTML = localStorage.getItem("userInitials", "scoreUserInitials");
   });

    const container = document.getElementById("quiz-container");
    const buttons = document.getElementById("buttons");
    const disappear = document.getElementById("disappear");
    const showFinal = document.getElementById("showFinal");
    const ResultsPage = document.getElementById("resultsPage");
    const displayScores = document.getElementById("displayScores");
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    saveButton.addEventListener("click", displayScores);

   
