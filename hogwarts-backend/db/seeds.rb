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
DATA4 = {
 house_keys: %w[name image crest color points],
  houses: [
    ['Gryffindor', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/GryffindorIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Gryffindor_crest.png', 'red', 0],
    ['Slytherin', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/SlytherinIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Slytherin_crest.png', 'green', 0],
    ['Ravenclaw', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/RavenclawIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Ravenclaw_crest.png', 'purple', 0],
    ['Hufflepuff', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/HufflepuffIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Hufflepuff_crest.png', 'yellow', 0]

  ]
}.freeze
 


hogwarts_house_collection = []

    DATA4[:houses].each do |house|
      new_house = House.new
      house.each_with_index do |attribute, i|
        new_house.send(DATA4[:house_keys][i] + '=', attribute)
      end
      new_house.save
      hogwarts_house_collection << new_house
    end


hogwarts_house_collection.each do |house|
    house_size = (SecureRandom.random_number(6) + 1).floor
    (1..house_size).each do |poke|
        username = Faker::Name.first_name
        User.create(username: username, password: "password", house_id: house.id)
      end
    end