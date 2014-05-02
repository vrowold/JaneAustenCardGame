#pragma strict

var id;
var bool0;
var bool1;
var bool2;
var bool3;
var bool4;
var bool5;
var bool6;
var bool7;
var bool8;
var bool9;
var bool10;
var bool11;
var bool12;
var bool13;
var bool14;
var bool15;
var bool16;
var bool17;
var bool18;
var bool19;

function Update () {
	if (Master.cardPlayed) {
		//Debug.Log("card detected");
		id = Master.CurrentCard.GetComponent(SocietyCard).id;
		
		switch (id) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				break;
			case 11:
				break;
			case 12:
				break;
			case 13:
				break;
			case 14:
				break;
			case 15:
				break;
			case 16:
				break;
			case 17:
				break;
			case 18:
				break;
			case 19:
				break;
		}
	}
}

/*
	ID, Card, # in deck 
	0 = Love, 16
	1 = Intervene, 4
	2 = Oppose, 5
	3 = Inquire, 6
	4 = Rejection, 2
	5 = Friends, 2
	6 = Gentleman Caller, 1
	7 = Drunken Declaration, 1
	8 = Suggestion, 2
	9 = Grand Wedding, 1
	10 = Prejudice, 2
	11 = Persuasion, 2
	12 = Regimental Distraction, 1
	13 = Suspicious Absence, 1
	14 = Confusion, 2
	15 = Whispers, 2
	16 = Scandalous Rumours, 3
	17 = Revelation, 2
	18 = Storm, 1
	19 = Court of St. James, 1
*/