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
Quiz.delete_all
Question.delete_all


DATA = {
 house_keys: %w[name image crest primary_color secondary_color mascot element house_information small_summary traits points],
  houses: [
    ['Unsorted', 'https://img2.cgtrader.com/items/2228955/0404dd9a15/hogwarts-crest-3d-model-obj-3ds-fbx-c4d-stl.jpg', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Gryffindor_crest.png', 'Gray', 'Black', 'None', 'None', 'None', 'To earn points, use the sorting quiz to be assigned a Hogwarts house.', 'House Traits will Appear Once you are Sorted', 0],
    ['Gryffindor', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/GryffindorIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Gryffindor_crest.png', 'DarkRed', 'Gold', 'Lion', 'Fire', 'Gryffindor is one of the four Houses of Hogwarts School of Witchcraft and Wizardry, founded by Godric Gryffindor. The particular characteristics of students Sorted into Gryffindor are courage, chivalry, and determination. The emblematic animal is a lion, and its colours are red and gold. Minerva McGonagall is the most recent known Head of House. Sir Nicholas de Mimsy-Porpington, also known as "Nearly Headless Nick" is the house ghost. Gryffindor corresponds roughly to the element of fire, and it is for that reason that the colours red and gold were chosen to represent the House[1].The colour of fire corresponds to that of a lion as well, red representing the mane and tail and gold representing the coat.', 'Gryffindor instructed the Sorting Hat to choose students possessing characteristics he most valued, such as courage, chivalry, and determination, to be sorted into his house.', 'Bravery, Nerve, Chivalry, Courage, Daring, Strong of Will', 0],
    ['Slytherin', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/SlytherinIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Slytherin_crest.png', 'DarkGreen', 'Silver', 'Serpent', 'Water', 'Slytherin is one of the four Houses at Hogwarts School of Witchcraft and Wizardry. Founded by Salazar Slytherin, the house is composed mostly of pure-blood students, due to its founder mistrust of Muggle-borns. The house is traditionally home to students who exhibit such traits as cunning, resourcefulness, and ambition. Its emblematic animal is a snake and its colours are green and silver. The house ghost is the Bloody Baron. Slytherin corresponds roughly with the element of water with serpents being commonly associated with the sea and lochs in western European mythology as well as serpents being physically fluid and flexible animals. The colours also correspond with waters around lakes and lochs often being green, and silver being often associated with grey rain water.', 'Slytherins tend to be ambitious, shrewd, cunning, strong leaders, and achievement-oriented. They also have highly developed senses of self-preservation. ', 'Traditionalism, Resourcefulness, Cunning, Ambition, Power',  0],
    ['Ravenclaw', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/RavenclawIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Ravenclaw_crest.png', 'MidnightBlue', 'GoldenRod', 'Eagle', 'Air', 'Ravenclaw is one of the four Houses of Hogwarts School of Witchcraft and Wizardry, founded by Rowena Ravenclaw. Members of this house are characterised by their wit, learning, and wisdom. Its house colours are blue and bronze, and its symbol is an eagle. The house ghost, who in life was the daughter of the house founder Rowena Ravenclaw, is the Grey Lady. Ravenclaw roughly corresponds with the element of air; the House colours blue and bronze were chosen to represent the sky and eagle feathers respectively, both having much to do with air.', 'Members of the house of Rowena Ravenclaw are characterised by their wit, learning, and wisdom. ', 'Intelligence, Wit, Wisdom, Creativity, Individuality, Originality, Acceptance', 0],
    ['Hufflepuff', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/HufflepuffIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Hufflepuff_crest.png', 'Gold', 'Black', 'Badger', 'Earth', 'Hufflepuff is one of the four Houses of Hogwarts School of Witchcraft and Wizardry. Its founder was the medieval witch Helga Hufflepuff. Hufflepuff is the most inclusive among the four houses; valuing hard work, patience, loyalty, and fair play rather than a particular aptitude in its members. The emblematic animal is a badger, and yellow and black are its colours. The Head of Hufflepuff is Pomona Sprout and the Fat Friar is the House patron ghost. Hufflepuff corresponds roughly to the element of earth[1], and it is for that reason that the House colours were chosen: yellow represented wheat, while black was emblematic of soil[2]. The Hufflepuff points hourglass contains yellow diamonds', 'Hufflepuff is the most inclusive among the four houses; valuing hard work, dedication, patience, loyalty, and fair play rather than a particular aptitude in its members.', 'Dedication, Hard Work, Fair play, Patience, Kindness, Tolerance',  0]
  ]
}.freeze

DATA2 = {
 quiz_keys: %w[name],
  quizzes: [
    ['Hogwarts Trivia Challenge'],
    ['Hogwarts Sorting Hat'],
  ]
}.freeze

hogwarts_house_collection = []

    DATA[:houses].each do |house|
      new_house = House.new
      house.each_with_index do |attribute, i|
        new_house.send(DATA[:house_keys][i] + '=', attribute)
      end
      new_house.save
      hogwarts_house_collection << new_house
    end

hogwarts_house_collection.each do |house|
    house_size = (SecureRandom.random_number(6) + 1).floor
    (1..house_size).each do |poke|
        username = Faker::Name.first_name
        patronus = Faker::Creature::Animal.name
        User.create(username: username, patronus: patronus, house_id: house.id, scores: [0])
      end
    end


    DATA2[:quizzes].each do |quiz|
        new_quiz = Quiz.new
        quiz.each_with_index do |attribute, i|
          new_quiz.send(DATA2[:quiz_keys][i] + '=', attribute)
        end
        new_quiz.save
      end

    quiz = Quiz.all.find_by(id: 1)
    quiz2 = Quiz.all.find_by(id: 2)


DATA3 = {
    question_keys: %w[question answers quiz correct_answer gryffindor_answer hufflepuff_answer slytherin_answer ravenclaw_answer],
     questions: [
       ['What house at Hogwarts does Harry belong to?', {"A"=>"Slytherin", "B"=>"Hufflepuff", "C"=>"Slytherin", "D"=>"Gryffindor"}, quiz, "D", nil, nil, nil, nil],
       ['What position does Harry play on his Quidditch team?', {"A"=>"Bludger", "B"=>"Chaser", "C"=>"Seeker", "D"=>"Keeper"}, quiz, "C", nil, nil, nil, nil], 
       ['What is your favorite animal', {"A"=>"Lion", "B"=>"Badger", "C"=>"Snake", "D"=>"Raven"}, quiz2, nil, "A", "B", "C", "D"], 
       ['What is your best trait', {"A"=>"Bravery", "B"=>"Intelligence", "C"=>"Vengeance", "D"=>"Finding Things"}, quiz2, nil, "A", "D", "C", "B"]


     ]
   }.freeze

      DATA3[:questions].each do |question|
        new_question = Question.new
        question.each_with_index do |attribute, i|
          new_question.send(DATA3[:question_keys][i] + '=', attribute)
        end
        new_question.save
      end




