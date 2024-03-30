#print all the alphabets except q an e
def exceptions():
  for i in range(ord('a'), ord('z') +1): # we are using the inbuilt function ord and not ascii values
    if i != ord('q') and i != ord('e'): # we are making exceptions.
       print(chr(i), end="")

exceptions() # we now call the function