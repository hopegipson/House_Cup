class House < ApplicationRecord
    has_many :users
    has_many :scores

    def calculate_house_points()
        count = 0
        self.users.each do |user|
        count += user.highest_score
        end
        self.points = count
    end

end
