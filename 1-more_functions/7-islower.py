#Write a function that checks for lowercase character
def is_lower(c):
  return ord('a') <= ord(c) <= ord('z') # is a boolean expression that checks if the ASCII value of the character c falls within the range of lowercase letters in the ASCII table.
#check if the given digit is in lowercase.
c = input("please enter a letter:")
if is_lower(c):
   print(f'{c} is lower case')
else:
   print(f'{c} is uppercase')

#cal the function 

is_lower(c)