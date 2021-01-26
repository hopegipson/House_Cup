# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'

User.delete_all
House.delete_all
 
houses_name = [
  'Gryffindor',
  'Ravenclaw',
  'Slytherin',
  'Hufflepuff'
]

hogwarts_house_collection = []
 
houses_name.each do |name|
    hogwarts_house_collection << House.create(name: name)
end

hogwarts_house_collection.each do |house|
    house_size = (SecureRandom.random_number(6) + 1).floor
    (1..house_size).each do |poke|
        username = Faker::Name.first_name
        User.create(username: username, house_id: house.id)
      end
    end