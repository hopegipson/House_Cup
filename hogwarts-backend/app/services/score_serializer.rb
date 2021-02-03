class ScoreSerializer
    def initialize(score_object)
      @score = score_object
    end
   
    def to_serialized_json
      @score.to_json(:include => {
        :user => {:only => [:username, :patronus, :scores, :highest_score, :house_points]},
       :house => {:only => [:name, :id]}
       })
    end

    
  end