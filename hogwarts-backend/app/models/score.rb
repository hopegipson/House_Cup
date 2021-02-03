class Score < ApplicationRecord
  belongs_to :user
  has_one :house, through: :user

  def check_score_for_house_points
    if self.number_correct > 1 
      self.house_points += 10
    elsif self.number_correct > 0 && self.number_correct < 2
      self.house_points += 5
    else
      self.house_points += 0
    end
  end
end
