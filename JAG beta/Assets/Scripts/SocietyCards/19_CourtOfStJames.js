#pragma strict 
//does not work



static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var debuglog : boolean;

private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update() {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 19) {
		if (!debuglog) {
			Debug.Log("St James Card");
			debuglog = true;
			Coin.GetComponent(AudioSource).Play();
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Your Family Points have been improved to 13.");
			}
			
			Master.CurrentPlayer.GetComponent(Player).Family = 13;
			
			Debug.Log("ending St James card play");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
}		
		
		
		
	

