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
        user.house = House.find_by(name: user_params_score[:house_name])
        user.save
        render json: UserSerializer.new(user).to_serialized_json
      end

      private

      def user_params
        params.require(:user_info).permit(:user_username, :user_patronus)
      end

      def user_params_score
        params.require(:user_info_score).permit(:house_name)

      end

 
end
