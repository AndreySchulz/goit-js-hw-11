import Player from '@vimeo/player';


 const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    player.on('play', onPlay);

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

const onPlay = function(data) {
    console.log('played the video!');
};


