#!/usr/bin/python3
 #creating the file 
with open('my_file.txt', 'w') as file:
    #write the 3line.
    file.write('this is the first line\n')
    file.write('ilove myself')
    file.write('i am doing nursing')
print("file 'my_file.txt' has been created succcesfully.")
# reading the file.
print("\n the following are the contents:")

with open("my_file.txt", "r") as file:
    #read and print each line
    for line in file:
        print(line, end="")

        #we now want to append
with open("my_file.txt", "a") as file:
    #append these to the file.
    file.write("i am now in year four")
    file.write("i enjoy coding")

#we now want to see what has been appended.
print("\n these last 2 lines have been added :")
with open("my_file.txt", "r") as file:
    for line in file:
        print(line)

        # we want to cut errot handling
try:
    # Open the file "my_file.txt" in append mode ('a')
    with open("my_file.txt", "a") as file:
        # Append three additional lines of text
        file.write("This is an appended line.\n")
        file.write("Appending lines is easy with Python.\n")
        file.write("You can modify files dynamically!\n")

    print("Three lines have been appended to 'my_file.txt'.")

    # Read from the file "my_file.txt" and display its updated contents
    print("\nUpdated contents of 'my_file.txt':")
    with open("my_file.txt", "r") as file:
        # Read and print each line
        for line in file:
            print(line, end="")

except FileNotFoundError:
    print("Error: File not found.")

except PermissionError:
    print("Error: Permission denied to access the file.")

except Exception as e:
    print("An unexpected error occurred:", e)

finally:
    print("Script execution completed.")
