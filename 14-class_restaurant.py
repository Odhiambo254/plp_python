class Restaurant:
    """creating a class called restaurant"""
    def __init__(self, restaurant_name, cuisine_type):
        self.restaurant_name = restaurant_name
        self.cuisine_type = cuisine_type
        """making methods /actions"""
    def describe_restaurant(self):
        print(f'this is : {self.restaurant_name}')
        print(f'and we offer :{self.cuisine_type}')

Restaurant = Restaurant('esscafe', 'gotilla') 
"""the instances of the restaurant"""

Restaurant.describe_restaurant() # caling the methods
