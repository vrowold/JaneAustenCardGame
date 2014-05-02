#pragma strict

// Whispers - Choose one Lady. She tells you about a man’s Feature
// that she knows but you do not. You do the same for her. Both Ladies must
// agree on the information to be exchanged.

// list of ladies show up; pick one
// have them tell you in person about the feature. 
// a button will show to press when you've learned the info
// a button will also show for her.
// once both are pressed, the game can continue.

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var debuglog : boolean = false;

function Update() {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 15) {
		//debug statement
		if (!debuglog) {
				Debug.Log("Whispers card");
				debuglog = true;
		}
								
		Debug.Log("ending whisper card play"); //you picked a lady and now end your turn. all variables get erased
		//remove the LoveCard that was played, make it invisible, and unclickable
		Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
		Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
		Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
		Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		Master.CurrentCard.transform.position.z = 2;
		Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Talk to another Player about a Feature Card you don't know before you press the 'End Turn' button");
		//flush booleans and other things
		Master.cardPlayed = false;
		Master.turnEnd = true;
		debuglog = false;
	}
}
