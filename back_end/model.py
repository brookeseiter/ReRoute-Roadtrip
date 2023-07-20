"""Models for road trip app."""

from enum import unique
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime


db = SQLAlchemy()


class User(db.Model, UserMixin):
    """A User."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String(25), nullable=False)
    lname = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    phone_num = db.Column(db.String(10), nullable=False)

    # routes = db.relationship("Route", back_populates="user")
    stops = db.relationship("Stop", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    # favorite_stops = db.relationship("Favorite_stop", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

    def to_dict(self):
        return {'user_id': self.user_id,
                'fname': self.fname,
                'lname': self.lname,
                'email': self.email,
                'username': self.username,
                'password': self.password,
                'phone_num': self.phone_num}


# class Route(db.Model):
#     """A Route."""

#     __tablename__ = "routes"

#     route_id = db.Column(db.Integer,
#                         autoincrement=True,
#                         primary_key=True)
#     num_stops = db.Column(db.Integer, nullable=False)
#     route_name = db.Column(db.String(50), nullable=False)
#     total_miles = db.Column(db.Float, nullable=False)
#     total_time = db.Column(db.DateTime, nullable=False)
#     start_lat = db.Column(db.Float, nullable=False)
#     start_lng = db.Column(db.Float, nullable=False)
#     end_lat = db.Column(db.Float, nullable=False)
#     end_lng = db.Column(db.Float, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

#     user = db.relationship("User", back_populates="routes")
#     stops_on_route = db.relationship("Stop_on_route", back_populates="route")

#     def __repr__(self):
#         return f'<Route route_id={self.route_id} route_name={self.route_name}>'


# class Stop_on_route(db.Model):
#     """A Stop On a Route."""

#     __tablename__ = "stops_on_route"

#     stop_on_route_id = db.Column(db.Integer,
#                         autoincrement=True,
#                         primary_key=True)
#     miles_from_route = db.Column(db.Float, nullable=False)
#     time_from_route = db.Column(db.DateTime, nullable=False)
#     route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"))
#     stop_id = db.Column(db.Integer, db.ForeignKey("stops.stop_id"))

#     route = db.relationship("Route", back_populates="stops_on_route")
#     stop = db.relationship("Stop", back_populates="stop_on_route")

#     def __repr__(self):
#         return f'<Stop_on_route stop_on_route_id={self.stop_on_route_id}>'

stop_categories = ['Camping', 'Caverns', 'Climbing Access/Scrambling', 'Historic Site'
'National Monument', 'National Park', 'Picnic Area', 'State Park', 'Swimming Hole', 
'Unique Find', 'View Point', 'Water Access']

class Stop(db.Model):
    """A Stop."""

    __tablename__ = "stops"

    stop_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    stop_name = db.Column(db.String(100), nullable=False)
    stop_lat = db.Column(db.Float, nullable=False)
    stop_lng= db.Column(db.Float, nullable=False)
    stop_category = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    user = db.relationship("User", back_populates="stops")
    reviews = db.relationship("Review", back_populates="stop")
    # stop_on_route = db.relationship("Stop_on_route", back_populates="stop")
    # favorite_stops = db.relationship("Favorite_stop", back_populates="stop")

    def __repr__(self):
        return f'<Stop stop_id={self.stop_id} stop_name={self.stop_name} stop_category={self.stop_category} user_id={self.user.user_id}>'

    def to_dict(self):
        return {'stop_id': self.stop_id,
                'stop_name': self.stop_name,
                'stop_lat': self.stop_lat,
                'stop_lng': self.stop_lng,
                'stop_category': self.stop_category,
                'user_id': self.user.user_id}


class Review(db.Model):
    """A Review."""

    __tablename__ = "reviews"

    review_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.stop_id"))

    user = db.relationship("User", back_populates="reviews")
    stop = db.relationship("Stop", back_populates="reviews")

    def __repr__(self):
        return f'<Review review_id={self.review_id} rating={self.rating} user_id={self.user.user_id} stop_id={self.stop.stop_id}>'
    
    def to_dict(self):
        return {'review_id': self.review_id,
                'rating': self.rating,
                'content': self.content,
                'user_id': self.user.user_id,
                'stop_id': self.stop.stop_id}


# class Favorite_stop(db.Model):
#     """A User's Favorite Stops."""

#     __tablename__ = "favorite_stops"

#     favorite_stop_id = db.Column(db.Integer,
#                         autoincrement=True,
#                         primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
#     stop_id = db.Column(db.Integer, db.ForeignKey("stops.stop_id"))

#     user = db.relationship("User", back_populates="favorite_stops")
#     stop = db.relationship("Stop", back_populates="favorite_stops")

#     def __repr__(self):
#         return f'<Favorite_stop favorite_stop_id={self.favorite_stop_id}>'


def connect_to_db(flask_app, db_uri="postgresql:///roadtrip_database", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)

