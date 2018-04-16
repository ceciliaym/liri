var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require('request');
var find = process.argv[3];
var spotify = new Spotify({
    id: '4154222d461b4615b18e86193126a8a6',
    secret: '969fdce6137a407a8db0d255ed378f92'
    });


var myTweets = function(){
var client = new Twitter(keys.twitterKeys);

var params = {screen_name: 'ceciyvonne'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for(var i=0; i<tweets.length;i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
    }
  }
});

}

function getSpotify(find) {
   
     if (find == null) {
       find = 'Work';
    }
    spotify.search({
    	type: 'track',
    	query: find 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}

var getMovie = function (movieName) {



    request("http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&apikey=92c22f39", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log('Title: '+jsonData.Title);
            console.log('Year:'+jsonData.Year);
            console.log('Rated:'+jsonData.Rated);
            console.log('IMDB Rating:'+jsonData.imdbRating);
            console.log('Country:'+jsonData.Country);
            console.log('Language:'+jsonData.Language);
            console.log('Plot:'+jsonData.Plot);
            console.log('Actors:'+jsonData.Actors);
        

        }
    });
}
var doWhatItSays = function () {
fs.readFile('random.txt', 'utf8', function (err, data){
    if (err) throw err;
    var dataArr = data.split(',');
    if(dataArr.length == 2){
        pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
        pick(dataArr[0]);
    }
});
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
        myTweets();
        break;
        case 'spotify-this-song':
        getSpotify(find);
        break;
        case 'movie-this':
        getMovie(functionData);
        case 'do-what-it-says' :
        doWhatItSays();
        break;

    default:
    console.log('LIRI does not understand!');
    }
}
var runThis = function(argOne, argTwo) {
    pick(argOne,argTwo);
};

runThis(process.argv[2],process.argv[3]);
