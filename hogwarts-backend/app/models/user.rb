class User < ApplicationRecord
  belongs_to :house
  serialize :scores, Array

  def calculate_highest_score
    self.highest_score = self.scores.max
  end
end
