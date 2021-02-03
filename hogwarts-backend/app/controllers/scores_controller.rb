class ScoresController < ApplicationController
    def index
        scores = Score.all
        render json: ScoreSerializer.new(scores).to_serialized_json
      end

      def show
        score = Score.find(params[:id])
        render json: ScoreSerializer.new(score).to_serialized_json
      end

      def create
        score = Score.new(number_correct: score_params[:number_correct], user: User.all.find_by(id: score_params[:user_id]))
        score.check_score_for_house_points()
        score.save
        render json: ScoreSerializer.new(score).to_serialized_json
      end

      def destroy
        score = Score.find(params[:id])
        score.destroy
      end

      private

      def score_params
        params.require(:score_info).permit(:number_correct, :user_id)
      end
end
