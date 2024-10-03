const img = document.querySelector("img");
const music = document.querySelector('audio'); // Use this for both volume and playback
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

let progress = document.getElementById("progress");
const durationDisplay = document.getElementById("duration");
let currentTimeDisplay = document.getElementById("current_time");
const progress_div = document.getElementById('progress_div');

const songs = [
    {
        name: "sahil-1",
        title: "Lotus lane",
        artist: "loyalist",
    },
    {
        name: "sahil-2",
        title: "sappheiros",
        artist: "Aurora",
    },
    {
        name: "sahil-3",
        title: "Walking Firiri",
        artist: "Gorakhali Takma",
    },
];

let songIndex = 0;

// Load song function
const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = "music/" + song.name + ".mp3";
    img.src = "images/" + song.name + ".jpeg";
};

// Load the first song initially
loadSong(songs[songIndex]);

// Next song function
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// Previous song function
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// Progress bar and time update
music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;

    if (!isNaN(duration)) {
        let progress_time = (currentTime / duration) * 100;
        progress.style.width = `${progress_time}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    }
});

// Click on progress bar to move
progress_div.addEventListener('click', (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
});

// When the song ends, play the next song
music.addEventListener('ended', nextSong);

// Utility function to format time in minutes:seconds (mm:ss)
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Next and previous button event listeners
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

// Play music function
const playMusic = () => {
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime');
};

// Pause music function
const pauseMusic = () => {
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime');
};

// Play/pause toggle event listener
play.addEventListener('click', () => {
    if (music.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value; // Use the same "music" element for volume control

    // Update volume icon based on volume level
    if (music.volume === 0) {
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
});

// Mute/Unmute by clicking the volume icon
volumeIcon.addEventListener('click', () => {
    if (music.volume > 0) {
        music.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        music.volume = 1;
        volumeSlider.value = 1;
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
});
