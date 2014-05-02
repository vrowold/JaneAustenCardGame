
#pragma strict

import System.Collections.Generic;

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var otherPlayer : GameObject; //player from which a Token is taken from
var cardSelector = 0;
var cardCount = 0;
var count = 0;

var debuglog : boolean; //stop infinite debug statements

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	//only called when a SocietyCard with id# 5 is played from Master script
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 5) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Friends card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Lady to steal a card from.");
		}

		if (count<1){
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						
						case "Player0":
							if(Master.CurrentPlayer.GetComponent(Player).name != "Player0"){
								otherPlayer = hit.transform.gameObject;
								cardCount = otherPlayer.GetComponent(Player).Hand.Count;
								cardSelector = Random.Range(0,cardCount);
								Master.CurrentPlayer.GetComponent(Player).Hand.Add(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								otherPlayer.GetComponent(Player).Hand.Remove(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								count++;
							}
							break;
						case "Player1":
							if(Master.CurrentPlayer.GetComponent(Player).name != "Player1"){
								otherPlayer = hit.transform.gameObject;
								cardCount = otherPlayer.GetComponent(Player).Hand.Count;
								cardSelector = Random.Range(0,cardCount);
								Master.CurrentPlayer.GetComponent(Player).Hand.Add(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								
								otherPlayer.GetComponent(Player).Hand.Remove(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								count++;
							}
							break;
						case "Player2":
							if(Master.CurrentPlayer.GetComponent(Player).name != "Player2"){
								otherPlayer = hit.transform.gameObject;
								cardCount = otherPlayer.GetComponent(Player).Hand.Count;
								cardSelector = Random.Range(0,cardCount);
								Master.CurrentPlayer.GetComponent(Player).Hand.Add(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								otherPlayer.GetComponent(Player).Hand.Remove(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								count++;
							}
							break;
						case "Player3":
							if(Master.CurrentPlayer.GetComponent(Player).name != "Player3"){
								otherPlayer = hit.transform.gameObject;
								cardCount = otherPlayer.GetComponent(Player).Hand.Count;
								cardSelector = Random.Range(0,cardCount);
								Master.CurrentPlayer.GetComponent(Player).Hand.Add(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								otherPlayer.GetComponent(Player).Hand.Remove(otherPlayer.GetComponent(Player).Hand[cardSelector]);
								count++;
							}
							break;
					}//end switch(hit.collider.name)
				}
			}
		 }
	else { //once all 3 tokens have been moved
			Debug.Log("ending friends card play");
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
		}//end else
	}
}
//end function Update()
