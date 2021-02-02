class QuizSerializer
    def initialize(quiz_object)
      @quiz = quiz_object
    end
   
    def to_serialized_json
      @quiz.to_json(:include => {
        :questions => {:only => [:id, :question, :answers, :correct_answer, :gryffindor_answer, :slytherin_answer, :hufflepuff_answer, :ravenclaw_answer]},
      }, :except => [:updated_at, :created_at])
    end
  end