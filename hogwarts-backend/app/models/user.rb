class User < ApplicationRecord
  belongs_to :house
  serialize :scores
end
