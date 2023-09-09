console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Gangsta Paradise-Coolio", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Unstoppable- SIA", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "See You Again- Charlie Puth ft Wizkid", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "In the End- Linkin Park", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Love me Like You Do- Ellie Goulding", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Someone Like You -Adele", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Closer -The Chainsmoker", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Faded-Alan Walker", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Titanium -Sia ft David Guetta", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    // console.log("Hy");
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.pause();
        songIndex=-1;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        ele = parseInt(e.target.id);
        console.log(songIndex)
        if(ele!=songIndex)
        {
            songIndex=ele;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`;
            console.log(songIndex-1)
            // console.log("HYYY")
            masterSongName.innerText = songs[songIndex-1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else
        {
            songIndex=ele;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            songIndex = -1;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    console.log(songIndex);
    if(songIndex>=10){
        songIndex = 1
    }
    else{
        songIndex ++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9
    }
    else{
        songIndex --;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

