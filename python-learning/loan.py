# Get the loan details
money_owed = float(input("How much do you owe?\n"))
interest_rate = int(input("What is the interest rate?\n"))
payment = float(input("What is the monthly payment?\n"))
months = int(input("How many months do you want to calculate?\n"))

monthly_rate = interest_rate / 100 / 12


for i in range(months):
    interest_for_this_month = money_owed * monthly_rate
    money_owed = money_owed + interest_for_this_month
    money_owed = money_owed - payment
    print('Month ', i, ' Paid:',  payment, 'interest', interest_for_this_month, 'remaining balance', money_owed)
