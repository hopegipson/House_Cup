class UsersController < ApplicationController

    def create
        user = User.create(username: user_params[:user_username], patronus: user_params[:user_patronus], scores:[], house: House.all.find_by(id: 1))
        render json: UserSerializer.new(user).to_serialized_json
      end


    def index
        users = User.all
        render json: UserSerializer.new(users).to_serialized_json
      end

      def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user).to_serialized_json
      end

      def update
        user = User.find_by(id: params[:id])
       # if user_params_score[:scores]
       # user.scores << user_params_score[:scores]
       # user.check_score_for_house_points(user_params_score[:scores])
       # user.calculate_highest_score
        #elsif user_params_score[:house_name]
          user.house = House.find_by(name: user_params_score[:house_name])
       # end
        user.save
        render json: UserSerializer.new(user).to_serialized_json
      end

      private

      def user_params
        params.require(:user_info).permit(:user_username, :user_patronus)
      end

      def user_params_score
       # params.require(:user_info_score).permit(:scores, :house_name)
        params.require(:user_info_score).permit(:house_name)

      end

 
end
