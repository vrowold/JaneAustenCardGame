#pragma strict

import System.Collections.Generic;

public class Gentleman extends MonoBehaviour {
	var Features : List.<GameObject>;
	var Tokens : int;
	var VisibleValue : int;
	var TotalValue : int;
	var highlight : boolean;
	var Ranking : int;
	
	function Awake() {
		DontDestroyOnLoad(this);
	}
	function Start() {
		Features = new List.<GameObject>();
		Tokens = 11;
		VisibleValue = 0;
		TotalValue = 0;
		highlight = false;
		Ranking = 0;
	}
}
