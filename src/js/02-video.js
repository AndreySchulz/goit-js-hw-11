import Player from '@vimeo/player';

const videoRef = document.querySelector('#vimeo-player');
const player = new Player(videoRef);
console.log(player);
player.on('play', function() {
    console.log('played the video!');
    player.autoplay = true;
});

player.addCuePoint(15, {
    customKey: 'customValue'
}).then(function(id) {
    // cue point was added successfully
}).catch(function(error) {
    switch (error.name) {
        case 'UnsupportedError':
            // cue points are not supported with the current player or browser
            break;

        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});