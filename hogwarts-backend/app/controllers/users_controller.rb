class UsersController < ApplicationController

    def create
        user = User.create(username: user_params[:user_username], patronus: user_params[:user_patronus])
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

      private

      def user_params
        params.require(:user_info).permit(:user_username, :user_patronus)
      end
end
