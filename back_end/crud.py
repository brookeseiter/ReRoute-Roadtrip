"""CRUD operations."""

from model import db, User, Stop, Review, connect_to_db
import json


def create_user(fname, lname, email, username, password, phone_num):
    """Create and return a new user."""

    user = User(
        fname=fname, 
        lname=lname, 
        email=email, 
        username=username, 
        password=password, 
        phone_num=phone_num)

    return user

def user_exists(email):
    """Check whether a user exists. T/F"""

    return User.query.filter_by(email=email).first() is not None

def get_users():
    """Return all users."""

    return User.query.all()

def get_user_by_id(user_id):
    """Return a user by their id."""

    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by their email."""

    return User.query.filter(User.email == email).first()

stop_categories = ['Camping', 'Caverns', 'Climbing Access/Scrambling', 'Hiking',
'Historic Site', 'National Monument', 'National Park', 'Picnic Area', 'State Park',
'Swimming Hole', 'Unique Find', 'View Point', 'Water Access']

def create_stop(user_id, stop_category, stop_name, stop_lat, stop_lng):
    """Create and return a new stop."""

    stop = Stop( 
    user_id=user_id,
    stop_category=stop_category,
    stop_name=stop_name, 
    stop_lat=stop_lat,
    stop_lng=stop_lng)

    return stop

def get_stops():
    """Return all stops as a list of stop objects."""

    return Stop.query.all()

    # stops = Stop.query.all()
    # stop_list = []

    # for stop in stops:
    #     if stop_reviews(stop.stop_id) != []:
    #         stop_list.append(stop_reviews(stop.stop_id))
    
    # return stop_list

def get_stop_by_id(stop_id):
    """Return a stop by its id as a stop object."""

    return Stop.query.get(stop_id)

def get_stops_by_user(user_id):
    """Return all stops created by a user."""

    return Stop.query.filter(Stop.user_id == user_id).all()

def get_stop_by_user(user_id,stop_id):
    """Return a stop created by a user."""

    return Stop.query.filter(Stop.user_id == user_id, Stop.stop_id == stop_id).first()

def create_review(user_id, stop_id, rating, content):
    """Create and return a new review by a user for a stop."""

    review = Review(
    user_id=user_id, 
    stop_id=stop_id, 
    rating=rating, 
    content=content)

    return review

def get_reviews_by_user(user_id):
    """Return all reviews created by a user."""

    return Review.query.filter(Review.user_id == user_id).all()

def get_reviews_by_stop(stop_id):
    """Return all reviews for a stop as a list of Review objects."""

    return Review.query.filter(Review.stop_id == stop_id).all()

def stop_reviews(stop_id):
    """Returns a list of sqlalchemy rows with review information for a stop."""

    return (
        db.session.query(
            Review.review_id,
            Review.rating,
            Review.content,
            Stop.stop_id,
            Stop.stop_name,
            Stop.stop_lat,
            Stop.stop_lng,
            Stop.stop_category,
            User.user_id,
            User.username
        )
        .join(
            Stop, 
            Stop.stop_id 
            == Review.stop_id
        )
        .join(
            User,
            User.user_id
            == Review.user_id
        )
        .filter(
            Stop.stop_id == stop_id
        )
        .all()
    )

def stop_reviews_to_dict(lst):

    data_list = []

    for review in lst:
        data = {
            'review_id': review[0],
            'rating': review[1],
            'content': review[2],
            'stop_id': review[3],
            'stop_name': review[4],
            'stop_lat': review[5],
            'stop_lng': review[6],
            'stop_category': review[7],
            'user_id': review[8],
            'username': review[9]
        }
        data_list.append(data)

    return  data_list

def user_reviews(user_id):
    """Returns a list of sqlalchemy rows with review information for a user."""

    return (
        db.session.query(
            Review.review_id,
            Review.rating,
            Review.content,
            Stop.stop_id,
            Stop.stop_name,
            Stop.stop_category,
            User.user_id,
        )
        .join(
           Stop, 
            Stop.stop_id 
            == Review.stop_id
        )
        .join(
            User,
            User.user_id
            == Review.user_id
        )
        .filter(
            User.user_id == user_id
        )
        .all()
    )

def user_reviews_to_dict(lst):

    data_list = []

    for review in lst:
        data = {
            'review_id': review[0],
            'rating': review[1],
            'content': review[2],
            'stop_id': review[3],
            'stop_name': review[4],
            'stop_category': review[5],
            'user_id': review[6],
        }
        data_list.append(data)

    return  data_list


# def create_route(user, num_stops, route_name, total_miles, total_time, 
# start_lat, start_lng, end_lat, end_lng):
#     """Create and return a new route."""

#     route = Route(
#         user=user,
#         num_stops=num_stops,
#         route_name=route_name,
#         total_miles=total_miles,
#         total_time=total_time,
#         start_lat=start_lat,
#         start_lng=start_lng,
#         end_lat=end_lat,
#         end_lng=end_lng
#     )

#     return route


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
