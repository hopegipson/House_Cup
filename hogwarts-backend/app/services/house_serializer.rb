class HouseSerializer
    def initialize(house_object)
      @house = house_object
    end
   
    def to_serialized_json
      @house.to_json(:include => {
        :users => {:only => [:username, :patronus]},
      }, :except => [:updated_at, :created_at])
    end
  end