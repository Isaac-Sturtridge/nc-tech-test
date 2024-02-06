Please add any additional notes here…

# Setup
used 'npm install' - tried installing 'yarn' and setting it up however I have tested 'npm run dev' and 'npm run test' and they run the server successfully so will continue under this.

# GET Cards

## first commit
I have used Typescript before but in a limited fashion and not to build an API, however I like a challenge and will do my best to cobble together an API using Typescript and my knowledge of JavaScript. First challenge was, while setting up an initial test to receive a response from the server, changing my normal export functionality to export a module across my MVC artitecture.

The second challenge was getting the correct form of Promises/async to match Typescript's declarative types. fs.readFile is the obvious go-to for getting the data out, though initial usage of it has run into problems with detecting the json files. To start with I am using Promise<any> to ensure compatability, and async/await for syntactic sugar. A first success is getting a response from the server on one test.

## second commit 
I solved the fs.readFile dilemma by using __dirname after figuring it was a problem with the pathing. I now have the data being sent through.

I put in a new test to check the functionality of '/cards'. After parsing the JSON result, I confirmed that it matched the shape of the JSON object.

## third commit
However, this isn't the format that we want the '/cards' api to return it in, so we need to adjust the data a bit, keeping the previous test the same but only looking for the title.
We need to grab the images from the templates file and change the id property to card_id and then only return an object that has the necessary information.
A little bit of jiggling around the data from the templates file and data file and that's successful!

## fourth major commit: Error Handling
I want to consider error handling. As a GET request without any queries, there's limited ways for users to submit a bad request or even a 'not found' error on the endpoint. However this seems like a good time to set up general error handling so I have added that to server.js and an error handler. 

This initial error handling setup provides scaleability and easy structure for errors further down the line. Currently it supports a route-not-found 404 and a 500 error that will only be reached in case of a problem with the server.