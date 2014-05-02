#pragma strict

// Suspicious Absence - Choose a Lady. One of her Family members has left
// society under questionable circumstances. She must
// discard a random Family Card.

// List all available ladies.
// A screen will pop up for them listing all family members left
// they must choose which one to delete.
// click on person, and OK.
// deletes them from the list

// lose a random family value between 1 and 3

// text box messages
// 1. Please choose a Lady to inflict.
// 2. A random family member has been shamed and has left
//    her family. She has lost x 3 points
// 3. Please end your turn.


static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var CurrentLady : GameObject; //selected Gentleman to have token taken from
var CurrentGMan : GameObject; //selected player to receive token
var player : GameObject;
var LSelected : boolean; //if a Gentleman has been selected
var L0 : boolean; //G0 has been selected
var L1 : boolean; //G1 has been selected
var L2 : boolean; //G2 has been selected
var L3 : boolean; //G2 has been selected
var which : int;
var count : int = 0; //how many times tokens have been moved


var debuglog : boolean; //stop infinite debug statements

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 13) {
		if (!debuglog) {
			Debug.Log("Suspicious Absence Card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Please choose a Lady to inflict.");
		}
		
		if (Master.CurrentPlayer.GetComponent(Player).Family > 2 && count < 1){	
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
				switch(hit.collider.name) {
					case "Player0":
						//only responds to a click if another Gentleman is not
						//already selected and Gentleman0 has not already been
						//selected
						if (!LSelected && !L0) {								
							Debug.Log("L0 selected");
							
							CurrentLady = hit.transform.gameObject; //set CurrentGMan to selected GameObject
							LSelected = true; //don't allow another Gentleman to be selected until this is flushed
							L0 = true; //Gentleman0 has been selected, no longer selectable
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play();							
							CurrentLady.GetComponent(Player).Family -= 3;
							Coin.GetComponent(AudioSource).Play();		
							Debug.Log("3 Family Points from " + CurrentLady.name);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("A random family member has been shamed and has left her family. She has lost 3 hearts");
							LSelected = false; //flush GSelected
							count++;
						
						}
						break;
					case "Player1":
						if (!LSelected && !L1) {								
							Debug.Log("L1 selected");
							CurrentLady = hit.transform.gameObject; //set CurrentGMan to selected GameObject
							LSelected = true; //don't allow another Gentleman to be selected until this is flushed
							L0 = true; //Gentleman0 has been selected, no longer selectable
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play();							
							CurrentLady.GetComponent(Player).Family -= 3;
							Coin.GetComponent(AudioSource).Play();		
							Debug.Log("3 Family Points from " + CurrentLady.name);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("A random family member has been shamed and has left her family. She has lost 3 hearts");
							LSelected = false; //flush GSelected
							count++;
						
						}
						break;
					case "Player2":
						if (!LSelected && !L2) {								
							Debug.Log("L2 selected");
							CurrentLady = hit.transform.gameObject; //set CurrentGMan to selected GameObject
							LSelected = true; //don't allow another Gentleman to be selected until this is flushed
							L0 = true; //Gentleman0 has been selected, no longer selectable
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play();							
							CurrentLady.GetComponent(Player).Family -= 3;
							Coin.GetComponent(AudioSource).Play();		
							Debug.Log("3 Family Points from " + CurrentLady.name);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("A random family member has been shamed and has left her family. She has lost 3 hearts");
							LSelected = false; //flush GSelected
							count++;
						
						}	
						break;						
					case "Player3":
						if (!LSelected && !L3) {								
							Debug.Log("L3 selected");
							CurrentLady = hit.transform.gameObject; //set CurrentGMan to selected GameObject
							LSelected = true; //don't allow another Gentleman to be selected until this is flushed
							L0 = true; //Gentleman0 has been selected, no longer selectable
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play();							
							CurrentLady.GetComponent(Player).Family -= 3;
							Coin.GetComponent(AudioSource).Play();		
							Debug.Log("3 Family Points from " + CurrentLady.name);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("A random family member has been shamed and has left her family. She has lost 3 hearts");
							LSelected = false; //flush GSelected
							count++;
						
						}
						break;
										
					
				}
			}
		}
	}
	
		
	else { //once all 3 tokens have been moved
			Debug.Log("ending suspicious card play");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			LSelected = false;
			CurrentLady.GetComponent(Player).highlight = false;
			L0 = false;
			L1 = false;
			L2 = false;
			L3 = false;
			count = 0;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
		
		
		
	}		
	
}
