let score = 0;
let currentQuestionIndex = 0;
let teacherIsAngry = false;
const blackboard = document.getElementById('blackboard');
const questionText = document.getElementById('blackboard-text');
const answerContainer = document.getElementById('buttons-container');
const restartButton = document.getElementById('restart-button');
const teacherImage = document.getElementById('teacher');
const teacherMoods = ["url('/assets/images/quiz_game/teacher.png')", "url('/assets/images/quiz_game/angry_teacher.png')"];
const resultsFeedback = document.getElementById('feedback');
const results = ["Correct!", "Wrong!", "You Win!", "Sorry, You Lose.", "Hooray!", "F@#!?*!"];
const quiz = [
    { question: "What animal makes a barking sound?", answers: [ {text: "Dog", value: true}, {text: "Cat", value: false}, {text: "Fish", value: false} ] },
    { question: "What is the capital city of France?", answers: [ {text: "London", value: false}, {text: "Paris", value: true}, {text: "Berlin", value: false} ] },
    { question: "When was the battle of Hastings fought?", answers: [ {text: "1066", value: true}, {text: "1945", value: false}, {text: "1789", value: false} ] },
    { question: "What is the largest ocean on Earth?", answers: [ {text: "Atlantic", value: false}, {text: "Indian", value: false}, {text: "Pacific", value: true} ] },
    { question: "Who famously discovered gravity?", answers: [ {text: "Newton", value: true}, {text: "Einstein", value: false}, {text: "Tesla", value: false} ] },
    { question: "What instrument has keys?", answers: [ {text: "Piano", value: true}, {text: "Guitar", value: false}, {text: "Violin", value: false} ] },
    { question: "Which planet is famously red?", answers: [ {text: "Mars", value: true}, {text: "Venus", value: false}, {text: "Earth", value: false} ] },
    { question: "What is the longest river on Earth?", answers: [ {text: "Nile", value: true}, {text: "Amazon", value: false}, {text: "Yangtze", value: false} ] },
    { question: "What is the hardest substance?", answers: [ {text: "Diamond", value: true}, {text: "Graphite", value: false}, {text: "Steel", value: false} ] },
    { question: "What element has the highest melting point?", answers: [ {text: "Tungsten", value: true}, {text: "Iron", value: false}, {text: "Copper", value: false} ] }
];

restartButton.hidden = true;
teacherImage.style.backgroundImage = teacherMoods[0];
resultsFeedback.innerText = "Let's Play!";
const preloadTeacher = new Image();
preloadTeacher.src = '/assets/images/quiz_game/angry_teacher.png';

function updateTeacherImage(){
    if(teacherIsAngry){
        teacherImage.style.backgroundImage = teacherMoods[1];
        teacherImage.className = 'angry';
        teacherImage.classList.remove('happy');
    }else{
        teacherImage.style.backgroundImage = teacherMoods[0];
        teacherImage.classList.remove('angry');
        teacherImage.className = 'happy';
    }
}

function randomiseQuestions(){
    quiz.sort(() => Math.random() - 0.5);
    quiz.forEach((e, i) => console.log(`Q${(i + 1)}: ${e.question}`));
}

function renderQuestion(){
    let q = quiz[currentQuestionIndex];
    questionText.innerText = q.question;
    answerContainer.innerHTML = '';
    q.answers.sort(() => Math.random() - 0.5);
    q.answers.forEach(answer => {
        let answerButton = document.createElement('button');
        answerButton.innerText = answer.text;
        answerButton.className = 'button-54';
        answerButton.onclick = () => {
            if(answer.value == true){
                //Correct answer
                score++;
                resultsFeedback.innerText = results[0];
                teacherIsAngry = false;
            }else{
                //Wrong answer
                resultsFeedback.innerText = results[1];
                teacherIsAngry = true;
            }
            updateTeacherImage();
            currentQuestionIndex++;
            if(currentQuestionIndex != quiz.length){
                renderQuestion();
            }else{
                if( ((score/quiz.length)*100) >= 80 ){
                    //WIN
                    questionText.innerText = results[2];
                    resultsFeedback.innerText = results[4];
                    teacherIsAngry = false;
                }else{
                    //LOSE
                    questionText.innerText = results[3];
                    resultsFeedback.innerText = results[5];
                    teacherIsAngry = true;
                }
                updateTeacherImage();
                answerContainer.innerHTML = `<h2>Your Score was: ${(score/quiz.length)*100}%</h2>`;
                restartButton.hidden = false;
                console.log(`Current Score is: ${(score/quiz.length)*100}%`);
            }
        };
        answerContainer.appendChild(answerButton);
    });
}

restartButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultsFeedback.innerText = "Let's Play!";
    teacherIsAngry = false;
    restartButton.hidden = true;
    updateTeacherImage();
    randomiseQuestions();
    renderQuestion();
})

updateTeacherImage();
randomiseQuestions();
renderQuestion();