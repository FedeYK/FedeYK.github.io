from flask import Flask, render_template, request
import csv

app = Flask(__name__)

# with open("data/users.csv") as file:
#     # reader = csv.DictReader()
#     users = []
#     for line in file:
#         users.append(line)



@app.route("/")
def index():
    with open("data/users.csv") as file:
        users = []
        reader = csv.reader(file)
        for line in reader:
            users.append(line)

    number_of_users = len(users)
    return render_template("index.html", number_of_users=number_of_users, users=users)

@app.route("/login")
def login_form():
    return render_template("login.html")

@app.route("/handle-login", methods=["POST"])
def handle_login():
    username = request.form["username"]
    password = request.form["password"]

    return "OK"

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/user/<user>")
def userInfo(user):
    with open("data/users.csv") as file:
        reader = csv.reader(file)
        thisuser = None
        for line in reader:
            if user in line:
                date_birth = line[1]
                name = line[2]
                surname = line[3]
                email = line[4]
                thisuser = line
                break

        return render_template("users.html", user_id=user, date_birth=date_birth, name=name, surname=surname, email=email, other=thisuser)
    
    # return render_template("users.html", user_id=user, date_birth=date_birth, name=name, surname=surname, email=email)

app.run(port=8080, debug=True)
