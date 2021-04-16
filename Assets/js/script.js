function Timer(maxMinutes) {
    var root = null;
    var display = null;
    var time = {
      minutes: maxMinutes,
      seconds: 0
    };
    var UPDATE_RATE = 1000;
    var jobId = null;
    var timeoutCallback = null;
    
    function formatTime() {
      var min = time.minutes;
      var sec = time.seconds;
  
      if (sec < 10) {
        sec = '0' + sec;
      }
      
      return min + ':' + sec;
    }

    function init() {
        root = document.createElement('div');
        root.classList.add('quiz__timer');
        
        display = document.createElement('span');
        display.classList.add('quiz__timer__display');
        display.innerText = formatTime();
        root.appendChild(display)
      }
      
      function update() {
        time.seconds = time.seconds - 1;
        
        if (time.seconds < 0) {
          time.minutes = time.minutes - 1;
          time.seconds = 59;
        }
         
        display.innerText = formatTime();
        
        if (time.minutes === 0 && time.seconds === 0) {
          stop();
          timeoutCallback();
        }
      }
      
      function mount(node) {
        node.appendChild(root);
      }
      
      function onTimeout(callback) {
        timeoutCallback = callback;
      }
      
      function unmount() {
        stop();
        root.remove();
      }
      
      function start() {
        jobId = window.setInterval(update, UPDATE_RATE);
      }
      
      function stop() {
        if (jobId !== null) {
          window.clearInterval(jobId);
          jobId = null;
        }
      }
      
      function getCurrentTime() {
        return display.innerText;
      }
      
      init();
      
      return {
        mount: mount,
        unmount: unmount,
        start: start,
        stop: stop,
        onTimeout: onTimeout,
        getCurrentTime: getCurrentTime
      }
    }

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
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
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
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();