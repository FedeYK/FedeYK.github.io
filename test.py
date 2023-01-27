import csv


with open("data/users.csv") as file:
    # reader = csv.DictReader()
    users = []
    for line in file:
        users.append(line)


print(len(users))

user = "YAYOLXSFYRBYQT6Q"

hashmap = {}
for item in users:
    hashmap[item[0]] = item[1:]

print(hashmap)