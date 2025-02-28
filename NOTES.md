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

# GET Cards/:Card_Id

After an interesting (slightly hairy) pull request, I'm going into the next endpoint. This we will start by passing the starting test that has been sitting there.

## first commit 
I just wanted to pass the initial test that came with the repo. This was just setting up the cards/:card_id endpoint to return an object with a title, an individual object, though just had to figure out what I was sending through - as it is in the initial test, this endpoint's results will be sent through on response.body. Further tests will go down into their own describe block.

## second commit
Just adjusted the output to send through the whole object direct from 'data.json' to pass this test, and removed the interface in the second model as it was no longer necessary (possibly makes it type-safe but didn't complain when I gave it the wrong type, I don't know enough about TS to explain that).

## third commit 
Error handling. The normal best practice is to do 404 and 400 errors for when a bad request is made. However, as the :cardId is a string without obvious restrictions, and in the interests of time, I think it's best for these purposes to just put in a 400 'Bad Request' for any card not there.
After a few detail-improvements in the error handling pipeline to ensure that all the promises pass the error on to the right place, we have a reliable custom error set up for handling all types of errors that get rejected from the promises if need be.

# POST cards

Now the challenge will be to put in a post request. With just under an hour left on the repo at this point, I envisage I can get a good implementation of this down, once we parse everything through JSON and identify where the requests are coming from.

## first commit 
Completed posting a new card to the json file. I went for naming the file from getting the current length of items in the json file, and then using my access
to those to write a whole new json object into the file with my new card attached. I then read the new file and check that the new addition is in the json file, though of course it is. Added a beforeAll and afterAll to the test suite to clean up the file - also keeping the jest on --watch for this had it constantly restarting the tests (I assume due to the constant changes to cards.json) so I turned that off for now.

## final thoughts on POST
Unfortunately I don't think I have enough time on the repo to fit in error handling for this endpoint given my time is nearly up having worked on the repo for the last 4 hours. My thoughts on how to approach it though are as follows: check that the object being submitted follows the types laid out in my interface of card, and if it does not, to submit a bad request. 


# Final thoughts overall
A good repo, I think I'm happy with how I did here, I would have liked to get everything done but also am aware that that wasn't expected at all. 

I was slowed down a small amount by not being super familiar with some parts Typescript, which only showed up in a few areas, like having to get used to different standard practices. I reckon that perhaps having the Promises left as <any> is not best practice but I did not come across a situation to refute that, similarly, a couple of uses of interface were useful, I understand TS has interface vs type which seem similar and I'm not experienced enough to know how the differences emerge. However, for the most part, using TypeScript is very much like using JavaScript and I'm very experienced with that so it felt good to use on the whole.

The repo provided some interesting challenges that I wasn't expecting, which is good, I'm always up for more challenges, and reminded me of some of the best practices I use with my APIs. The only part of the API I didn't touch from the specification in the README and didn't leave any thoughts on was DELETE, I would have set up a test with a 204 code, and from there built an endpoint that scanned the json file and removed it - like I found with POST, probably best to take the whole JSON file out, edit it and then re-write it back in.

Overall, thank you very much, I enjoyed my time spent on this repo and it was very good practice for my challenges in tech to come.