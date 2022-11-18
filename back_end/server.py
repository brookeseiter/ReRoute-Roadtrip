"""Server for movie ratings app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
from model import User
from jinja2 import StrictUndefined
import crud

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def home():

    return render_template('index.html')


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')

@app.route('/test')
def test_me():
    """Make sure front and back end servers are connected."""

    return jsonify({'hello': 'im here'})

# create a user route

# get all users route
@app.route('/api/users')
def all_users():
    """View all users."""

    users = crud.get_users()
    print(type(users))
    for user in users:
        print(user)

    return jsonify({user.user_id: user.create_user_dict() for user in users})

# get a user route



if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
