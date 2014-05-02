#pragma strict

//static var = click sound
static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");

var CurrentGMan : GameObject; //selected Gentleman to have token taken from
var player : GameObject; //selected player to receive token
var GSelected : boolean; //if a Gentleman has been selected
var G0 : boolean; //G0 has been selected
var G1 : boolean; //G1 has been selected
var G2 : boolean; //G2 has been selected
var count : int = 0; //how many times tokens have been moved
var which : int; //for moving token into player's correct token list
var otherPlayer : GameObject; //player from which a Token is taken from
var CurrentSelected : boolean; //true if CurrentPlayer has taken a Token
var fromPlayer : boolean; //true if taking Token from another player

var debuglog : boolean; //stop infinite debug statements

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	//only called when a SocietyCard with id# 0 is played from Master script
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 0) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Love card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You played the Love card! Tap a Gentleman and then a Lady to send her a Heart.");
		}

		//ensures no excess tokens are moved
		if (count < 3) {
			//detect mouse clicks and generate hit
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Gentleman0":
							//only responds to a click if another Gentleman is not
							//already selected and Gentleman0 has not already been
							//selected
							if (!GSelected && !G0) {
								Debug.Log("G0 selected");
								Click.GetComponent(AudioSource).Play();
								CurrentGMan = hit.transform.gameObject; //set CurrentGMan to selected GameObject
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								GSelected = true; //don't allow another Gentleman to be selected until this is flushed
								which = 0;
								G0 = true; //Gentleman0 has been selected, no longer selectable
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now tap a Lady to receive " + CurrentGMan.gameObject.name + "'s Heart.");
							}
							break;
						case "Gentleman1":
							if (!GSelected && !G1) {
								Debug.Log("G1 selected");
								Click.GetComponent(AudioSource).Play();
								CurrentGMan = hit.transform.gameObject;
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								GSelected = true;
								which = 1;
								G1 = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now tap a Lady to receive " + CurrentGMan.gameObject.name + "'s Heart.");
							}
							break;
						case "Gentleman2":
							if (!GSelected && !G2) {
								Debug.Log("G2 selected");
								Click.GetComponent(AudioSource).Play();
								CurrentGMan = hit.transform.gameObject;
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								GSelected = true;
								which = 2;
								G2 = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now tap a Lady to receive " + CurrentGMan.gameObject.name + "'s Heart.");
							}
							break;
						//Players can only be selected to receive a token AFTER a Gentleman
						//has been selected
						case "Player0":
							if (GSelected && !fromPlayer) {
								Debug.Log("P0 selected");
								player = hit.transform.gameObject;
								if (!(CurrentSelected && player == Master.CurrentPlayer)) {
									if (player == Master.CurrentPlayer) {
										CurrentSelected = true;
									}
									if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
										CurrentGMan.GetComponent(Gentleman).Tokens--;
										player.GetComponent(Player).Tokens[which]++;
									
										GSelected = false; //flush GSelected
										Coin.GetComponent(AudioSource).Play();
										Debug.Log("heart from " + CurrentGMan.name + " to " + player.name);
										count++; //increment count
										CurrentGMan.GetComponent(Gentleman).highlight = false;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + CurrentGMan.gameObject.name + ", tap another Gentleman.");
									} else {
										fromPlayer = true;
										player.GetComponent(Player).highlight = true;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(CurrentGMan.gameObject.name + " has no more Hearts! Tap another Lady to take one from her!");
									}
								}//end if !(CurrentSelected && player == Master.CurrentPlayer)
							} else if (GSelected && fromPlayer) {//take token from another player
								otherPlayer = hit.transform.gameObject;
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									
									count++; //increment count
									Coin.GetComponent(AudioSource).Play();
									fromPlayer = false;
									GSelected = false;
									player.GetComponent(Player).highlight = false;
									CurrentGMan.GetComponent(Gentleman).highlight = false;
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + otherPlayer.gameObject.name + ", tap another Gentleman.");
								}
							}//end else if (fromPlayer)
							break;
						case "Player1":
							if (GSelected && !fromPlayer) {
								Debug.Log("P1 selected");
								player = hit.transform.gameObject;
								if (!(CurrentSelected && player == Master.CurrentPlayer)) {
									if (player == Master.CurrentPlayer) {
										CurrentSelected = true;
									}
									if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
										CurrentGMan.GetComponent(Gentleman).Tokens--;
										player.GetComponent(Player).Tokens[which]++;
										
										GSelected = false; //flush GSelected
										Coin.GetComponent(AudioSource).Play();
										Debug.Log("heart from " + CurrentGMan.name + " to " + player.name);
										count++; //increment count
										CurrentGMan.GetComponent(Gentleman).highlight = false;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + CurrentGMan.gameObject.name + ", tap another Gentleman.");
									} else {
										fromPlayer = true;
										player.GetComponent(Player).highlight = true;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(CurrentGMan.gameObject.name + " has no more Hearts! Tap another Lady to take one from her!");
									}
								}//end if !(CurrentSelected && player == Master.CurrentPlayer)
							} else if (GSelected && fromPlayer) {//take token from another player
								otherPlayer = hit.transform.gameObject;
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									count++; //increment count
									fromPlayer = false;
									GSelected = false;
									player.GetComponent(Player).highlight = false;
									CurrentGMan.GetComponent(Gentleman).highlight = false;
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + otherPlayer.gameObject.name + ", tap another Gentleman.");
								}
							}//end else if (fromPlayer)
							break;
						case "Player2":
							if (GSelected && !fromPlayer) {
								Debug.Log("P2 selected");
								player = hit.transform.gameObject;
								if (!(CurrentSelected && player == Master.CurrentPlayer)) {
									if (player == Master.CurrentPlayer) {
										CurrentSelected = true;
									}
									if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
										CurrentGMan.GetComponent(Gentleman).Tokens--;
										player.GetComponent(Player).Tokens[which]++;
										
										GSelected = false; //flush GSelected
										Coin.GetComponent(AudioSource).Play();
										Debug.Log("heart from " + CurrentGMan.name + " to " + player.name);
										count++; //increment count
										CurrentGMan.GetComponent(Gentleman).highlight = false;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + CurrentGMan.gameObject.name + ", tap another Gentleman.");
									} else {
										fromPlayer = true;
										player.GetComponent(Player).highlight = true;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(CurrentGMan.gameObject.name + " has no more Hearts! Tap another Lady to take one from her!");
									}
								}//end if !(CurrentSelected && player == Master.CurrentPlayer)
							} else if (GSelected && fromPlayer) {//take token from another player
								otherPlayer = hit.transform.gameObject;
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									count++; //increment count
									fromPlayer = false;
									GSelected = false;
									player.GetComponent(Player).highlight = false;
									CurrentGMan.GetComponent(Gentleman).highlight = false;
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + otherPlayer.gameObject.name + ", tap another Gentleman.");
								}
							}//end else if (fromPlayer)
							break;
						case "Player3":
							if (GSelected && !fromPlayer) {
								Debug.Log("P3 selected");
								player = hit.transform.gameObject;
								if (!(CurrentSelected && player == Master.CurrentPlayer)) {
									if (player == Master.CurrentPlayer) {
										CurrentSelected = true;
									}
									if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
										CurrentGMan.GetComponent(Gentleman).Tokens--;
										player.GetComponent(Player).Tokens[which]++;
										GSelected = false; //flush GSelected
										Debug.Log("heart from " + CurrentGMan.name + " to " + player.name);
										Coin.GetComponent(AudioSource).Play();
										count++; //increment count
										CurrentGMan.GetComponent(Gentleman).highlight = false;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + CurrentGMan.gameObject.name + ", tap another Gentleman.");
									} else {
										fromPlayer = true;
										player.GetComponent(Player).highlight = true;
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(CurrentGMan.gameObject.name + " has no more Hearts! Tap another Lady to take one from her!");
									}
								}//end if !(CurrentSelected && player == Master.CurrentPlayer)
							} else if (GSelected && fromPlayer) {//take token from another player
								otherPlayer = hit.transform.gameObject;
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									count++; //increment count
									fromPlayer = false;
									GSelected = false;
									player.GetComponent(Player).highlight = false;
								 	CurrentGMan.GetComponent(Gentleman).highlight = false;
								 	Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.gameObject.name + " received a Heart from " + otherPlayer.gameObject.name + ", tap another Gentleman.");
								}
							}//end else if (fromPlayer)
							break;
					}//end switch(hit.collider.name)
				}
			}
		} else { //once all 3 tokens have been moved
			Debug.Log("ending love card play");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			GSelected = false;
			G0 = false;
			G1 = false;
			G2 = false;
			CurrentSelected = false;
			count = 0;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}//end else
	}
}//end function Update()