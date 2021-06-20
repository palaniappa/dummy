temperature = float(input('Enter the temperature:'))
if temperature > 80 and temperature <= 100:
    print ('It is hot')
elif temperature > 100:
    print('It is too hot')
elif temperature <= 80 and temperature > 50:
    print('Enjoy the outdoors')
else:
    print('Too cold')


