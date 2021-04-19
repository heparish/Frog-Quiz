//countdown code
var timerEl = document.getElementById('countdown');

function countdown() {
  var timeLeft = 3;
 
  var timeInterval = setInterval(function () {
   
    if (timeLeft > 1) {
     
      timerEl.textContent = 'Time: ' + timeLeft ;
      
      timeLeft--;
    } else if (timeLeft === 1) {

      timerEl.textContent = 'Time: ' + timeLeft ;
      timeLeft--;
    } else {

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
(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
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
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
function showResults(){
  
     // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
      let score = 0;
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          score++; 
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      resultsContainer.innerHTML = `You got ${score} out of 10 questions correct!`;
    }
  
function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
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
    const submitButton = document.getElementById('submit');
    const startButton = document.getElementById('start')
    const myQuestions = [
      {
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
      }
    ];
  
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Shows the first page and then disappears and makes time start
    
    startButton.addEventListener('click', function(e){
      e.preventDefault()
      disappear.style.display = "none"
      container.style.display = "block"
      buttons.style.display = "block"
      showSlide(currentSlide);
      countdown();
    });
    
    submitButton.addEventListener('click', function(e){
      e.preventDefault()
      showFinal.style.display = "none"
      container.style.display = "block"
      buttons.style.display = "block"
      showSlide(currentSlide);
    });

    const container = document.getElementById("quiz-container");
    const buttons = document.getElementById("buttons");
    const disappear = document.getElementById("disappear");
    const showFinal = document.getElementById("showFinal");
    const resultsPage = document.getElementById("resultsPage");
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();

