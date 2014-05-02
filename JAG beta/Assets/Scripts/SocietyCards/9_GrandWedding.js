//you and one other lady may take 1 token from a gentlemen

#pragma strict

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

//you and one other lady of your choice may take 1 love token from any gentleman 
//once Gselceted player receives token and then must choose another player to receive token
var debuglog : boolean; //stop infinite debug statements

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 9) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Grand Wedding card");
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
		if (count < 2) {
				    //detect mouse clicks and generate hit
				    if (Input.GetMouseButtonDown(0)) {
					ray = titleCamera.ScreenPointToRay(Input.mousePosition);
					Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman.");
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
						    GSelected = true; //don't allow another Gentleman to be selected until this is flushed
						    which = 0;
						    G0 = true; //Gentleman0 has been selected, no longer selectable
						    CurrentGMan.GetComponent(Gentleman).highlight=true;
						    Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a woman to share a Heart with.");
						}
						break;
					    case "Gentleman1":
						if (!GSelected && !G1) {
						    Debug.Log("G1 selected");
						    Click.GetComponent(AudioSource).Play();
						    CurrentGMan = hit.transform.gameObject;
						    GSelected = true;
						    which = 1;
						    G1 = true;
						    CurrentGMan.GetComponent(Gentleman).highlight=true;
						    Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a woman to share a Heart with.");
						}
						break;
					    case "Gentleman2":
						if (!GSelected && !G2) {
						    Debug.Log("G2 selected");
						    Click.GetComponent(AudioSource).Play();
						    CurrentGMan = hit.transform.gameObject;
						    GSelected = true;
						    which = 2;
						    G2 = true;
						    CurrentGMan.GetComponent(Gentleman).highlight=true;
						    Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a woman to share a Heart with.");
						}
						break;
						case "Player0":
						player = hit.transform.gameObject;
								if (GSelected && Master.CurrentPlayer != player) {
									Debug.Log("P0 selected");
									Master.CurrentPlayer.GetComponent(Player).Tokens[which]++; //Add token to current player
									player.GetComponent(Player).Tokens[which]++;
										if (CurrentGMan.GetComponent(Gentleman).Tokens > 1) {
											Coin.GetComponent(AudioSource).Play();
											CurrentGMan.GetComponent(Gentleman).Tokens=CurrentGMan.GetComponent(Gentleman).Tokens-2;
											CurrentGMan.GetComponent(Gentleman).highlight=false;
											GSelected = false; //flush GSelected
											Debug.Log("heart from " + CurrentGMan.name + " to " + player.name + " and Current Player");
											count = count+2; //increment count
										} 
										}else {
											Debug.Log("Please select another lady, you will automatically receive a token");
								}//end else if (fromPlayer)
								break;
							case "Player1":
							player = hit.transform.gameObject;
								if (GSelected && Master.CurrentPlayer != player) {
									Debug.Log("P1 selected");
									Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
									player.GetComponent(Player).Tokens[which]++;
										if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
											Coin.GetComponent(AudioSource).Play();
											CurrentGMan.GetComponent(Gentleman).Tokens=CurrentGMan.GetComponent(Gentleman).Tokens-2;
											CurrentGMan.GetComponent(Gentleman).highlight=false;
											GSelected = false; //flush GSelected
											Debug.Log("heart from " + CurrentGMan.name + " to " + player.name + " and Current Player");
											count = count+2; //increment count
										} 
										}else {
											Debug.Log("Please select another lady, you will automatically receive a token");
								}//end else if (fromPlayer)
								break;
							case "Player2":
								player = hit.transform.gameObject;
								if (GSelected && Master.CurrentPlayer != player) {
									Debug.Log("P2 selected");
									Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
									player.GetComponent(Player).Tokens[which]++;
										if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
											Coin.GetComponent(AudioSource).Play();
											CurrentGMan.GetComponent(Gentleman).Tokens=CurrentGMan.GetComponent(Gentleman).Tokens-2;
											CurrentGMan.GetComponent(Gentleman).highlight=false;
											GSelected = false; //flush GSelected
											Debug.Log("heart from " + CurrentGMan.name + " to " + player.name + " and Current Player");
											count = count+2; //increment count
										} 
										}else {
											Debug.Log("Please select another lady, you will automatically receive a token");
								}//end else if (fromPlayer)
								break;
							case "Player3":
								player = hit.transform.gameObject;
								if (GSelected && Master.CurrentPlayer != player) {
									Debug.Log("P3 selected");
									Master.CurrentPlayer.GetComponent(Player).Tokens[which]++;
									player.GetComponent(Player).Tokens[which]++;
										if (CurrentGMan.GetComponent(Gentleman).Tokens > 0) {
											Coin.GetComponent(AudioSource).Play();
											CurrentGMan.GetComponent(Gentleman).Tokens--;
											CurrentGMan.GetComponent(Gentleman).highlight=false;
											GSelected = false; //flush GSelected
											Debug.Log("heart from " + CurrentGMan.name + " to " + player.name + " and Current Player");
											count = count+2; //increment count
										} 
										}else {
											Debug.Log("Cannot select yourself, Please select a different lady");
								}//end else if (fromPlayer)
						}//end switch(hit.collider.name)
					}
				}
			} else { //once all 3 tokens have been moved
				Debug.Log("ending Suggestion Card play");
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
				count = 0;
				Master.cardPlayed = false;
				Master.turnEnd = true;
				debuglog = false;
			}//end else
		}
		
	}//end function Update()  ﻿#pragma strict

