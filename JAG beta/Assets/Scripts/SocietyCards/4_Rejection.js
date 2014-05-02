#pragma strict

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var CurrentLady : GameObject; //selected Gentleman to have token taken from
var CurrentGMan : GameObject; //selected player to receive token
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
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 4) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Rejection card");
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Lady to be rejected.");
			debuglog = true;
		}
		
		for (card in Master.CurrentPlayer.GetComponent(Player).Hand) {
			if (card != Master.CurrentCard) {
					card.transform.position.z = 1;
					card.GetComponent(SpriteRenderer).enabled = false;
					card.GetComponent(BoxCollider).enabled = false;
				}
			}
		Master.CurrentCard.transform.position = Vector3(0, 0, -2);
		
		var x : float = -5.25;
		for (card in Master.Players) {
			card.transform.position = Vector3(x, -4.3, -2);
			x += 3.5;
		}
		
	if (count < 1){
		//detect mouse clicks and generate hit
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
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart.");
						}
						break;
					case "Player1":
						if (!LSelected && !L1) {								
							Debug.Log("L1 selected");
							CurrentLady = hit.transform.gameObject;
							LSelected = true;
							
							L1 = true;
							CurrentLady.GetComponent(Player).highlight = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart.");
						}
						break;
					case "Player2":
						if (!LSelected && !L2) {								
							Debug.Log("L2 selected");
							CurrentLady = hit.transform.gameObject;
							LSelected = true;
							
							L2 = true;
							CurrentLady.GetComponent(Player).highlight = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart.");
						}
						break;
					case "Player3":
						if (!LSelected && !L3) {								
							Debug.Log("L3 selected");
							CurrentLady = hit.transform.gameObject;
							LSelected = true;
							
							L3 = true;
							CurrentLady.GetComponent(Player).highlight = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart.");
						}
						break;
					
										
					case "Gentleman0":
						if (LSelected) {
							Debug.Log("G0 selected");
							CurrentGMan = hit.transform.gameObject;
							
							if(CurrentLady.GetComponent(Player).Tokens[0] > 2){
								CurrentLady.GetComponent(Player).Tokens[0] -= 3;
								CurrentGMan.GetComponent(Gentleman).Tokens += 3;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("3 hearts from " + CurrentLady.name);
								CurrentLady.GetComponent(Player).highlight = false;
							}
							else if(CurrentLady.GetComponent(Player).Tokens[0] == 2){							
								CurrentLady.GetComponent(Player).Tokens[0] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name);
								CurrentLady.GetComponent(Player).highlight = false;
							}
							else if(CurrentLady.GetComponent(Player).Tokens[0] == 1){							
								CurrentLady.GetComponent(Player).Tokens[0] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("1 hearts from " + CurrentLady.name);
								CurrentLady.GetComponent(Player).highlight = false;
							}
							LSelected = false; //flush GSelected
							count++;
							
							}
							break;
					case "Gentleman1":
						if (LSelected) {
							Debug.Log("G1 selected");
							CurrentGMan = hit.transform.gameObject;
							
							if(CurrentLady.GetComponent(Player).Tokens[1] > 2){
								CurrentLady.GetComponent(Player).Tokens[1] -= 3;
								CurrentGMan.GetComponent(Gentleman).Tokens += 3;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("3 hearts from " + CurrentLady.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[1] == 2){							
								CurrentLady.GetComponent(Player).Tokens[1] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[1] == 1){							
								CurrentLady.GetComponent(Player).Tokens[1] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("1 hearts from " + CurrentLady.name);
							}
							LSelected = false; //flush GSelected
							count++;
							CurrentLady.GetComponent(Player).highlight = false;
							
							}
							break;
					case "Gentleman2":
						if (LSelected) {
							Debug.Log("G2 selected");
							CurrentGMan = hit.transform.gameObject;
							
							if(CurrentLady.GetComponent(Player).Tokens[2] > 2){
								CurrentLady.GetComponent(Player).Tokens[2] -= 3;
								CurrentGMan.GetComponent(Gentleman).Tokens += 3;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("3 hearts from " + CurrentLady.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[2] == 2){							
								CurrentLady.GetComponent(Player).Tokens[2] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[2] == 1){							
								CurrentLady.GetComponent(Player).Tokens[2] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("1 hearts from " + CurrentLady.name);
							}
							LSelected = false; //flush GSelected
							count++;
							CurrentLady.GetComponent(Player).highlight = false;
							}
							break;
				}
			}
		}
		
	} 
	else { //once all 3 tokens have been moved
			Debug.Log("ending rejection card play");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			LSelected = false;
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
		
		
