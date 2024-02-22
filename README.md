# ![ReRoute-Roadtrip](https://github.com/brookeseiter/ReRoute-Roadtrip/blob/main/back_end/static/app_screenshots/Banner.png?raw=true "Banner")
Embark on the ultimate adventure with ReRoute Roadtrip, a road trip-planning application that helps users discover unique stops along their route before their journey even begins. From well-known sites to off-the-beaten-path gems shared by locals, users can customize their trip by adding or removing stops shown on the map. Potential road trip routes are displayed dynamically in response to user engagement and provide real-time insights into trip time, distance, and directions along the chosen path. While on the road, users can contribute to the community by creating new stops and leaving reviews for fellow explorers to uncover.

Link: 
Demo: https://www.youtube.com/watch?v=VPYsfzPS-bk

## Table of Contents
- [Tech Stack](#tech)
- [Features](#features)
- [Insallation](#installation)

## <a name="tech">Tech Stack</a>
- Python (3.10.4)
- JavaScript
- Flask
- PostgreSQL
- SQLAlchemy
- React.js
- React-Bootstrap
- HTML
- CSS

APIs:
- Google Maps (Directions, Distance Matrix, Geocoding) API
- National Park System API

## <a name="features">Features</a>

## <a name="installation">Installation</a>
To run ReRoute Roadtrip locally on your computer, follow these steps:
1. If you haven't already, install the latest version of Python3, Flask, and PostgreSQL
2. Clone this repository
```sh
$ git clone https://github.com/brookeseiter/ReRoute-Roadtrip.git
```
3. Instructions for NPS and Google Maps APIs
- In the back_end folder, create a .env file and place the following keys in it
```sh
$ FLASK_SECRET_KEY = "YOUR_FLASK_SECRET_KEY"
$ NPS_KEY = "YOUR_NPS_KEY"
```
- In the front_end folder, create a .env file and place the following keys in it
```sh
$ REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
```
4. Create and activate a virtual environment
```sh
$ virtualenv env
$ source env/bin/activate
```
5. Install dependencies
```sh
$ pip install -r requirements.txt
```
6. Run the file seed_database.py, located in the back_end folder, to create the database and seed it with sample data
```sh
$ python3 seed_database.py
```
7. In the back_end folder, start the flask server
```sh
$ python3 server.py
```
8. In a separate terminal, navigate to the front_end folder to run the app
```sh
$ npm start
```
9. Navigate to localhost:3000 in your browser 