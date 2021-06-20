name = input('Enter your name:')
age = int(input('Enter your age:'))
decade = age // 10
years = age % 10
print('Hello Mr/Ms/Mrs.' + name + ', you are ' + str(decade) + ' decade and ' + str(years) + ' years old.')