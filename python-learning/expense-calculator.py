total = 0.0
expenses = []
no_of_expense = int(input('Enter the no of expenses:'))
for i in range(no_of_expense):
    expense = float(input('Enter the expense:'))
    expenses.append(expense)

total = sum(expenses)

print('You have spent $', total, ' so far', sep='')