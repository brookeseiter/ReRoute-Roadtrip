# ![ReRoute-Roadtrip](https://github.com/brookeseiter/ReRoute-Roadtrip/blob/main/back_end/static/app_screenshots/Banner.png?raw=true "Banner")
Embark on the ultimate adventure with ReRoute Roadtrip, a road trip-planning application that helps users discover unique stops along their route before their journey even begins. From well-known sites to off-the-beaten-path gems shared by locals, users can customize their trip by adding or removing stops shown on the map. Potential road trip routes are displayed dynamically in response to user engagement and provide real-time insights into trip time, distance, and directions along the chosen path. While on the road, users can contribute to the community by creating new stops and leaving reviews for fellow explorers to uncover.

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
- React-Router
- HTML
- CSS

APIs:
- Google Maps JavaScript API (Places, Geocoding) 
- National Park Service API

## <a name="features">Features</a>
All Stops Page:
features: search, pagination
![allstopspage](https://github.com/brookeseiter/ReRoute-Roadtrip/assets/100550224/e97399a5-00d5-430a-8aba-7cb4be2a3227)

Create Stop Page
features: autofill, drop pin on map, create a stop
![createstoppage](https://github.com/brookeseiter/gifs/blob/main/reroute-roadtrip/gifs/createstoppage.gif)

Profile Page
features: delete stop, delete/edit review
![profilepage](https://github.com/brookeseiter/gifs/blob/main/reroute-roadtrip/gifs/profilepage.gif)

## <a name="installation">Installation</a>
Follow these steps to run ReRoute Roadtrip locally on your computer:

Requirements:
- Python 3.10
- Flask
- PostgreSQL

1. **Clone this repository**
```sh
$ git clone https://github.com/brookeseiter/ReRoute-Roadtrip.git
```
2. Instructions for **NPS and Google Maps APIs**
- **Get an API key** for [NPS API](https://www.nps.gov/subjects/developer/get-started.htm) and [Google Maps API](https://developers.google.com/maps) (Note: NPS API is not required unless you'd like to seed the app's map with additional stops not already included in /data/stops.json)
- In the back_end folder, place the following keys in a .env file
```sh
$ FLASK_SECRET_KEY = "YOUR_FLASK_SECRET_KEY"
$ NPS_KEY = "YOUR_NPS_KEY"
```
- In the front_end folder, place the following key in a .env file
```sh
$ REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
```
3. Create and activate a **virtual environment**
```sh
$ virtualenv env
$ source env/bin/activate
```
4. Install app **dependencies**
```sh
$ pip install -r requirements.txt
```
5. Run the file seed_database.py, located in the back_end folder, to **create the database** and **seed it with sample data**
```sh
$ python3 seed_database.py
```
6. In the back_end folder, **start the flask server**
```sh
$ python3 server.py
```
7. In a separate terminal, navigate to the front_end folder to **run the app**
```sh
$ npm start
```
8. **Navigate to localhost:3000 in your browser to test out ReRoute Roadtrip!**
