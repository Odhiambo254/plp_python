class Animal:
    def __init__(self, species):
        self.species = species
    
    def speak(self):
        print("Some generic sound")

class Dog(Animal):
    def __init__(self, name, age):
        super().__init__("Dog")
        self.name = name
        self.age = age
    
    def bark(self):
        print("Woof!")
my_dog = Dog("Buddy", 3)
print(my_dog.species)  # Output: Dog
my_dog.speak()  # Output: Some generic sound
my_dog.bark()  # Output: Woof!
