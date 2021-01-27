class Question < ApplicationRecord
    belongs_to :quiz
    serialize :answers, Hash

end
