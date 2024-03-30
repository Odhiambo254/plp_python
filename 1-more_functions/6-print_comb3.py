#Write a program that prints all possible different combinations of two digits.
def print_combination():
    for i in  range(10):
        for j in range(i +1, 10): # inner loop to add the next digit to i thus i+jto give ij=01
            print(f"{i}{j}", end=",")
print_combination()