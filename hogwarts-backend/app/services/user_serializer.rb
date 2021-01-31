class UserSerializer
    def initialize(user_object)
      @user = user_object
    end
   
    def to_serialized_json
      @user.to_json(:include => {
        :house => {:only => [:name, :image, :crest, :primary_color, :secondary_color, :mascot, :element, :house_information, :small_summary, :traits, :points]},
      }, :except => [:updated_at, :created_at])
    end
  end