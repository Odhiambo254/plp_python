#creating an empty list
my_list = []
#append values 
my_list.extend([10, 20, 30, 40])
#insert a value at second position
my_list.insert(1, 15)
#extend the list with anothe values [50, 60, 70]
my_list.extend([50, 60, 70])
#remove the last element from my list
my_list.pop()
#sort the list in ascending order
my_list.sort()
#find and print index of 30
index_30 = my_list.index(30)
print(index_30)