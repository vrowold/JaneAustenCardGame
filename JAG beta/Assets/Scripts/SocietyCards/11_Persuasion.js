#pragma strict

// Persuasion - Take 2 Love Tokens that have been given to another
// Lady and keep them for yourself.

// for all women involved
//   list each tokens amount of every man they have
//   pick one
//   then go to the next woman
// then, add them to your token counts

// need currrentplayer

//move 2 tokens from one lady to another lady or ladies

//move 2 tokens from one lady to another lady or ladies


#pragma strict

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var CurrentPlayer : GameObject; //selected Lady to have token taken from
var CurrentGMan : GameObject;
var player : GameObject;
var count : int = 0; //how many times tokens have been moved
var P0 : boolean; //L0 has been selected
var P1 : boolean; //L1 has been selected
var P2 : boolean; //L2 has been selected
var P3 : boolean; //L3 has been selected
var otherPlayer : GameObject; //player from which a Token is taken from
var PSelected : boolean; //if a lady has been selected
var which : int; //which lady to take token from
var GSelected : boolean;
var debuglog : boolean; //stop infinite debug statements


//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 11) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Persuasion card");
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
		if(count < 2)
		{
		//first select an other lady and set that lady to the game object
		if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Player0":
						otherPlayer = hit.transform.gameObject; 
							//only responds to a click if another Lady is not
							//already selected and Lady0 has not already been
							//selected
							//whose tokens you would like to take
							if (!PSelected && !P0) {
								if(Master.CurrentPlayer != otherPlayer)
								{
								Debug.Log("Player0 Selected");
								//set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P0 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Click.GetComponent(AudioSource).Play();
								}
								else
								{
								Debug.Log("You cannot take coins from yourself");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You cannot take Hearts from yourself!");
								}
							}

							break;
							case "Player1":
							otherPlayer = hit.transform.gameObject;
							if (!PSelected && !P1) {
								if(Master.CurrentPlayer != otherPlayer)
								{
								Debug.Log("Player1 Selected");
								 //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P1 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Click.GetComponent(AudioSource).Play();
							}
							else
								{
								Debug.Log("You cannot take coins from yourself");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You cannot take Hearts from yourself!");
								}
								}
							
							break;
							case "Player2":
							otherPlayer = hit.transform.gameObject;
							if (!PSelected && !P2) {
								if(Master.CurrentPlayer != otherPlayer)
								{
								Debug.Log("Player2 Selected");
								 //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P2 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Click.GetComponent(AudioSource).Play();
							}
							else
								{
								Debug.Log("You cannot take coins from yourself");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You cannot take Hearts from yourself!");
								}
								}
							
							break;
							case "Player3":
							otherPlayer = hit.transform.gameObject;
							if (!PSelected && !P3) {
								if(Master.CurrentPlayer != otherPlayer)
								{
							
								Debug.Log("Player3 Selected");
								 //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P2 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Click.GetComponent(AudioSource).Play();
							}
							else
								{
								Debug.Log("You cannot take coins from yourself");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You cannot take Hearts from yourself!");
								}
								}
							
							break;
							//select a gentlemen whose tokens you would like to take
							case "Gentleman0":
							which=0;
							if(PSelected == true)
							{
								if(otherPlayer.GetComponent(Player).Tokens[which]>0)
								{
									CurrentGMan = hit.transform.gameObject;	
									Debug.Log("Gentleman0 tokens");
									
									PSelected = false;
									count++;
									Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
									otherPlayer.GetComponent(Player).Tokens[which]--;
									Coin.GetComponent(AudioSource).Play();
									otherPlayer.GetComponent(Player).highlight=false;
									Click.GetComponent(AudioSource).Play();
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You have taken a Heart from " + otherPlayer.gameObject.name + "!");
									P0=false;
									P1=false;
									P2=false;
									P3=false;
								}
								else
								{
								Debug.Log("The lady you have selected does not have any of these tokens, please select a lady");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(otherPlayer.gameObject.name + "does not have the Hearts you're looking for.");
								PSelected = false;
								otherPlayer.GetComponent(Player).highlight=false;
								P0=false;
								P1=false;
								P2=false;
								P3=false;
								}
							}
							break;
							case "Gentleman1":
							which=1;
							if(PSelected==true)
							{
							if(otherPlayer.GetComponent(Player).Tokens[which]>0)
							{
							CurrentGMan = hit.transform.gameObject;	
							Debug.Log("Gentleman1 tokens");
							
							PSelected = false;
							count++;
							Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
							otherPlayer.GetComponent(Player).Tokens[which]--;
							Coin.GetComponent(AudioSource).Play();
							otherPlayer.GetComponent(Player).highlight=false;
							Click.GetComponent(AudioSource).Play();
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You have taken a Heart from " + otherPlayer.gameObject.name + "!");
							P0=false;
							P1=false;
							P2=false;
							P3=false;
							}
							else
							{
							Debug.Log("The lady you have selected does not have any of these tokens, please select a lady");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(otherPlayer.gameObject.name + "does not have the Hearts you're looking for.");
								PSelected = false;
								otherPlayer.GetComponent(Player).highlight=false;
								P0=false;
								P1=false;
								P2=false;
								P3=false;
								}
								}
							
							break;
							case "Gentleman2":
							which=2;
							if(PSelected==true)
							{
							if(otherPlayer.GetComponent(Player).Tokens[which]>0)
							{
							CurrentGMan = hit.transform.gameObject;
							Debug.Log("Gentleman2 tokens");
							
							PSelected = false;
							count++;
							Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
							otherPlayer.GetComponent(Player).Tokens[which]--;
							Coin.GetComponent(AudioSource).Play();
							otherPlayer.GetComponent(Player).highlight=false;
							Click.GetComponent(AudioSource).Play();
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("You have taken a Heart from " + otherPlayer.gameObject.name + "!");
							P0=false;
							P1=false;
							P2=false;
							P3=false;
							}
							else
							{
							Debug.Log("The lady you have selected does not have any of these tokens, please select a lady");
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(otherPlayer.gameObject.name + "does not have the tokens you're looking for.");
								PSelected = false;
								otherPlayer.GetComponent(Player).highlight=false;
								P0=false;
								P1=false;
								P2=false;
								P3=false;
								}
								}
							break;
						}//end switch(hit.collider.name)
				}
			}
		} else { //once all 3 tokens have been moved
			Debug.Log("ending Persuaion Card");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			//flush booleans
			GSelected = false;
			count = 0;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
			CurrentGMan.GetComponent(Gentleman).highlight=false;
			otherPlayer.GetComponent(Player).highlight=false;
		}//end else
	}
}//end function Update()
