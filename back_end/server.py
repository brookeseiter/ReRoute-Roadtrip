"""Server for movie ratings app."""

import json
from flask import (Flask, render_template, url_for, request, flash, session,
                   redirect, Response, jsonify)
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user
from model import connect_to_db, db
from model import User, Stop
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired  , Length, ValidationError
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import crud
import os 
import redis
from os import environ
from dotenv import load_dotenv

load_dotenv()

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
# app.config.from_prefixed_env()
print(app.config["SECRET_KEY"])
# app.secret_key = 'dev'
CORS(app, supports_credentials=True)
bycrypt = Bcrypt(app)
# app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
# jwt = JWTManager(app)
# app.config["AUTH_SECRET_KEY"] = os.environ.get("AUTH_SECRET_KEY")
# print(app.config['AUTH_SECRET_KEY'])

# Configure Redis for storing the session data on the server side
app.config['SESSION_TYPE'] = "redis"
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")
# app.config['SESSION_COOKIE_NAME'] = 'qid'

# Create and initialize the Flask-Session object AFTER 'app' has been configured
server_session = Session(app)

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'

@app.route('/@me')
def get_current_user():
    """If logged in, returns information about current user."""

    user_id = session.get('user_id')

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = crud.get_user_by_id(user_id)

    return jsonify({
        "user_id": user.user_id,
        "email": user.email 
    })

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/<path>')
def route(path):
    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):
    return render_template('index.html')

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

@app.route('/register', methods = ['POST'])
def create_user():
    """Create a new user."""

    fname = request.json['fname']
    lname = request.json['lname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    phone_num = request.json['phone_num']

    # user_exists = crud.user_exists
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email/username already exists."}), 409
    
    hashed_password = bycrypt.generate_password_hash(password).decode('utf-8')
    new_user = crud.create_user(fname, lname, email, username, hashed_password, phone_num)
    db.session.add(new_user)
    db.session.commit()
    print('NEW USER DATA:', new_user)

    app.config['SESSION_COOKIE_NAME'] = 'uid'
    session['user_id'] = new_user.user_id
    print('SESSION:', session)
    print('SESSION[user_id]:', session['user_id'])
    print('SERVER SESSION:', server_session)

    return jsonify(new_user.to_dict())


@app.route('/login', methods = ['POST'])
def login_user():
    """Log in a user."""

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = crud.get_user_by_email(email)

    print('Login user route of server.py activated')
    print('USER:', user)
    print(password)
    print(user)

    if user is None:
        print('USER IS NONE')
        return jsonify({'message':'Please create an account.'}), 401
    elif not bycrypt.check_password_hash(user.password, password):
        print('USER PASSWORD:', user.password)
        print('TYPED PASSWORD:', password)
        return jsonify({'message':'Incorrect password entered, please try again.'}), 401
    else:
        # login_user()
        # user_id = user.user_id
        app.config['SESSION_COOKIE_NAME'] = 'session'
        session['user_id'] = user.user_id
        # access_token = create_access_token(identity=email)
        print('USER PASSWORD', user.password)
        print('TYPED PASSWORD', password)
        print('SESSION:', session)
        return jsonify(user_id=user.user_id)
        # return jsonify(access_token=access_token, user_id=user_id)


@app.route("/logout", methods = ['GET', 'POST'])
def logout_user():
    """Log user out."""

    print(server_session)
    print('SESSION:', session)
    session.pop("user_id")
    print('NEW SESSION:', session)
    
    return jsonify({'message': 'Logout succesful.'}), 200

@app.route('/create-stop', methods = ['POST'])
def create_stop():
    """Create a new stop."""

    user_id = request.json['user_id']
    stop_category = request.json['stop_category']
    stop_name = request.json['stop_name']
    stop_lat = request.json['stop_lat']
    stop_lng = request.json['stop_lng']

    new_stop = crud.create_stop(user_id, stop_category, stop_name, stop_lat, stop_lng)

    db.session.add(new_stop)
    db.session.commit()

    return jsonify(new_stop.to_dict())

@app.route('/api/stops')
def view_all_stops():
    """View all stops."""

    stops = crud.get_stops()

    return jsonify({stop.stop_id: stop.to_dict() for stop in stops})

@app.route('/api/stops/map_data')
def view_all_stops_on_map():
    """View all stops."""

    stops = crud.get_stops()

    return jsonify({stop.stop_id: stop.to_dict() for stop in stops})

@app.route('/api/<user_id>/stops')
def stops_by_user(user_id):
    """View a user's stops."""

    user_stops = crud.get_stops_by_user(user_id)

    return jsonify({user_stop.stop_id: user_stop.to_dict() for user_stop in user_stops})

@app.route('/api/stops/<stop_id>', methods= ['GET'])
def view_stop(stop_id):
    """View a stop."""

    # stop = crud.get_stop_by_id(stop_id)
    # reviews = crud.get_reviews_by_stop(stop_id)

    # return jsonify(stop.to_dict(), {review.review_id: review.to_dict() for review in reviews})
    stop = crud.get_stop_by_id(stop_id)

    return jsonify(stop.to_dict())

@app.route('/api/stops/<stop_id>', methods= ['DELETE'])
def delete_stop(stop_id):
    """Delete a stop."""

    stop = crud.get_stop_by_id(stop_id)

    db.session.delete(stop)
    db.session.commit()

    return jsonify({'message': 'Stop has been deleted.'})

@app.route('/api/stops/<stop_id>/reviews')
def view_stop_reviews(stop_id):
    """View a stop's reviews."""
    # stop_reviews = crud.get_reviews_by_stop(stop_id)

    # return jsonify({review.review_id: review.to_dict() for review in stop_reviews})
    stop_reviews = crud.stop_reviews(stop_id)
    stop_reviews_dict = crud.stop_reviews_to_dict(stop_reviews)

    return jsonify({stop_review['review_id']: stop_review for stop_review in stop_reviews_dict})

@app.route('/api/stops/<stop_id>/review', methods = ['GET', 'POST'])
def create_review(stop_id):
    """Create a new review for a stop."""

    user_id = request.json['user_id']
    # stop_id = request.json['stop_id']
    rating = request.json['rating']
    content = request.json['content']

    new_review = crud.create_review(user_id, stop_id, rating, content)

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict())

@app.route('/api/user/<user_id>')
def a_user(user_id):
    """View a user."""

    user = crud.get_user_by_id(user_id)

    return jsonify(user.to_dict())

@app.route('/api/user/<user_id>/reviews')
def view_user_reviews(user_id):
    """View a user's reviews."""

    user_reviews = crud.user_reviews(user_id)
    user_reviews_dict = crud.user_reviews_to_dict(user_reviews)

    return jsonify({user_review['review_id']: user_review for user_review in user_reviews_dict})

# @app.route('/api/user/<user_id>/reviews')
# def view_user_reviews(user_id):
#     """View a user's reviews."""

#     user_reviews = crud.get_reviews_by_user(user_id)

#     return jsonify({user_review.review_id: user_review.to_dict() for user_review in user_reviews})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
