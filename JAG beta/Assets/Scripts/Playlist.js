#pragma strict

import System.Collections.Generic;

var SongIndex : int;
var MusicPlaylist : List.<AudioClip>;
var titleCamera : Camera;

function Start () {
	SongIndex = 0;
	for (var i : int = MusicPlaylist.Count - 1; i > 0; i--) {
		var j : int = Mathf.Floor(Random.value * (i + 1));
		var temp : AudioClip = MusicPlaylist[i];
		MusicPlaylist[i] = MusicPlaylist[j];
		MusicPlaylist[j] = temp;
	}
	titleCamera.GetComponent(AudioSource).clip = MusicPlaylist[SongIndex];
	titleCamera.GetComponent(AudioSource).Play();
}

function Update () {
	if (!titleCamera.GetComponent(AudioSource).isPlaying) {
		SongIndex = (SongIndex + 1) % MusicPlaylist.Count;
		titleCamera.GetComponent(AudioSource).clip = MusicPlaylist[SongIndex];
		titleCamera.GetComponent(AudioSource).Play();
	}
}