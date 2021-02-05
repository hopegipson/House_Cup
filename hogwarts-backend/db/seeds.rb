require 'faker'
require 'securerandom'

User.delete_all
House.delete_all
Quiz.delete_all
Question.delete_all
Score.delete_all

DATA = {
 house_keys: %w[name image crest primary_color secondary_color mascot element house_information small_summary traits points picture],
  houses: [
    ['Unsorted', 'https://img2.cgtrader.com/items/2228955/0404dd9a15/hogwarts-crest-3d-model-obj-3ds-fbx-c4d-stl.jpg', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Gryffindor_crest.png', 'Gray', 'Black', 'None', 'None', 'None', 'To earn points, use the sorting quiz to be assigned a Hogwarts house.', 'House Traits will Appear Once you are Sorted', 0, "None"],
    ['Gryffindor', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/GryffindorIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Gryffindor_crest.png', 'DarkRed', 'Gold', 'Lion', 'Fire', 'Gryffindor is one of the four Houses of Hogwarts School of Witchcraft and Wizardry, founded by Godric Gryffindor. The particular characteristics of students Sorted into Gryffindor are courage, chivalry, and determination. The emblematic animal is a lion, and its colours are red and gold. Minerva McGonagall is the most recent known Head of House. Sir Nicholas de Mimsy-Porpington, also known as "Nearly Headless Nick" is the house ghost. Gryffindor corresponds roughly to the element of fire, and it is for that reason that the colours red and gold were chosen to represent the House[1].The colour of fire corresponds to that of a lion as well, red representing the mane and tail and gold representing the coat.', 'Gryffindor instructed the Sorting Hat to choose students possessing characteristics he most valued, such as courage, chivalry, and determination, to be sorted into his house.', 'Bravery, Nerve, Chivalry, Courage, Daring, Strong of Will', 0, "/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/gryffindorsort.png"],
    ['Slytherin', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/SlytherinIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Slytherin_crest.png', 'DarkGreen', 'Silver', 'Serpent', 'Water', 'Slytherin is one of the four Houses at Hogwarts School of Witchcraft and Wizardry. Founded by Salazar Slytherin, the house is composed mostly of pure-blood students, due to its founder mistrust of Muggle-borns. The house is traditionally home to students who exhibit such traits as cunning, resourcefulness, and ambition. Its emblematic animal is a snake and its colours are green and silver. The house ghost is the Bloody Baron. Slytherin corresponds roughly with the element of water with serpents being commonly associated with the sea and lochs in western European mythology as well as serpents being physically fluid and flexible animals. The colours also correspond with waters around lakes and lochs often being green, and silver being often associated with grey rain water.', 'Slytherins tend to be ambitious, shrewd, cunning, strong leaders, and achievement-oriented. They also have highly developed senses of self-preservation. ', 'Traditionalism, Resourcefulness, Cunning, Ambition, Power',  0, "/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/slytherinsort.png"],
    ['Ravenclaw', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/RavenclawIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Ravenclaw_crest.png', 'Blue', 'GoldenRod', 'Eagle', 'Air', 'Ravenclaw is one of the four Houses of Hogwarts School of Witchcraft and Wizardry, founded by Rowena Ravenclaw. Members of this house are characterised by their wit, learning, and wisdom. Its house colours are blue and bronze, and its symbol is an eagle. The house ghost, who in life was the daughter of the house founder Rowena Ravenclaw, is the Grey Lady. Ravenclaw roughly corresponds with the element of air; the House colours blue and bronze were chosen to represent the sky and eagle feathers respectively, both having much to do with air.', 'Members of the house of Rowena Ravenclaw are characterised by their wit, learning, and wisdom. ', 'Intelligence, Wit, Wisdom, Creativity, Individuality, Originality, Acceptance', 0, "/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/ravenclawsort.png"],
    ['Hufflepuff', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/HufflepuffIM.png', '/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/Hufflepuff_crest.png', 'Gold', 'Black', 'Badger', 'Earth', 'Hufflepuff is one of the four Houses of Hogwarts School of Witchcraft and Wizardry. Its founder was the medieval witch Helga Hufflepuff. Hufflepuff is the most inclusive among the four houses; valuing hard work, patience, loyalty, and fair play rather than a particular aptitude in its members. The emblematic animal is a badger, and yellow and black are its colours. The Head of Hufflepuff is Pomona Sprout and the Fat Friar is the House patron ghost. Hufflepuff corresponds roughly to the element of earth[1], and it is for that reason that the House colours were chosen: yellow represented wheat, while black was emblematic of soil[2]. The Hufflepuff points hourglass contains yellow diamonds', 'Hufflepuff is the most inclusive among the four houses; valuing hard work, dedication, patience, loyalty, and fair play rather than a particular aptitude in its members.', 'Dedication, Hard Work, Fair play, Patience, Kindness, Tolerance',  0, "/Users/hopegipson/hogwarts-project/hogwarts-frontend/images/hufflepuffsort.png"]
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

user_collection = [] 

hogwarts_house_collection.each do |house|
    house_size = 5
    (1..house_size).each do |poke|
        username = Faker::Name.first_name
        patronus = Faker::Creature::Animal.name
        user = User.create(username: username, patronus: patronus, house_id: house.id)
        if user.house.id != 1
        user_collection.push(user)
        end
      end
    end

user_collection.each do |user|
  score_size = (SecureRandom.random_number(5) + 1).floor
  (1..score_size).each do |poke|
    number_right = (SecureRandom.random_number(10) + 1).floor
    score = Score.new(number_correct: number_right, user_id: user.id)
    score.check_score_for_house_points()
    score.save
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
       ['How did Harry get the scar on his forehead?', {"A"=>"Attacked by a Basilisk", "B"=>"Quidditch Accident", "C"=>"Voldemort", "D"=>"Crashing the Weasley car into a whomping tree"}, quiz, "C", nil, nil, nil, nil], 
       ['How did Harry catch his first snitch?', {"A"=>"In his hat", "B"=>"With his feet", "C"=>"In his mouth", "D"=>"With his broom"}, quiz, "C", nil, nil, nil, nil], 
       ['What does the mirror of Erised do?', {"A"=>"Gives you warts", "B"=>"Tells the future", "C"=>"Makes you appear beautiful", "D"=>"Shows you your heart's desires"}, quiz, "D", nil, nil, nil, nil], 
       ['Whatis the name of the first Harry Potter Book?', {"A"=>"Harry Potter and the Philosopher's Stone", "B"=>"Harry Potter and the Sorcerer's Stone", "C"=>"Harry Potter and the Dragon's Fire", "D"=>"Harry Potter and the Chamber of Secrets"}, quiz, "A", nil, nil, nil, nil], 
       ['Who is Grawp?', {"A"=>"Ron's Owl", "B"=>"Sirius' House Elf", "C"=>"A centaur", "D"=>"Hagrid's Half Brother"}, quiz, "D", nil, nil, nil, nil], 
       ['Before his second year at Hogwarts, how do the Weasleys save Harry from the Dursleys?', {"A"=>"Floo Powder", "B"=>"A Flying Car", "C"=>"A Portkey", "D"=>"An enchanted Broom"}, quiz, "B", nil, nil, nil, nil], 
       ['What magical talent does Harry share with Voldemort?', {"A"=>"He's a parselmouth", "B"=>"He uses the cruciatus curse", "C"=>"He's an auror", "D"=>"He's an animagus"}, quiz, "A", nil, nil, nil, nil], 
       ['How does Fawkes the Phoenix save Harry?', {"A"=>"He squawks until help arrives", "B"=>"His spit", "C"=>"He flies away to get help", "D"=>"His tears"}, quiz, "D", nil, nil, nil, nil], 
       ['Who is Scabbers the rat?', {"A"=>"Sirius Black", "B"=>"Peter Pettigrew", "C"=>"Professor McGonagall", "D"=>"Remus Lupin"}, quiz, "B", nil, nil, nil, nil], 
       ['What is the Patronus of Harry?', {"A"=>"A unicorn", "B"=>"A stag", "C"=>"An owl", "D"=>"A rabbit"}, quiz, "B", nil, nil, nil, nil], 
       ['Who is Nagini?', {"A"=>"Dobby's girlfriend", "B"=>"Ron's owl", "C"=>"Hermione's cat", "D"=>"Voldemort's snake"}, quiz, "D", nil, nil, nil, nil], 
       ['How is Dobby freed from serving the Malfoys?', {"A"=>"A potion", "B"=>"A spell", "C"=>"A sock", "D"=>"A pair of pants"}, quiz, "C", nil, nil, nil, nil], 
       ['What does Lavender Brown call Ron?', {"A"=>"Won Won", "B"=>"Big Red", "C"=>"Ed Sheeran", "D"=>"Snuggles"}, quiz, "A", nil, nil, nil, nil], 
       ['Who was the seeker for the Bulgarian team in the World Cup?', {"A"=>"Ivan Vulchanov", "B"=>"Cedric Diggory", "C"=>"Igor Karkaroff", "D"=>"Viktor Krum"}, quiz, "D", nil, nil, nil, nil], 
       ['How does Rita Skeeter find out secrets?', {"A"=>"Quick Quotes Quill", "B"=>"She turns into a beetle", "C"=>"She pays Crabbe and Goyle", "D"=>"The Extendable Ear"}, quiz, "B", nil, nil, nil, nil], 
       ['What is a bezoar?', {"A"=>"A dark magic artifact", "B"=>"A hipogriff egg", "C"=>"An antidote to poison", "D"=>"A precious ruby"}, quiz, "C", nil, nil, nil, nil], 
       ['What is a thestral?', {"A"=>"Invisible Winged Horse", "B"=>"Half Giant", "C"=>"Three Headed Dog", "D"=>"An Old pixie"}, quiz, "A", nil, nil, nil, nil], 
       ['What is a Horcrux?', {"A"=>"Snakelike Creature", "B"=>"Object containing part of someone's soul", "C"=>"Mermaid Magic", "D"=>"Salazar Slytherin's staff"}, quiz, "B", nil, nil, nil, nil], 
       ['Which is not one of the horcruxes of Voldemort?', {"A"=>"Nagini", "B"=>"The sword of Gryffindor", "C"=>"Tom Riddle's Diary", "D"=>"Helga Hufflepuff's Cup"}, quiz, "B", nil, nil, nil, nil], 
       ['Who is the half-blood prince?', {"A"=>"Lucius Malfoy", "B"=>"Tom Riddle", "C"=>"Severus Snape", "D"=>"Eileen Prince"}, quiz, "C", nil, nil, nil, nil], 
       ['What is Dumbledore buried with?', {"A"=>"The sword of Gryffindor", "B"=>"The Elder Wand", "C"=>"Fawkes the Phoenix", "D"=>"The Resurrection Stone"}, quiz, "B", nil, nil, nil, nil], 
       ['Why does Snape protect Harry?', {"A"=>"He is Harry's father", "B"=>"Dumbledore orders him to", "C"=>"He was in love with his mother", "D"=>"James was his best friend"}, quiz, "C", nil, nil, nil, nil], 
       ['What is the name of the North American School of Witchcraft and Wizardry?', {"A"=>"Ilvermorny", "B"=>"Castelobruxo", "C"=>"Greylock", "D"=>"Houdini Institute"}, quiz, "A", nil, nil, nil, nil], 
       ['Which character became a professional Quidditch player?', {"A"=>"Ron", "B"=>"Hermione", "C"=>"Ginny", "D"=>"Harry"}, quiz, "C", nil, nil, nil, nil], 
       ['Who is Fluffy?', {"A"=>"Three Headed Dog", "B"=>"Hagrid's Dragon", "C"=>"Hermione's Cat", "D"=>"Harry's Owl"}, quiz, "A", nil, nil, nil, nil], 
       ['What power do dementors have over people?', {"A"=>"They make them go crazy", "B"=>"They cause them to harm one another", "C"=>"They make them do their bidding", "D"=>"They drain them of all their happiness"}, quiz, "D", nil, nil, nil, nil], 
       ['What does the Imperius curse do?', {"A"=>"Controls", "B"=>"Tortures", "C"=>"Turns the person into a pig", "D"=>"Kills"}, quiz, "A", nil, nil, nil, nil], 
       ['What is an auror?', {"A"=>"Career counselor at Hogwarts", "B"=>"A person who catches dark wizards", "C"=>"A pro quidditch player", "D"=>"A wizard that can change appearance at will"}, quiz, "B", nil, nil, nil, nil], 

                                                                                                                #gryffindor, hufflepuff, slytherin, ravenclaw                                                       
       ['Pick your favorite animal of the choices.', {"A"=>"Lion", "B"=>"Badger", "C"=>"Snake", "D"=>"Eagle"}, quiz2, nil, "A", "B", "C", "D"], 
       ['What is your best trait?', {"A"=>"Bravery", "B"=>"Intelligence", "C"=>"Resourceful", "D"=>"Loyal"}, quiz2, nil, "A", "D", "C", "B"],
       ['What is your worst trait?', {"A"=>"Manipulative", "B"=>"Stubborn", "C"=>"Too Trusting", "D"=>"Dismissive"}, quiz2, nil, "B", "C", "D", "A"],
       ['Which wizard do you look up to?', {"A"=>"Hermione Granger", "B"=>"Draco Malfoy", "C"=>"Harry Potter", "D"=>"Ron Weasley"}, quiz2, nil, "C", "D", "B", "A"],
       ['What would you like to be called least?', {"A"=>"Ignorant", "B"=>"Cowardly", "C"=>"Selfish", "D"=>"Ordinary"}, quiz2, nil, "B", "C", "D", "A"],
       ['When I am dead I want people to remember me as:', {"A"=>"The Good", "B"=>"The Great", "C"=>"The Wise", "D"=>"The Bold"}, quiz2, nil, "D", "A", "B", "C"],
       ['If you could make a potion that would guarantee you one thing what would it be?', {"A"=>"Love", "B"=>"Glory", "C"=>"Wisdom", "D"=>"Power"}, quiz2, nil, "B", "A", "D", "C"],
       ['Four boxes are placed before you. Which would you try and open?', {"A"=>"The small pewter box", "B"=>"The ornate golden casket", "C"=>"The small tortoiseshell box", "D"=>"The gleaming jet black box"}, quiz2, nil, "A", "C", "D", "B"],
       ['You and two friends need to cross a bridge guarded by a river troll who insists on fighting one of you before he will let all of you pass. Do you:', {"A"=>"Suggest drawing lots to decide who will fight", "B"=>"Suggest all three of you should fight", "C"=>"Attempt to confuse the troll so you can pass without fighting", "D"=>"Volunteer to fight"}, quiz2, nil, "D", "A", "B", "C"],
       ['You enter an enchanted garden. What would you be most curious to examine first?', {"A"=>"The bubbling pool", "B"=>"The silver leafed tree", "C"=>"The fat red toadstools", "D"=>"The statue of an old wizard"}, quiz2, nil, "D", "C", "A", "B"],
       ['Four goblets are placed before you, which do you drink?', {"A"=>"The foaming, frothing, silvery liquid that sparkles as though containing ground diamonds.", "B"=>"The smooth, thick, richly purple drink that gives off a delicious smell of chocolate and plums.	", "C"=>"The golden liquid so bright that it hurts the eye, and which makes sunspots dance all around the room.	", "D"=>"The mysterious black liquid that gleams like ink, and gives off fumes that make you see strange visions.	"}, quiz2, nil, "C", "B", "D", "A"],
       ['What kind of instrument most pleases your ear?', {"A"=>"The violin", "B"=>"The trumpet", "C"=>"The piano", "D"=>"The drum"}, quiz2, nil, "D", "B", "A", "C"],
       ['After you have died, what would you most like for people to do when they hear your name?', {"A"=>"Miss you but smile", "B"=>"Ask for more stories of your adventures", "C"=>"Think with admiration of your achievements", "D"=>"I don't care what they think when I'm dead, only what they think as I'm alive"}, quiz2, nil, "B", "A", "D", "C"],
       ['A muggle contronts you and says they know you are a wizard. Do you:', {"A"=>"Ask what makes them think so?", "B"=>"Agree and ask if they'd like a free sample of a jinx", "C"=>"Agree and walk away leaving them to wonder if you're bluffing", "D"=>"Tell them you're worried about their mental health and offer to call a doctor"}, quiz2, nil, "C", "D", "B", "A"],
       ['What pet would you most like?', {"A"=>"Dragon Toad", "B"=>"White Owl", "C"=>"Common Toad", "D"=>"Black Cat"}, quiz2, nil, "A", "C", "D", "B"],
       ['What power would you most want?', {"A"=>"Power of Invisibility", "B"=>"Power to Change Appearance", "C"=>"Superhuman Strength", "D"=>"Power to Change the Past"}, quiz2, nil, "A", "C", "D", "B"],
       ['Which road tempts you most?', {"A"=>"The wide, sunny, grassy lane", "B"=>"The narrow, dark, lantern-lit alley", "C"=>"The twisting, leaf-strewn path through the woods", "D"=>"The cobbled street lined with ancient buildings"}, quiz2, nil, "C", "A", "B", "D"],
       ['What are you most looking forward to learning at Hogwarts?', {"A"=>"Secrets About The Castle", "B"=>"About Magical Creatures", "C"=>"Transfiguration", "D"=>"Hexes and Jinxes"}, quiz2, nil, "A", "B", "D", "C"],
       ['Which of the following would you most like to study?', {"A"=>"Vampires", "B"=>"Goblins", "C"=>"Trolls", "D"=>"Werewolves"}, quiz2, nil, "D", "C", "A", "B"],
       ['Would you rather be:', {"A"=>"Feared", "B"=>"Imitated", "C"=>"Liked", "D"=>"Praised"}, quiz2, nil, "D", "C", "A", "B"]
     ]
   }.freeze

      DATA3[:questions].each do |question|
        new_question = Question.new
        question.each_with_index do |attribute, i|
          new_question.send(DATA3[:question_keys][i] + '=', attribute)
        end
        new_question.save
      end




