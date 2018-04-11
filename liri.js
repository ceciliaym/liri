var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('spotify');
 


var readTweets = function (){

var client = new Twitter (keys.twitterKeys);

var params = {screen_name: 'ceciyvonne'};
client.get('statuses/user_timeline', params, function (error, tweets, response){
    if (!error) {
        console.log(tweets);
    }
    for (var i=0; i < tweets.length; i++) {
        console.log(tweets[1].created_at);
        console.log('   ');
        console.log(tweets[i].text); }

}); 

}

 spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data);
});

var write = function(caseData, functionData){
    switch(caseData) {
        case 'my-tweets' :
        readTweets();
        break;
    default:
console.log('Liri does not know that');   
 }
}

var run = function(argOne, argTwo) {
    write(argOne, argTwo);
    };
 run(process.argv[2], process.argv[3])   


