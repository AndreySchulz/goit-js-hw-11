import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const TIME_PLAYER = 'videoplayer-current-time'

const videoRef = document.querySelector('#vimeo-player');
const player = new Player(videoRef);

const playBack = function ({seconds}) {
   localStorage.setItem(TIME_PLAYER, seconds)
};
player.on('timeupdate', throttle(playBack, 1000))
player.setCurrentTime(
    if (TIME_PLAYER) {
        localStorage.getItem(TIME_PLAYER)
    }
    0
)
