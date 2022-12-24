"""CRUD operations."""

from model import db, User, Stop, Review, connect_to_db


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

# def get_reviews_by_stop(stop_id):
#     """Return all reviews for a stop."""
#     "Returns only the last set of these values as a dict, with username"

#     stop_review_dict = {}

#     reviews_for_stop = Review.query.filter(Review.stop_id == stop_id).all()

#     for review in reviews_for_stop:
#         stop_review_dict["review_id"] = review.review_id
#         stop_review_dict["rating"] = review.rating
#         stop_review_dict["user_id"] = review.user_id
#         stop_review_dict["username"] = review.user.username
#         stop_review_dict["stop_id"] = review.stop_id

#     return stop_review_dict

# def join_reviews_stops():
#     # stops = db.session.query(Stop,Review).join(Stop).order_by(Stop.stop_id).all()
#     # print('STOPS:----------------------------------------------------------------', stops)

#     # for stop, rev in stops:  # [(<Emp>, <Dept>), (<Emp>, <Dept>)]
#     #     return (stop.stop_name, rev.rating, rev.content)

#     # return stops

#     stops = db.session.query(Stop.stop_id, Stop.stop_name, Stop.stop_category,
#                             Stop.stop_lat, Stop.stop_lng, Review.review_id, Review.rating, 
#                             Review.content).join(Review).order_by(Stop.stop_id).all()
#     print(stops,"===================================================")

def stop_reviews(stop_id):
    """Returns a lit of sqlalchemy rows with review information for a stop."""

    # below returns a list of tuples with review_id, review_rating, content, and user_id, stop_id
    # return(db.session.query(Review.review_id, Review.rating, Review.content, Review.user_id, Review.stop_id) 
    #             .join(Stop)
    #             .filter(Stop.stop_id == stop_id)
    #             .group_by(Review.review_id, Stop.stop_id)
    #         ).all() 
    # below returns a list of objects that contain review_id, rating, user_id, stop_id       
    return(db.session.query(Review)
                .join(Stop)
                .filter(Stop.stop_id == stop_id)
                .group_by(Review.review_id, Stop.stop_id)
            ).all()





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
