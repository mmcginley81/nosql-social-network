# NoSQL-Social-Network

This application is a test of NoSQL and Mongoose knowledge and helps to reinforce the learnings of a MERN stack application. Specifically this challenge helped us with the M part of the MERN stack which is MongoDB. However, the MERN stack stands for MongoDB, Express, React, and Node and I used 3 of the four parts of the stack for this application.

The application was created to make relationships on the back end that act like a social media service would. The models I used were Users, Thoughts, and Reactions, however Reactions were a sub-document of thoughts.

Users could add/delete friends, while reactions would be added to thoughts similarly to how social media profiles will have comments associated with posts.

Check out a description of the applications routes by watching this video. 
https://youtu.be/vYKfbRjHLIA

User Story 

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list