#pragma strict

// Regimental Distraction - A Regiment has come to town and the other Ladies
// become temporarily enamored with the Officers. Everyone except you must
// send back 1 Love Token from each Gentleman in the game.

// for every woman involved:
//   for every token count they have:
//     subtract love token count by one
//     add to his count by 1
// show new token count at the end

// text box instructions
// 1. Everyone has returned one Heart back to the Gentleman except you.
//    Well done. Please end your turn

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var debuglog : boolean; //stop infinite debug statements
//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 12) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Regimental Distraction card");
			debuglog = true;
		}
		
		for (player in Master.Players) {
			if (player != Master.CurrentPlayer) {
				for (var i : int = 0; i < 3; i++) {
					if (player.GetComponent(Player).Tokens[i] > 0) {
						player.GetComponent(Player).Tokens[i]--;
						Master.Gentlemen[i].GetComponent(Gentleman).Tokens++;
						Coin.GetComponent(AudioSource).Play();
						Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Everyone has returned one Heart back to that Gentleman.");
					}
				}
			}
		}
		Debug.Log("ending regimental distraction card play");
		//remove the LoveCard that was played, make it invisible, and unclickable
		Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
		Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
		Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
		Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		Master.CurrentCard.layer = 2;
		Master.CurrentCard.transform.position.z = 2;
		//flush booleans
		Master.cardPlayed = false;
		Master.turnEnd = true;
		debuglog = false;
	}
}
