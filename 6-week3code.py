# define a function called power with two parameters called based and exponent.

def power(base, exponent):
    result = base ** exponent
    if result > 5000:
        return True
    else:
        return False 
# usage 
base = 10
exponent = 3
print('result:',power(base, exponent))