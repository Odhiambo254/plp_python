#we used * before parameter if list is unknown.
def add_nums(*nums):
    sum = 0
    for num  in nums:
        sum += num
    return sum 
print("Total : ", add_nums(2, 6, 7, 80))
