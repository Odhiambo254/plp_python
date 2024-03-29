class Person:
    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender
 #function to introduce 
    def introduce(self):
        print(f"hello, my name is {self.name}. i am {self.age} years old  and i am {self.gender}")
            # CREATING AN INSTANCE 
person1 = Person('ANDREW', 20, 'MALE')

            #calling the function 
person1.introduce()