import Player from '@vimeo/player';

const videoRef = document.querySelector('#vimeo-player');
const player = new Player(videoRef);
console.log(player);
player.on('play', function() {
    console.log('played the video!');
    player.autoplay = true;
    
});
const callback = function () {
   
};

player.off('eventName', callback);
