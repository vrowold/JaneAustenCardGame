
#pragma strict

//Take 3 Love Tokens from a Lady, 
//up to the Family Point value of the card. 
//Return them to the man who gave them. 




//Take 2 Love Tokens that
//have been given to another
//Lady and keep them for
//yourself.
static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");

var CurrentLady : GameObject; //selected Gentleman to have token taken from
var CurrentGMan : GameObject; //selected player to receive token
var player : GameObject;
var LSelected : boolean; //if a lady has been selected
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
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 2) {
		//debug statement
		
		if (!debuglog) {
			Debug.Log("Oppose Card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Lady to oppose their efforts.");
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
		
		//Master.CurrentPlayer.GetComponent(Player).Family > 2 && 
		
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
							CurrentLady.GetComponent(Player).highlight = true;		
							Click.GetComponent(AudioSource).Play(); 					
							L0 = true; //Gentleman0 has been selected, no longer selectable
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart she will lose.");
						}
						break;
					case "Player1":
						if (!LSelected && !L1) {								
							Debug.Log("L1 selected");
							CurrentLady = hit.transform.gameObject;
							
							LSelected = true;
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play(); 
							L1 = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart she will lose.");
						}
						break;
					case "Player2":
						if (!LSelected && !L2) {								
							Debug.Log("L2 selected");
							CurrentLady = hit.transform.gameObject;
							LSelected = true;
							CurrentLady.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play(); 
							L2 = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart she will lose.");
						}
						break;
					case "Player3":
						if (!LSelected && !L3) {								
							Debug.Log("L3 selected");
							CurrentLady = hit.transform.gameObject;
							LSelected = true;
							player.GetComponent(Player).highlight = true;
							Click.GetComponent(AudioSource).Play(); 
							L3 = true;
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify which Heart she will lose.");
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
								Debug.Log("3 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[0] == 2){							
								CurrentLady.GetComponent(Player).Tokens[0] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[0] == 1){							
								CurrentLady.GetComponent(Player).Tokens[0] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("3 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							LSelected = false; //flush GSelected
							CurrentLady.GetComponent(Player).highlight = false;
							count++;
							
							}
							break;
					case "Gentleman1":
						if (LSelected) {
							Debug.Log("G0 selected");
							CurrentGMan = hit.transform.gameObject;
							
							if(CurrentLady.GetComponent(Player).Tokens[1] > 2){							
								CurrentLady.GetComponent(Player).Tokens[1] -= 3;
								CurrentGMan.GetComponent(Gentleman).Tokens += 3;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("3 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[1] == 2){							
								CurrentLady.GetComponent(Player).Tokens[1] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[1] == 1){							
								CurrentLady.GetComponent(Player).Tokens[1] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("1 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							LSelected = false; //flush GSelected
							CurrentLady.GetComponent(Player).highlight = false;
							count++;
							
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
								Debug.Log("3 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[2] == 2){							
								CurrentLady.GetComponent(Player).Tokens[2] -= 2;
								CurrentGMan.GetComponent(Gentleman).Tokens += 2;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("2 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							else if(CurrentLady.GetComponent(Player).Tokens[2] == 1){							
								CurrentLady.GetComponent(Player).Tokens[2] -= 1;
								CurrentGMan.GetComponent(Gentleman).Tokens += 1;
								Coin.GetComponent(AudioSource).Play();
								Debug.Log("1 hearts from " + CurrentLady.name + "to" + CurrentGMan.name);
							}
							LSelected = false; //flush GSelected
							CurrentLady.GetComponent(Player).highlight = false;
							count++;
							
							}
							break;
				}
			}
		}
		
		}
	else { //once all 3 tokens have been moved
			Debug.Log("ending oppose card play");
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
