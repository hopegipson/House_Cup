class HousesController < ApplicationController
    def index
        self.calculate_house_points()
        houses = House.all
        render json: HouseSerializer.new(houses).to_serialized_json
      end

      def show
        house = House.find(params[:id])
        house.calculate_house_points
        render json: HouseSerializer.new(house).to_serialized_json
      end
end
