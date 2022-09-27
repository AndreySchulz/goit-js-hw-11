import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const TIME_PLAYER = 'videoplayer-current-time'

const videoRef = document.querySelector('#vimeo-player');
const player = new Player(videoRef);

const playBack = function ({seconds}) {
   save(TIME_PLAYER, seconds)
};
player.on('timeupdate', throttle(playBack, 1000))
function setTimePlayer() {
    const savedData = load(TIME_PLAYER)
    if (!savedData) {
       return
    }
    player.setCurrentTime(load(TIME_PLAYER)) 
} 

// static
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

setTimePlayer()


