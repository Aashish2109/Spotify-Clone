console.log("Welcome To Spotify");
let songIndex = 0;
let audio = new Audio('song1.mp3');
let MasterPlay = document.getElementById("MasterPlay");
let myProgressBar = document.getElementById("Bar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Falak-Tu-Garaj-Tu", filePath: "song1.mp3", coverPath: "song1.jpeg" },
    { songName: "Salam-e-Ishq", filePath: "song1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song3.mp3", coverPath: "covers/2.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song4.mp3", coverPath: "covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song5.mp3", coverPath: "covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song6.mp3", coverPath: "covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song5.mp3", coverPath: "covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song6.mp3", coverPath: "covers/1.jpg" },
];

MasterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        MasterPlay.classList.remove('fa-solid  fa-play');
        MasterPlay.classList.add('fa-solid fa-pause');
        gif.style.opacity = 1;
    } else {
        audio.pause();
        MasterPlay.classList.remove('fa-solid  fa-pause');
        MasterPlay.classList.add('fa-solid fa-play');
        gif.style.opacity = 0;
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audio.currentTime = myProgressBar.value * audio.duration / 100;
});

songItems.forEach((element) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('song')[0].innerText = songs[i].songName;
});

const MakeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.target.classList.remove('fa-solid fa-play');
        element.target.classList.add('fa-solid fa-pause');
    });
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        MakeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-solid fa-play');
        e.target.classList.add('fa-solid fa-pause');
        audio.src='song/${index+1}.mp3';
        audio.currentTime=0;
        audio.play();
        MasterPlay.classList.add('fa-solid  fa-pause');
        MasterPlay.classList.remove('fa-solid fa-play');
    });
});