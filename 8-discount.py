#function to check discount

def calculate_discount(price, discount_percent):
    if discount_percent >= 20:
        return True
    else:
        return False
#usage
price = 100
discount_percent = 10
print('result:', calculate_discount(price, discount_percent))