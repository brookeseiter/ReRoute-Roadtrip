"""CRUD operations."""

from model import db, User, Stop, Review, connect_to_db
import json
from sqlalchemy.sql import func, insert, update


def create_user(email, username, password, phone_num):
    """Create and return a new user."""

    user = User( 
        email=email, 
        username=username, 
        password=password, 
        phone_num=phone_num)

    return user

def user_exists(email):
    """Check whether a user exists."""

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

def get_review_by_id(review_id):
    """Returns review by review id."""

    return Review.query.filter(Review.review_id==review_id).first()

def edit_review(review_id, rating, content):
    """Edit a Review."""

    original_review = get_review_by_id(review_id)

    original_review.rating = rating
    original_review.content = content

    db.session.commit()

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

def stop_reviews_to_dict(stop_reviews):

    data_list = []

    for review in stop_reviews:
        data = {
            'review_id': review.review_id,
            'rating': review.rating,
            'content': review.content,
            'stop_id': review.stop_id,
            'stop_name': review.stop_name,
            'stop_lat': review.stop_lat,
            'stop_lng': review.stop_lng,
            'stop_category': review.stop_category,
            'user_id': review.user_id,
            'username': review.username
        }
        data_list.append(data)

    return  data_list



# 1/10 INSERT
def stop_avg_rating(reviews):
    count = len(reviews)
    total_rating = 0

    for rev in reviews:
        total_rating += rev['rating']

    avg_rating = total_rating/count 

    return avg_rating

# 1/11 INSERT (so far not connected to any other file, not functional)
def join_reviews_and_stop_data(stop_id):
    stop = Stop.query.join(Review, Review.stop_id == Stop.stop_id).join(User, User.user_id == Review.user_id).filter(Stop.stop_id == stop_id).first()
    print('STOP:', stop)
    print('STOP.REVIEWS:', stop.reviews)

def join_reviews_and_stop_data2(stop_id):
    stop = Stop.query.join(Review, Review.stop_id == Stop.stop_id).filter(Stop.stop_id == stop_id).first()
    print('STOP:', stop)
    print('STOP.REVIEWS:', stop.reviews)

# def join_reviews_and_stop_data3():
#     # stops = Stop.query.join(Review).first()
#     stop = Stop.query.join(Review).first()
#     print('STOP:', stop)
#     print(stop.reviews)
#     for rev in stop.reviews:
#         print(stop.reviews)

def get_reviews_by_stop(stop_id):

    return Review.query.with_entities(func.avg(Review.rating)).filter(Review.stop_id == stop_id).all()

    
    


    

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

def user_reviews_to_dict(user_reviews):

    data_list = []

    for review in user_reviews:
        data = {
            'review_id': review.review_id,
            'rating': review.rating,
            'content': review.content,
            'stop_id': review.stop_id,
            'stop_name': review.stop_name,
            'stop_category': review.stop_category,
            'user_id': review.user_id,
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
