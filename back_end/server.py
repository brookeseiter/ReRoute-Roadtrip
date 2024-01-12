"""Server for ReRoute Roadtrip app."""

from flask import (Flask, render_template, request, session, jsonify)
from model import connect_to_db, db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
from datetime import timedelta
import os 
import crud

load_dotenv()

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
CORS(app, supports_credentials=True)
bycrypt = Bcrypt(app)

# Configure filesystem for storing the session data on the server side
app.config['SESSION_TYPE'] = "filesystem"
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_THRESHOLD'] = 50
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)

# Create and initialize the Flask-Session object AFTER 'app' has been configured
server_session = Session(app)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/<path>')
def route(path):
    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):
    return render_template('index.html')


@app.route('/register', methods = ['POST'])
def create_user():
    """Create a new user."""

    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    phone_num = request.json['phoneNum']

    user_exists = crud.user_exists(email=email)

    if user_exists:
        return jsonify({"error": "Email/username already exists."}), 401
    
    hashed_password = bycrypt.generate_password_hash(password).decode('utf-8')
    new_user = crud.create_user(email, username, hashed_password, phone_num)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 200

@app.route('/login', methods = ['POST'])
def login_user():
    """Log in a user."""

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = crud.get_user_by_email(email)

    if user is None:
        return jsonify({'message':'Please create an account.'}), 401
    elif not bycrypt.check_password_hash(user.password, password):
        return jsonify({'message':'Incorrect password entered, please try again.'}), 401
    else:
        session['user_id'] = user.user_id
        return jsonify({
            "userId": user.user_id,
            "email": user.email,
            "username": user.username,
            "phoneNum": user.phone_num
        }), 200

@app.route('/login-status')
def login_status():
    """Checks for logged in user and returns their user ID."""
    
    if 'user_id' in session:
        return jsonify({
            'message': 'User is logged in.',
            'userId': session['user_id']
        }), 200
    else:
        return jsonify({'message': 'There is no user currently in the session.'})

@app.route("/logout", methods = ['GET', 'POST'])
def logout_user():
    """Log user out."""

    if 'user_id' in session:
        session.pop('user_id')
    
    return jsonify({'message': 'Logout succesful.'}), 200

@app.route('/create-stop', methods = ['POST'])
def create_stop():
    """Create a new stop."""

    user_id = request.json['userId']
    stop_category = request.json['stopCategory']
    stop_name = request.json['stopName']
    stop_lat = request.json['stopLat']
    stop_lng = request.json['stopLng']

    new_stop = crud.create_stop(user_id, stop_category, stop_name, stop_lat, stop_lng)

    db.session.add(new_stop)
    db.session.commit()

    return jsonify(new_stop.to_dict())

# OG
# @app.route('/stops')
# def view_all_stops():
#     """View all stops."""

#     stops = crud.get_stops()

#     return jsonify({stop.stop_id: stop.to_dict() for stop in stops})

@app.route('/stops')
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

    if user_id:
        user_stops = crud.get_stops_by_user(user_id)
        print("--------------------", user_stops, "---------------------")

    return jsonify({user_stop.stop_id: user_stop.to_dict() for user_stop in user_stops})

# OG
# @app.route('/stops/<stop_id>', methods= ['GET', 'DELETE'])
# def view_stop(stop_id):
#     """View a stop."""

#     # stop = crud.get_stop_by_id(stop_id)
#     # reviews = crud.get_reviews_by_stop(stop_id)

#     # return jsonify(stop.to_dict(), {review.review_id: review.to_dict() for review in reviews})
#     stop = crud.get_stop_by_id(stop_id)

#     if request.method == 'GET':
#         return jsonify(stop.to_dict()), 200
#     if request.method == 'DELETE':
#         db.session.delete(stop)
#         db.session.commit()
        # return jsonify({'message': 'Stop has been deleted.'}), 200
@app.route('/stops/<stop_id>', methods= ['GET', 'DELETE'])
def view_stop(stop_id):
    """View a stop."""

    stop = crud.get_stop_by_id(stop_id)    

    if request.method == 'GET' and len(stop.reviews) != 0:
        rating = crud.get_reviews_by_stop(stop_id)
        avg_rating = round(rating[0][0], 2)
        return jsonify({'stop_id': stop.stop_id,
                    'stop_name': stop.stop_name,
                    'stop_lat': stop.stop_lat,
                    'stop_lng': stop.stop_lng,
                    'stop_category': stop.stop_category,
                    'user_id': stop.user_id,
                    'rating': avg_rating}), 200
    
    elif request.method == 'GET':
        return jsonify(stop.to_dict()), 200
    
    if request.method == 'DELETE':
        db.session.delete(stop)
        db.session.commit()
        return jsonify({'message': 'Stop has been deleted.'}), 200

@app.route('/stops/<stop_id>/reviews')
def view_stop_reviews(stop_id):
    """View a stop's reviews."""
    # stop_reviews = crud.get_reviews_by_stop(stop_id)

    # return jsonify({review.review_id: review.to_dict() for review in stop_reviews})
    
    # trying to do avg_rating on the backend, works for now reviews and can send over the average
    # otherwise but needs to be edited in front end code to separate avg from actual review obj
    # stop_reviews = crud.stop_reviews(stop_id)
    # print('=======================', stop_reviews, '=========================')
    # stop_reviews_dict = crud.stop_reviews_to_dict(stop_reviews)
    # avg_rating = crud.stop_avg_rating(stop_reviews_dict)
    # print('----------------------', avg_rating, '-------------------------')
    # return jsonify(avg_rating, {stop_review['review_id']: stop_review for stop_review in stop_reviews_dict})
    
    stop_reviews = crud.stop_reviews(stop_id)
    stop_reviews_dict = crud.stop_reviews_to_dict(stop_reviews)
    return jsonify({stop_review['review_id']: stop_review for stop_review in stop_reviews_dict})

@app.route('/stops/<stop_id>/review', methods = ['GET', 'POST'])
def create_review(stop_id):
    """Create a new review for a stop."""

    user_id = request.json['userId']
    # stop_id = request.json['stopId']
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

@app.route('/user/<user_id>/<review_id>/edit', methods=['PUT'])
def edit_user_review(user_id, review_id):
    """Edit a user's review for a stop."""

    rating = request.json['rating']
    content = request.json['content']

    crud.edit_review(review_id, rating, content)

    return jsonify({'message': 'Review has been successfully edited.'}), 200

# @app.route('/api/user/<user_id>/reviews')
# def view_user_reviews(user_id):
#     """View a user's reviews."""

#     user_reviews = crud.get_reviews_by_user(user_id)

#     return jsonify({user_review.review_id: user_review.to_dict() for user_review in user_reviews})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
