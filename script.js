
let songIndex = 0;//This line initializes a variable songIndex with the value 0. It represents the index of the currently selected song in the songs array.
let audio = new Audio('song1.mp3');//This line creates a new Audio object and assigns it to the variable audio. The constructor takes the path to the first song file (song1.mp3) as an argument.
let MasterPlay = document.getElementById("MasterPlay");// represents the play/pause button
let myProgressBar = document.getElementById("Bar");//represents the progress bar
let gif = document.getElementById("gif");//represents the GIF element.
let songItems = Array.from(document.getElementsByClassName('songItem'));//This line selects all elements with the class name 'songItem' and converts the resulting NodeList into an array using Array.from(). The songItems array will contain the individual song items displayed in the UI.
let songs = [//This line initializes an array songs that contains objects representing each song. Each song object has properties such as songName, filePath, coverPath, and gifPath, representing the name, file path, cover image path, and GIF path for each song.
    { songName: "Falak-Tu-Garaj-Tu", filePath: "song1.mp3", coverPath: "song1.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Salam-e-Ishq", filePath: "song2.mp3", coverPath: "song2.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Kaun Tuje", filePath: "song3.mp3", coverPath: "song3.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Hari Darshan", filePath: "song4.mp3", coverPath: "song4.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Namo Namo", filePath: "song5.mp3", coverPath: "song5.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Undertaker Theme Song", filePath: "song6.mp3", coverPath: "song6.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Kaun Kehta Hai", filePath: "song7.mp3", coverPath: "song7.jpeg", gifPath: "playsong.jpeg" },
    { songName: "Dilbar", filePath: "song8.mp3", coverPath: "song8.jpeg", gifPath: "playsong.jpeg" },
];

MasterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();                                           //This code block sets up an event listener for the click event on the MasterPlay button. When clicked, it plays or pauses the audio, toggles the play/pause button's icon, and adjusts the visibility of the GIF element.
        MasterPlay.classList.remove('fa-solid', 'fa-play');
        MasterPlay.classList.add('fa-solid', 'fa-pause');
        gif.style.opacity = 1;
    } else {
        audio.pause();
        MasterPlay.classList.remove('fa-solid', 'fa-pause');
        MasterPlay.classList.add('fa-solid', 'fa-play');
        gif.style.opacity = 0;
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);                //This code block sets up an event listener for the timeupdate event on the audio element. It calculates the current progress of the song and updates the value of the progress bar accordingly.
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audio.currentTime = myProgressBar.value * audio.duration / 100;//This code block sets up an event listener for the change event on the myProgressBar element. It updates the current playback position of the audio based on the value of the progress ba
});

// songItems.forEach((element, index) => {
//     element.getElementsByTagName("img")[0].src = songs[index].coverPath;
//     element.getElementsByClassName('song')[0].innerText = songs[index].songName;
// });

const MakeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-solid', 'fa-play');//This code block defines a function MakeAllPlays that iterates over the song item play buttons and ensures that all buttons are set to the play state (i.e., not currently playing).
        element.classList.add('fa-solid', 'fa-pause');
    });
};

const songItemPlayButtons = Array.from(document.getElementsByClassName('songItemPlay'));
const songNameElement = document.querySelector('.songinfo');

songItemPlayButtons.forEach((button, index) => {//This code block sets up event listeners for each song item play button. When clicked, it toggles the play/pause state of the button, updates the audio source and playback position, and adjusts the visibility of the GIF element
    button.addEventListener('click', () => {
        const isButtonPlaying = button.classList.contains('fa-pause');

        // Pause all other buttons if they are playing
        songItemPlayButtons.forEach((otherButton, otherIndex) => {
            if (otherIndex !== index && otherButton.classList.contains('fa-pause')) {
                otherButton.classList.remove('fa-pause');
                otherButton.classList.add('fa-play');
            }
        });

        if (!isButtonPlaying) {
            songIndex = index;
            button.classList.remove('fa-play');
            button.classList.add('fa-pause');
            audio.src = songs[songIndex].filePath;
            audio.currentTime = 0;
            audio.play();
            MasterPlay.classList.add('fa-pause');
            MasterPlay.classList.remove('fa-play');
            gif.style.opacity = 1;
            songNameElement.innerHTML = `<img src="${songs[songIndex].coverPath}" alt="song cover" width="40px">${songs[songIndex].songName}`;
            gif.style.opacity = 1;
        } else {
            button.classList.remove('fa-pause');
            button.classList.add('fa-play');
            audio.pause();
            MasterPlay.classList.remove('fa-pause');
            MasterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    });
});



const forwardButton = document.querySelector('.fa-forward');
const backwardButton = document.querySelector('.fa-backward');

forwardButton.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});

backwardButton.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong();
});

function playSelectedSong() {
    MakeAllPlays();
    audio.src = songs[songIndex].filePath;
    audio.currentTime = 0;
    audio.play();
    MasterPlay.classList.add('fa-solid', 'fa-pause');
    MasterPlay.classList.remove('fa-solid', 'fa-play');
    gif.style.opacity = 1;
    songNameElement.innerHTML = `<img src="${songs[songIndex].coverPath}" alt="song cover" width="40px">${songs[songIndex].songName}`;
    gif.style.backgroundImage = `url(${songs[songIndex].gifPath})`;

}
