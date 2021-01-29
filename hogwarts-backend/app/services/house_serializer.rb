class HouseSerializer
    def initialize(house_object)
      @house = house_object
    end
   
    def to_serialized_json
      @house.to_json(:include => {
        :users => {:only => [:username, :patronus, :scores, :house_points]},
      }, :except => [:updated_at, :created_at])
    end
  end