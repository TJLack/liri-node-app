
            var request = require("request");
            var movieName; 


        if (process.argv[3]){
	       movieName = process.argv[3];
        } else {
	       movieName = "Mr. Nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";



             var fs = require("fs");
             var stuffINeed = require("./keys.js");
             var action = process.argv[2];



                var Spotify = require('node-spotify-api');
             var spotify = new Spotify({
                   id: "b415dc12d4034fcb8f1fa13468e6bd3b",
                  secret: "44098e2ae95c40f18ad85a6237019a70"
                  });


                  var Twitter = require('twitter');

                   var client = new Twitter({
                  consumer_key: 'Ulxmc5BLWUlsBh9UYzMooAN93',
                   consumer_secret: 'RIfVB1u8kL044LsCQOhSgNa8ryeYygRCwZ5isqgtEL0Ykj7bMU',
                access_token_key: '883723756300099585-AxEDEzWoiJ15kPZULC3QuEXW92JpFUg',
                access_token_secret: 'n30GmFgDV7CbN5GHkhffb2S5kZqp43DUQEnjDhiFZxm2Y'
         });

       var params = { SmuCodingCamp: 'nodejs' };

                    //Commands


            console.log(stuffINeed)

            switch (action) {

            case "my-tweets":
              myTweets();
                 break;

             case "spotify-this-song":
                 spotifySong(process.argv[3]);
                     break;

                case "movie-this":
                  movieThis();
                 break;

                case "do-what-it-says":
                   doWhatItSays();
             break;
            }

                //my-tweets


                    function myTweets() {

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            

            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text)
                console.log(tweets[i].created_at);
                    };
                };
             });
        };

                //spotify-this-song


        function spotifySong(songTitle = "The Sign") {
        spotify.search({ type: 'track', query: songTitle }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }

        if (songTitle == "The Sign") {
            console.log(data.tracks.items[4].album.artists[0].name);
            console.log(data.tracks.items[4].name);
            console.log(data.tracks.items[4].preview_url)
            console.log(data.tracks.items[4].album.name);
        } else {
            console.log(data.tracks.items[0].album.artists[0].name)
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url)
            console.log(data.tracks.items[0].album.name);
         }

            });
    };

                    // movie-this


                function movieThis() {
    

        request(queryUrl, function(error, response, body) {

                if (!error && response.statusCode === 200) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release data: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
         }
            });
            };

                // do-what-it-says


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
       


        var dataArr = data.split(",");
        console.log(dataArr);

        var command = dataArr[0];
        console.log("Command: " + command)

        if (command == "spotify-this-song") {
            spotifySong(dataArr[1]);
                  }
                })
            };

