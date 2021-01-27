class QuizzesController < ApplicationController
    def index
        quizzes = Quiz.all
        render json: QuizSerializer.new(quizzes).to_serialized_json
      end

      def show
        quiz = Quiz.find(params[:id])
        render json: QuizSerializer.new(quiz).to_serialized_json
      end
end
