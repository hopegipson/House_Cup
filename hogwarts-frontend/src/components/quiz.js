class Quiz {
    constructor(quiz){
        this.quizElement = document.getElementById('quiz');
        this.slides = []
        this.createQuestions(quiz)
      //  this.quizElement.appendChild(this.slides)
    }


    createQuestions = (quiz) => {
        quiz.questions.forEach((currentQuestion) => {
            const question1 = new Question(currentQuestion)
           // this.slides.push(question1.slide)
           this.quizElement.appendChild(question1.slide)
        })
    }

}