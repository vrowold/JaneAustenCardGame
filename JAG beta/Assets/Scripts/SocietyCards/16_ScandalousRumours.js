/*//move 2 tokens from one lady to another lady or ladies

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
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 16) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Scandalous Rumours card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Lady to take a Heart from.");
			
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
							//only responds to a click if another Lady is not
							//already selected and Lady0 has not already been
							//selected
							//whose tokens you would like to take
							if (!PSelected && !P0) {
								Debug.Log("Player0 Selected");
								Click.GetComponent(AudioSource).Play();
								otherPlayer = hit.transform.gameObject; //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P0 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify the Heart.");
							}
							if(GSelected==true) //player cannot be selected unless a specific gentleman tokens are specified 
								{
								Debug.Log("Player0 Selected");
								player = hit.transform.gameObject;
								if(otherPlayer.GetComponent(Player).Tokens[which]>0)
									{
									Coin.GetComponent(AudioSource).Play();
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									count++;
									PSelected = false; //flush 
									GSelected = false;
									CurrentGMan.GetComponent(Gentleman).highlight=false;

									}
									else
									{
									GSelected = false; //If the lady does not have any of the specified tokens then flush both Selected and start from beginning
									PSelected = false;
									Debug.Log("Player does not have any of these tokens, please select a Lady");
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("She does not have the Hearts you're looking for.");
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									P0 = false;
									P1 = false;
									P2 = false;
									P3 = false;
									}
								}

							break;
							case "Player1":
							if (!PSelected && !P1) {
								Debug.Log("Player1 Selected");
								Click.GetComponent(AudioSource).Play();
								otherPlayer = hit.transform.gameObject; //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P1 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify the Heart.");
							}
							if(GSelected==true) //player cannot be selected unless a specific gentleman tokens are specified 
								{
								Debug.Log("Player1 Selected");
								player = hit.transform.gameObject;
								if(otherPlayer.GetComponent(Player).Tokens[which]>0)
									{
									Coin.GetComponent(AudioSource).Play();
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									count++;
									PSelected = false; //flush 
									GSelected = false;
									CurrentGMan.GetComponent(Gentleman).highlight=false;

									}
									else
									{
									GSelected = false; //If the lady does not have any of the specified tokens then flush both Selected and start from beginning
									PSelected = false;
									Debug.Log("Player does not have any of these tokens, please select a Lady");
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("She does not have the Hearts you're looking for.");
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									P0 = false;
									P1 = false;
									P2 = false;
									P3 = false;
									}
								}
							break;
							case "Player2":
							if (!PSelected && !P2) {
								Debug.Log("Player2 Selected");
								Click.GetComponent(AudioSource).Play();
								otherPlayer = hit.transform.gameObject; //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P2 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify the Heart.");
							}
							if(GSelected==true) //player cannot be selected unless a specific gentleman tokens are specified 
								{
								Debug.Log("Player2 Selected");
								player = hit.transform.gameObject;
								if(otherPlayer.GetComponent(Player).Tokens[which]>0)
									{
									Coin.GetComponent(AudioSource).Play();
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									count++;
									PSelected = false; //flush 
									GSelected = false;
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									}
									else
									{
									GSelected = false; //If the lady does not have any of the specified tokens then flush both Selected and start from beginning
									PSelected = false;
									Debug.Log("Player does not have any of these tokens, please select a Lady");
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("She does not have the Hearts you're looking for.");
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									P0 = false;
									P1 = false;
									P2 = false;
									P3 = false;
									}
								}
							break;
							case "Player3":
							if (!PSelected && !P3) {
								Debug.Log("Player3 Selected");
								Click.GetComponent(AudioSource).Play();
								otherPlayer = hit.transform.gameObject; //set Current Lady to selected GameObject
								PSelected = true; //don't allow another Lady to be selected until this is flushed
								P2 = true; //L0 has been selected, no longer selectable
								otherPlayer.GetComponent(Player).highlight=true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a Gentleman to specify the Heart.");
							}
							if(GSelected==true) //player cannot be selected unless a specific gentleman tokens are specified 
								{
								Debug.Log("Player3 Selected");
								player = hit.transform.gameObject;
								if(otherPlayer.GetComponent(Player).Tokens[which]>0)
									{
									Coin.GetComponent(AudioSource).Play();
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									count++;
									PSelected = false; //flush 
									GSelected = false;
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									}
									else
									{
									GSelected = false; //If the lady does not have any of the specified tokens then flush both Selected and start from beginning
									PSelected = false;
									Debug.Log("Player does not have any of these tokens, please select a Lady");
									Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("She does not the Hearts you're looking for.");
									CurrentGMan.GetComponent(Gentleman).highlight=false;
									P0 = false;
									P1 = false;
									P2 = false;
									P3 = false;
									}
								}
							break;
							//select a gentlemen whose tokens you would like to take
							case "Gentleman0":
							if(PSelected == true)
							{
							
							CurrentGMan = hit.transform.gameObject;	
							Debug.Log("Gentleman0 tokens");
							Click.GetComponent(AudioSource).Play();
							which=0;
							GSelected = true;
							otherPlayer.GetComponent(Player).highlight=false;
							CurrentGMan.GetComponent(Gentleman).highlight=true;
							}
							break;
							case "Gentleman1":
							if(PSelected==true)
							{
							CurrentGMan = hit.transform.gameObject;	
							Debug.Log("Gentleman1 tokens");
							Click.GetComponent(AudioSource).Play();
							which=1;
							GSelected = true;
							otherPlayer.GetComponent(Player).highlight=false;
							CurrentGMan.GetComponent(Gentleman).highlight=true;
							}
							break;
							case "Gentleman2":
							if(PSelected==true)
							{
							CurrentGMan = hit.transform.gameObject;
							Debug.Log("Gentleman2 tokens");
							Click.GetComponent(AudioSource).Play();
							which=2;
							GSelected = true;
							otherPlayer.GetComponent(Player).highlight=false;
							CurrentGMan.GetComponent(Gentleman).highlight=true;
							}
							break;
						}//end switch(hit.collider.name)
				}
			}
		} else { //once all 3 tokens have been moved
			Debug.Log("ending Scandalous Rumours Card");
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
		}//end else
	}
}//end function Update()
*/