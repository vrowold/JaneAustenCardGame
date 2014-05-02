#pragma strict

import System.Collections.Generic;

public class Player extends MonoBehaviour {
	var Hand : List.<GameObject>;
	var Family : int;
	var Tokens : int[];
	var highlight : boolean;
	var Ranking : int;
	/*
	var Tokens0 : int;
	var Tokens1 : int;
	var Tokens2 : int;
	*/
	
	function Start() {
		Hand = new List.<GameObject>();
		Family = 12;
		Tokens = [0, 0, 0];
		highlight = false;
		Ranking = 0;
		/*
		Tokens0 = 0;
		Tokens1 = 0;
		Tokens2 = 0;
		*/
	}
	
	function Update() {
		if (this.Family < 0) {
			this.Family = 0;
		}
		if (this.Tokens[0] < 0) {
			this.Tokens[0] = 0;
		}
		if (this.Tokens[1] < 0) {
			this.Tokens[1] = 0;
		}
		if (this.Tokens[2] < 0) {
			this.Tokens[2] = 0;
		}
	}
}
