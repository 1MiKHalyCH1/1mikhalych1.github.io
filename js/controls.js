var listOfSongs = [];
var songID = 0;


function play() {
  var audioElem = document.getElementById("audio");
  audioElem.paused ? audioElem.play() : audioElem.pause();
}

function songInit() {
  document.getElementById('audio').src = "music/" + listOfSongs[songID];
  document.getElementById('audio').play();
}

function next() {
  if (songID == listOfSongs.length - 1)
    songID = 0;
  else
    songID+=1;
  songInit();
}

function prev() {
  if (songID == 0)
    songID = listOfSongs.length - 1;
  else
    songID-=1;
  songInit();
}

function musicListInit () {
  listOfSongs = document.getElementById("musArr").innerHTML.split("\n");
  for (var i = 0; i < listOfSongs.length; i++)
    console.log(listOfSongs[i]);
  songInit();
}