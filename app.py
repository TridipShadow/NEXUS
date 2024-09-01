from flask import Flask, send_from_directory, request, redirect, url_for
from pymongo import MongoClient
import bcrypt


app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['Nexus']
users_collection = db['users data']


@app.route('/')
def index():
    return send_from_directory('templates', 'login.html')


@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')

    if email and password:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user_data = {
            'email': email,
            'password': hashed_password
        }
        users_collection.insert_one(user_data)

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
