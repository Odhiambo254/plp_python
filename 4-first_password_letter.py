pass_list = input("tell me your password:")
if len(pass_list) > 0 and pass_list[0] == 'N':
    print("the first letter of your password is:{}".format(pass_list[0]))
else:
    print("you didn't enter any leter equal to n")