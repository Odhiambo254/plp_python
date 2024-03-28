#we use ** if the number of keywords kwargs is unknown.
def add_ages(**ages):
    sum = 0
    for k, v in ages.items():
        sum += v
    return sum
print('total : ', add_ages(mutemi=23, andrew=34, ahmed=21))