class UserSerializer
    def initialize(user_object)
      @user = user_object
    end
   
    def to_serialized_json
      @user.to_json(:include => { :house => {:only => [:id, :name, :image, :crest, :primary_color, :secondary_color, :mascot, :element, :house_information, :small_summary, :traits, :points]},
      :scores => {:only => [:id, :number_correct, :house_points]}
    })
    end
    

  end

