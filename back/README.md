# The Poken-Tube

## The Backend

### Introduction

This repository goes with its tween --> The Frontend.

A company gave me some instructions to take a technical test. I released this project to pass this test.

The purpose of the Poken-Tube is being a video platform.

You have some features, e.g : login/logout, display video collection, display video item, like/dislike, comment...

### Stack used

For the backend, I used Typescript and Express.JS

For the hosting, I used Heroku and voilà the link : [https://poken-tube.herokuapp.com/]()

### Install pipeline

You can install this repo like other lambda repos with `npm i` or `yarn install`

You have to configure the env file with those two variables :

* PORT --> port of the web server (by default : 8080)
* CORS_URL --> the url of the frontend (without the `/` at the end)

You can launch the server with `npm dev` or `npm build && npm start`

### Credentials

To protect the confidence of the company's subjects, I'm not going to share the requirements and the company name. Thus, I'm not the creator of the project idea.
