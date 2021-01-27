class QuizSerializer
    def initialize(quiz_object)
      @quiz = quiz_object
    end
   
    def to_serialized_json
      @quiz.to_json(:include => {
        :questions => {:only => [:question, :answers, :correct_answer]},
      }, :except => [:updated_at, :created_at])
    end
  end