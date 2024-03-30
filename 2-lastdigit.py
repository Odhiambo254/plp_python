def last_digit(num):
    return num

#ask user for input
num = int(input("please enter a two digit number: "))
 # check if last digit is greater than 5
if num > 5:
    print(f"the last digit is {num}: and is greater than 5")
elif num == 0:
    print(f"the last digit is {num}: and is zero")
else:
    print(f"the last digit is {num}: and is less than 5")

