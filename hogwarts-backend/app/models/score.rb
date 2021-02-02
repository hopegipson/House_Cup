class Score < ApplicationRecord
  belongs_to :user
  belongs_to :house

  def check_score_for_house_points()
    if self.number_correct > 1 
      self.house_points += 10
    elsif self.number_correct > 0 && score < 2
      self.house_points += 5
    else
      self.house_points += 0
    end
  end
end
