class User < ApplicationRecord
  belongs_to :house
  serialize :scores, Array
  has_many :scores

  def calculate_highest_score
    self.highest_score = self.scores.max
  end

  def check_score_for_house_points(score)
    if score > 1 
      self.house_points += 10
    elsif score > 0 && score < 2
      self.house_points += 5
    else
      self.house_points += 0
    end
  end

end
