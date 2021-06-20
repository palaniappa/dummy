import random

computer_choice = random.choice(['rock','paper','scissors'])
user_choice = input('Enter your choice\n')

if computer_choice == user_choice:
    print('TIE')
elif (user_choice == 'rock' and computer_choice == 'scissors') or (user_choice == 'paper' and computer_choice == 'rock') or (user_choice == 'scissors' and computer_choice == 'paper'):
    print('I chose ' + computer_choice + ' and You WIN')
else:
    print('I chose ' + computer_choice + ' and I WIN')
