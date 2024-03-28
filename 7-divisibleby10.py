#function to show divisible by 10.

def divisible_by_ten(num):
    
    if num % 10 == 0:
        return True
    else:
        False

#usage
num = 10
print('result:', divisible_by_ten(num))