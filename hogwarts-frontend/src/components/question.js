class Question {
    constructor(question){
        this.slide = document.createElement('div')
        this.slide.classList.add('slide');
        this.createQuestion(question)
        this.createAnswers(question)
    }

    createQuestion = (question) => {
        this.id = question.id
        this.question = document.createElement('div')
        this.question.classList.add('questions');
        this.question.innerHTML = `${question.question}`
        this.slide.appendChild(this.question)
    }

    createAnswers = (question) => {
        this.answers = document.createElement('div')
        this.answers.classList.add('answers');
        for(var letter in question.answers){
            let label = document.createElement('label')
            let input = document.createElement('input')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', `question${question.id}`)
            input.setAttribute('value', `${letter}`)
            label.appendChild(input)
            label.innerHTML += `${letter}: ${question.answers[letter]}`
            this.answers.appendChild(label)
            this.answers.appendChild(document.createElement("br"));
          }
          this.slide.appendChild(this.answers)

    }




}