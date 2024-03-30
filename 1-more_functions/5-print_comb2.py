#Write a program that prints numbers from 0 to 99.
def print_numbers():
    for i in range(0, 100):
        print(f"{i:02d}", end=",")# the 02d format specifiers is used to print a two digit number.
print_numbers()