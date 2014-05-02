#pragma strict

// Confusion - One man simply cannot decide. Choose 1 Gentleman. All
// Ladies return 1 of his Love Tokens.

// for each woman involved:
//   subtract 1 from his love token count she has
//   add to his count
// update lists of counts

// text box instructions
// 1. Please select a Gentleman.
// 2. All of the other Ladies have returned one of his Hearts. 
//    Please end your turn.

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var CurrentGMan : GameObject; //selected Gentleman to have token taken from
var GSelected : boolean; //if a Gentleman has been selected
var debuglog : boolean; //stop infinite debug statements
var which : int; //for moving token into player's correct token list

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 14) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Confusion card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Please select a Gentleman to play further.");
		}
		
		if (!GSelected) {
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Gentleman0":
							//have to select a gentleman in order to continue with card operation
							if (!GSelected) {
								Debug.Log("G0 selected");
								CurrentGMan = hit.transform.gameObject; //set CurrentGMan to selected GameObject
								GSelected = true; //don't allow another Gentleman to be selected until this is flushed
								which = 0;
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
							}
							break;
						case "Gentleman1":
							if (!GSelected) {
								Debug.Log("G1 selected");
								CurrentGMan = hit.transform.gameObject;
								GSelected = true;
								which = 1;
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
							}
							break;
						case "Gentleman2":
							if (!GSelected) {
								Debug.Log("G2 selected");
								CurrentGMan = hit.transform.gameObject;
								GSelected = true;
								which = 2;
								CurrentGMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
							}
							break;
					}//end switch(hit.collider.name)
				}//end if (Physics.Raycast
			}//end if (Input.GetMouseButtonDown(0))
		} else {
			for (player in Master.Players) {
				if (player.GetComponent(Player).Tokens[which] > 0) {
					player.GetComponent(Player).Tokens[which]--;
					CurrentGMan.GetComponent(Gentleman).Tokens++;
					Coin.GetComponent(AudioSource).Play();
				}
			}//end for (player in Master.Players)
			
			CurrentGMan.GetComponent(Gentleman).highlight = false;
			
			Debug.Log("ending confusion card play");
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("All of the other Ladies have returned one of his Hearts. Please end your turn.");
			GSelected = false;
			CurrentGMan = null;
			which = 0;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
	}
}



