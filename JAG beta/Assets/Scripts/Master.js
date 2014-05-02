#pragma strict

import System.Collections.Generic;

//static var = can be accessed by other scripts
static var TextLabel : GameObject;
//static var = click sound
static var Click : GameObject;
var draw : int; //count of number of cards drawn during a turn
static var turn : int; //index to be used to determine which player is CurrentPlayer
static var Players : GameObject[]; //List of players for use with turn as an index
static var Gentlemen : GameObject[];
static var turnEnd : boolean; //signals end of turn
var turnStart : boolean; //signals beginning of turn
static var cardPlayed : boolean; //signals if a card has been played or not to prevent multiple actions
var hand : List.<GameObject>; //CurrentPlayer's Hand
static var CurrentPlayer : GameObject; //player who is taking a turn
static var CurrentCard : GameObject; //card selected to be played
var posAdjusted : boolean; //signals if player card positions have been adjusted
static var playerBlowup : boolean; //signals if someone is viewing a blown up version of player card
var draw1 : boolean;
var draw2 : boolean;
var tempPos : Vector3;
var tempPos1 : Vector3;
static var cardBlowup : boolean;
static var GManBlowup : boolean;
static var PlayerSelect : GameObject;
static var GManSelect : GameObject;
var hSliderValue : float = 0.0;

var SocietyDeck : List.<GameObject>; //drawable cards
var FeatureDeck : List.<GameObject>; //contain features for Gentlemen
var Deck : GameObject;
var DeckSize : Vector3 = Vector3(3.448333, 2.48, 1);
var CardSize : Vector3 = Vector3(2.48, 3.448333, 1);
//var VisibleDeck : List.<GameObject>; //swappable cards

//GrandBall cards
var GrandBall0 : GameObject;
var GrandBall1 : GameObject;
var GrandBall2 : GameObject;
static var GrandBallCount : int;

//Player objects
var Player0 : GameObject;
var Player1 : GameObject;
var Player2 : GameObject;
var Player3 : GameObject;

var Player0_view : GameObject;
var Player1_view : GameObject;
var Player2_view : GameObject;
var Player3_view : GameObject;

//Gentlemen objects
var GMan0 : GameObject;
var GMan1 : GameObject;
var GMan2 : GameObject;

//Gentlemen's Features
var G0_Features : List.<GameObject>;
var G1_Features : List.<GameObject>;
var G2_Features : List.<GameObject>;

//for use with Input clicks/touches UPDATE FOR IOS
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Awake() {
	DontDestroyOnLoad(GameObject.Find("Players"));
	DontDestroyOnLoad(GameObject.Find("Gentlemen"));
}

function OnGUI() {
	
	hSliderValue = GUI.HorizontalSlider (Rect (20, 15, 80, 30), hSliderValue, 0.0, 10.0);
	
	if (!turnStart) {
		if (GUI.Button(Rect(20, 40, 80, 20), "Take Turn")) {
			turnStart = true;
		}//end if (GUI.Button "Take Turn")
	}//end if (!turnStart)
	
	if (turnStart && !turnEnd && !cardPlayed && draw1 && !playerBlowup && !GManBlowup) {
		if (GUI.Button(Rect(20, 40, 80, 20), "End Turn")) {
			if (!cardBlowup) {
				turnEnd = true;
			}
		}//end if (GUI.Button "End Turn")
		if (draw1 && !draw2 && cardBlowup && CurrentPlayer.GetComponent(Player).Family >= CurrentCard.GetComponent(SocietyCard).cost) {
			if (GUI.Button(Rect(20, 70, 80, 20), "Play Card")) {
				CurrentPlayer.GetComponent(Player).Family -= CurrentCard.GetComponent(SocietyCard).cost;
				Deck.GetComponent(SpriteRenderer).enabled = false;
				Deck.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
				Deck.layer = 2;
				CurrentCard.transform.localScale = Vector3(1, 1, 0);
				cardPlayed = true;
				cardBlowup = false;
				for (card in hand) {
					if (card != CurrentCard) {
						card.transform.position.z = 1;
						card.GetComponent(SpriteRenderer).enabled = false;
						card.GetComponent(BoxCollider).enabled = false;
						card.layer = 2;
					}//end if (card != CurrentCard)
				}//end for (card in hand)
				
				CurrentCard.transform.position = Vector3(0, 0, -2);
			
				var x : float = -5.25;
				for (card in Players) {
					card.transform.position = Vector3(x, -4.3, -2);
					x += 3.5;
				}//end for (card in Players)
			}//end if (GUI.Button "Play Card")
		}//end if (draw1 && !draw2 &&...)
	}//end if (turnStart && !turnEnd)
}//end function OnGUI()

//runs at start of game
function Start () {
	Debug.Log("Game starting");
	//initialize control vars
	TextLabel = GameObject.Find("Background/TextLabel");
	draw = 0;
	turn = 0;
	GrandBallCount = 0;
	cardPlayed = false;
	turnEnd = false;
	Players = [Player0, Player1, Player2, Player3];
	CurrentPlayer = Players[turn];
	StackPlayers();
	Gentlemen = [GMan0, GMan1, GMan2];
	posAdjusted = false;
	playerBlowup = false;
	TextLabel.GetComponent(GUIText).text = FormatString("It is now " + Players[turn].gameObject.name + "'s turn.");

	//shuffle deck, deal 4 cards to all players, then shuffle Grand Balls into remaining deck
	SocietyDeck = ShuffleDeck(SocietyDeck);
	DealAllPlayers();
	SocietyDeckSetup();

	//set references to Gentlemen's Features
	G0_Features = GMan0.GetComponent(Gentleman).Features;
	G1_Features = GMan1.GetComponent(Gentleman).Features;
	G2_Features = GMan2.GetComponent(Gentleman).Features;
	
	Click = GameObject.Find("Click");

	//shuffle feature cards, place 3 on each Gentleman, set faceup to TRUE on 1
	DealFeatures();
	SetFeaturesTotals();
}//end function Start()

function Update () {
	titleCamera.GetComponent(AudioSource).volume = hSliderValue / 10.0;
	CurrentPlayer = Players[turn]; //set current player to index in array
	hand = CurrentPlayer.GetComponent(Player).Hand; //set var hand to player's Hand
	
	if (Input.GetMouseButtonDown(0) && !cardPlayed) {
		ray = titleCamera.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, hit)) {
			switch(hit.collider.name) {
				case "Gentleman0":
					Debug.Log("G0 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandGentleman(hit.collider.gameObject);
					break;
				case "Gentleman1":
					Debug.Log("G1 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandGentleman(hit.collider.gameObject);
					break;
				case "Gentleman2":
					Debug.Log("G2 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandGentleman(hit.collider.gameObject);
					break;
				case "Player0":
					Debug.Log("Player0 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandPlayer(hit.collider.gameObject);
					break;
				case "Player1":
					Debug.Log("Player1 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandPlayer(hit.collider.gameObject);
					break;
				case "Player2":
					Debug.Log("Player2 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandPlayer(hit.collider.gameObject);
					break;
				case "Player3":
					Debug.Log("Player3 clicked");
					Click.GetComponent(AudioSource).Play();
					ExpandPlayer(hit.collider.gameObject);
					break;
				case "SocietyCard":
					if (!cardBlowup && !playerBlowup && !GManBlowup && !turnEnd) {
						CurrentCard = hit.transform.gameObject;
						Debug.Log(CurrentCard.GetComponent(SocietyCard).id + " enlarge");
						tempPos = CurrentCard.transform.position;
						CurrentCard.transform.position = Vector3(0, 0, -5);
						CurrentCard.transform.localScale = Vector3(3, 3, 1);
						Deck.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
						Deck.layer = 2;
						cardBlowup = true;
					} else if (cardBlowup && !playerBlowup && !GManBlowup) {
						Debug.Log(CurrentCard.GetComponent(SocietyCard).id + " normal size");
						CurrentCard.transform.localScale = Vector3(1, 1, 0);
						CurrentCard.transform.position = tempPos;
						CurrentCard = null;
						cardBlowup = false;
						Deck.GetComponent(BoxCollider).size = DeckSize;
						Deck.layer = 0;
					}//end else if (cardBlowup && !playerBlowup)
			}//end switch(hit.collider.name)
		}//end if (Physics.Raycast(ray, hit))
	}//end if (Input.GetMouseButtonDown(0) && !cardPlayed)
	if (turnEnd) { //turn has ended
		if (hand.Count > 5) { //player ends turn with more than 6 cards in hand
			TextLabel.GetComponent(GUIText).text = FormatString("You have too many cards! Tap one to discard it.");
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "SocietyCard":
							var discard : GameObject = hit.transform.gameObject;
							hand.Remove(discard);
							discard.GetComponent(SpriteRenderer).enabled = false;
							discard.GetComponent(BoxCollider).enabled = false;
							discard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
							break;
					}//end switch(hit.collider.name)
				}//end if (Physics.Raycast(ray, hit))
			}//end if (Input.GetMouseButtonDown(0))
		} else {
			Debug.Log("turn ended for player " + turn);
			//CurrentPlayer.transform.position = Vector3(7.9, -1.9, -3); //move player's card to bottom of display stack
			//disable SpriteRenderer for this player's hand
			for (card in hand) {
				//card.transform.position.z = 1;
				card.GetComponent(SpriteRenderer).enabled = false;
				card.GetComponent(BoxCollider).enabled = false;
				card.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
				card.layer = 2;
			}
			//increment turn for next player index, mod by 4 to keep in range
			turn++;
			turn = turn % 4;
			StackPlayers();
			TextLabel.GetComponent(GUIText).text = FormatString("It is now " + Players[turn].gameObject.name + "'s turn.");
			//flush controls
			draw = 0;
			turnStart = false;
			posAdjusted = false;
			cardPlayed = false;
			draw1 = false;
			draw2 = false;
			turnEnd = false;
		}//end else
	}//end if (turnEnd)
	if (!cardBlowup && !cardPlayed && !GManBlowup && !playerBlowup) {
		Deck.GetComponent(SpriteRenderer).enabled = true;
		Deck.GetComponent(BoxCollider).size = DeckSize;
		Deck.layer = 0;
	}
	if (turnStart) {
		if (!turnEnd) { //while turn is not over
			//Debug.Log("player " + turn + " taking turn");

			//set player cards positions
			
			//store transform positions
			var x : float;
			var y : float;
			var z : float;
			if (!posAdjusted) { //use bool to stop additional increments in position
				CurrentPlayer.transform.position = Vector3(-7.4, -4.3, 0);
				for (card in Players) { //adjust each player's card except the current player
					if (card != CurrentPlayer) {
						x = card.transform.position.x;
						y = card.transform.position.y;
						z = card.transform.position.z;
						card.transform.position = Vector3(x, y+2.1, z+1);
					}
				}
				posAdjusted = true; //set to true to set additional position movements
			}//end if (!posAdjusted)

			//make hand visible
			
			if (!cardBlowup && !cardPlayed && !GManBlowup && !playerBlowup) {
				x = -4.5;
				for (card in hand) {
					card.layer = 0;
					card.GetComponent(SpriteRenderer).enabled = true; //enable rendering to make visible
					card.GetComponent(BoxCollider).enabled = true; //enable collider for touch
					card.GetComponent(BoxCollider).size = CardSize;
					card.transform.position = Vector3(x, -4.85, -1); //set display position
					x += 2.65;
				}
			}//end if (!cardBlowup && !cardPlayed)
			if (draw1 && !draw2) { //player has drawn a card and may play one card
			//if click Input is detected
				if (!cardPlayed) {
					TextLabel.GetComponent(GUIText).text = FormatString("You may draw another card and end your turn, play a card, or end your turn.");
				}
				if (Input.GetMouseButtonDown(0) && !cardPlayed && !playerBlowup && !GManBlowup) {
					//if (Input.touchCount == 1) { UPDATE FOR IOS
					//var touch : Touch = Input.touches[0];
					//cast ray to click position
					ray = titleCamera.ScreenPointToRay(Input.mousePosition);
					if (Physics.Raycast(ray, hit)) {
					//if (touch.phase == TouchPhase.Ended && Physics.Raycast(ray.origin, ray.direction,hit)) {
						//switch to detect if an Object is clicked
						switch(hit.collider.name) {
							case "Deck":
								DrawCard(CurrentPlayer);
								break;
						}
					}
				}//end if (Input.GetMouseButtonDown(0) && !cardPlayed && !playerBlowup)
			} else if(!draw1 && !playerBlowup && !cardBlowup && !GManBlowup && !cardPlayed) {
				TextLabel.GetComponent(GUIText).text = FormatString("Tap the deck to draw a card.");
				if (Input.GetMouseButtonDown(0)) {
					ray = titleCamera.ScreenPointToRay(Input.mousePosition);
					if (Physics.Raycast(ray, hit)) {
						switch(hit.collider.name) {
							case "Deck":
							DrawCard(CurrentPlayer);
								break;
						}
					}
				}
			}//end else if(!draw1 && !playerBlowup && !cardBlowup)
		}//end if (!turnEnd)
	}//end if (turnStart) 
}//end function Update()

/*TURN FUNCTIONS*/

//draws a card for the current player and increments control var draw
function DrawCard(player:GameObject) {
	if (SocietyDeck[0].name == "GrandBall") {
		Debug.Log("Grand Ball drawn");
		CurrentCard = SocietyDeck[0];
		Deck.GetComponent(SpriteRenderer).enabled = false;
		Deck.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		Deck.layer = 2;
		CurrentCard.transform.localScale = Vector3(1, 1, 0);
		cardPlayed = true;
		cardBlowup = false;
		for (card in hand) {
			card.transform.position.z = 1;
			card.GetComponent(SpriteRenderer).enabled = false;
			card.GetComponent(BoxCollider).enabled = false;
			card.layer = 2;
		}//end for (card in hand)
		
		CurrentCard.transform.position = Vector3(0, 0, -2);
			
		var x : float = -5.25;
		for (card in Players) {
			card.transform.position = Vector3(x, -4.3, -2);
			x += 3.5;
		}//end for (card in Players)
		
		SocietyDeck.RemoveAt(0);
		//ExecGrandBall();
	} else {
		Debug.Log("Player " + turn + " draws a card");
		ListPop(SocietyDeck, player.GetComponent(Player).Hand);
		draw++;
		draw1 = true;
	}
	//if player has drawn 2 cards, end turn
	if (draw >= 2) {
		draw2 = true;
		TextLabel.GetComponent(GUIText).text = FormatString("You have drawn two cards. End your turn when ready.");
	}
}

/*SOCIETY DECK FUNCTIONS*/

//initial setup for Society Deck
function SocietyDeckSetup() {
	//temporary variables for sub-decks
	var SDeck0 : List.<GameObject> = new List.<GameObject>();
	var SDeck1 : List.<GameObject> = new List.<GameObject>();
	var SDeck2 : List.<GameObject> = new List.<GameObject>();
	var SDeck3 : List.<GameObject> = new List.<GameObject>();
	//shuffle deck
	SocietyDeck = ShuffleDeck(SocietyDeck);
	//split deck into 4 sub-decks
	var count : int = SocietyDeck.Count / 4;
	for (var i : int = 0; i < count; i++) {
		ListPop(SocietyDeck, SDeck0);
	}
	for (i = 0; i < count; i++) {
		ListPop(SocietyDeck, SDeck1);
	}
	for (i = 0; i < count; i++) {
		ListPop(SocietyDeck, SDeck2);
	}
	while (SocietyDeck.Count > 0) {
		ListPop(SocietyDeck, SDeck3);
	}
	//shuffle a Grand Ball into 3 of the sub-decks
	SDeck1.Add(GrandBall0); SDeck2.Add(GrandBall1); SDeck3.Add(GrandBall2);
	SDeck1 = ShuffleDeck(SDeck1); SDeck2 = ShuffleDeck(SDeck2); SDeck3 = ShuffleDeck(SDeck3);
	//concatenate sub-decks back into main deck for finalized shuffled deck with 3 Grand Balls in lower 3/4 of deck
	SocietyDeck.AddRange(SDeck0); SocietyDeck.AddRange(SDeck1); SocietyDeck.AddRange(SDeck2); SocietyDeck.AddRange(SDeck3);
}

//deal 4 cards to each player at beginning of game
function DealAllPlayers() {
	for (var i:int = 0; i < 4; i++) {
		ListPop(SocietyDeck, Players[0].GetComponent(Player).Hand);
		ListPop(SocietyDeck, Players[1].GetComponent(Player).Hand);
		ListPop(SocietyDeck, Players[2].GetComponent(Player).Hand);
		ListPop(SocietyDeck, Players[3].GetComponent(Player).Hand);
	}
}

/*FEATURE CARDS FUNCTIONS*/

//deal 3 features to each Gentleman, set 1 to visible
function DealFeatures() {
	FeatureDeck = ShuffleDeck(FeatureDeck);
	//vars for card positions
	var x : float;
	var y : float;
	var z : float;
	var temp : GameObject;

	//pop 3 items from FeatureDeck into G0_Features
	x = -4.5;
	y = 2.95;
	z = -1;
	for (var i:int = 0; i < 3; i++) {
		ListPop(FeatureDeck, G0_Features);
		temp = G0_Features[G0_Features.Count - 1];
		temp.GetComponent(FeatureCard).parent = GMan0;
		temp.transform.position = Vector3(x, y, z);
		x++;
	}
	//set first feature's faceup to true and adjust initial VisibleValue
	G0_Features[0].GetComponent(FeatureCard).faceup = true;
	GMan0.GetComponent(Gentleman).VisibleValue += G0_Features[0].GetComponent(FeatureCard).value;


	x = -1;
	y = 2.95;
	z = -1;
	for (i = 0; i < 3; i++) {
		ListPop(FeatureDeck, G1_Features);
		temp = G1_Features[G1_Features.Count - 1];
		temp.GetComponent(FeatureCard).parent = GMan1;
		temp.transform.position = Vector3(x, y, z);
		x++;
	}
	G1_Features[0].GetComponent(FeatureCard).faceup = true;
	GMan1.GetComponent(Gentleman).VisibleValue += G1_Features[0].GetComponent(FeatureCard).value;


	x = 2.5;
	y = 2.95;
	z = -1;
	for (i = 0; i < 3; i++) {
		ListPop(FeatureDeck, G2_Features);
		temp = G2_Features[G2_Features.Count - 1];
		temp.GetComponent(FeatureCard).parent = GMan2;
		temp.transform.position = Vector3(x, y, z);
		x++;
	}
	G2_Features[0].GetComponent(FeatureCard).faceup = true;
	GMan2.GetComponent(Gentleman).VisibleValue += G2_Features[0].GetComponent(FeatureCard).value;
}

//sets Gentlemen's TotalValues after Feature cards are dealt
function SetFeaturesTotals() {
	for (var i:int = 0; i < 3; i++) {
		GMan0.GetComponent(Gentleman).TotalValue += G0_Features[i].GetComponent(FeatureCard).value;
	}
	for (i = 0; i < 3; i++) {
		GMan1.GetComponent(Gentleman).TotalValue += G1_Features[i].GetComponent(FeatureCard).value;
	}
	for (i = 0; i < 3; i++) {
		GMan2.GetComponent(Gentleman).TotalValue += G2_Features[i].GetComponent(FeatureCard).value;
	}
}

/*GENERAL DECK LIST FUNCTIONS*/

//randomizes a List.<GameObject> deck, returns deck
function ShuffleDeck(deck:List.<GameObject>) : List.<GameObject> {
	for (var i : int = deck.Count - 1; i > 0; i--) {
		var j : int = Mathf.Floor(Random.value * (i + 1));
		var temp : GameObject = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	return deck;
}

//removes first item from list1 and adds it to list2
public static function ListPop(list1:List.<GameObject>, list2:List.<GameObject>) {
	var temp : GameObject = list1[0];
	list1.RemoveAt(0);
	list2.Add(temp);
}

function StackPlayers() {
	Players[turn].transform.position = Vector3(7.9, 4.4, 0);
	Players[(turn + 1) % 4].transform.position = Vector3(7.9, 2.3, -1);
	Players[(turn + 2) % 4].transform.position = Vector3(7.9, 0.2, -2);
	Players[(turn + 3) % 4].transform.position = Vector3(7.9, -1.9, -3);
}

function ExpandPlayer(player : GameObject) {
	if (!playerBlowup && !cardBlowup && !GManBlowup) {
		Debug.Log(player.name + " enlarge");
		PlayerSelect = player;
		tempPos = player.transform.position;
		player.transform.position = Vector3(0, 0, -5);
		player.transform.localScale = Vector3(3, 3, 1);
		Deck.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		Deck.layer = 2;
		playerBlowup = true;
		for (card in hand) {
			card.GetComponent(SpriteRenderer).enabled = false;
			card.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		}
	} else if (playerBlowup && !cardBlowup && !GManBlowup && PlayerSelect == player) {
		Debug.Log(player.name + " normal size");
		player.transform.localScale = Vector3(1, 1, 0);
		player.transform.position = tempPos;
		playerBlowup = false;
		PlayerSelect = null;
		Deck.GetComponent(BoxCollider).size = DeckSize;
		Deck.layer = 0;
		for (card in hand) {
			card.GetComponent(BoxCollider).size = CardSize;
		}
	}//end else if (playerBlowup && !cardBlowup)
}

function ExpandGentleman(GMan : GameObject) {
	var features : List.<GameObject> = GMan.GetComponent(Gentleman).Features;
	var x : float;
	if (!playerBlowup && !cardBlowup && !GManBlowup) {
		Debug.Log(GMan.name + " enlarge");
		for (card in Players) {
			card.GetComponent(SpriteRenderer).enabled = false;
		}
		for (card in hand) {
			card.GetComponent(SpriteRenderer).enabled = false;
			card.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		}
		Deck.GetComponent(SpriteRenderer).enabled = false;
		Deck.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
		GManSelect = GMan;
		tempPos = GMan.transform.position;
		GMan.transform.position = Vector3(-6, 0, -5);
		GMan.transform.localScale = Vector3(2, 2, 1);
		tempPos1 = features[0].transform.position;
		x = -0.5;
		for (card in features) {
			card.transform.position = Vector3(x, 0, -5);
			card.transform.localScale = Vector3(3, 3, 1);
			x += 4;
		}
		GManBlowup = true;
	} else if (GManBlowup && !cardBlowup && !playerBlowup && GManSelect == GMan) {
		Debug.Log(GMan.name + " normal size");
		GMan.transform.localScale = Vector3(1, 1, 0);
		GMan.transform.position = tempPos;
		GManBlowup = false;
		GManSelect = null;
		x = tempPos1.x;
		for (card in features) {
			card.transform.position = Vector3(x, 2.95, tempPos1.z);
			card.transform.localScale = Vector3(1, 1, 0);
			x += 1;
		}
		Deck.GetComponent(SpriteRenderer).enabled = true;
		Deck.GetComponent(BoxCollider).size = DeckSize;
		for (card in Players) {
			card.GetComponent(SpriteRenderer).enabled = true;
		}
		for (card in hand) {
			card.GetComponent(BoxCollider).size = CardSize;
		}
	}
}

public static function FormatString(text : String) : String {
	var lineLength = 16;
	var words = text.Split(" "[0]);
	var result = "";
	
	for (var i = 0; i < words.length; i++) {
		var word = words[i].Trim();
		if (i == 0) {
			result = words[i];
		} else {
			result += " " + word;
		}
		
		//var size = Master.TextLabel.GetComponent(GUIText).GetScreenRect();
		
		if (result.Length > lineLength) {
			//Debug.Log(result.Length);
			result = result.Substring(0, result.Length - word.Length);
			result += "\n" + word;
			lineLength += 16;
		}
	}
	//Debug.Log(result);
	return result;
}
/*
function CardPlayedReposition() {
	for (card in hand) {
		if (card != CurrentCard) {
			card.GetComponent(SpriteRenderer).enabled = false;
			card.layer = 2;
		}
		
		CurrentCard.transform.position = Vector3(0, 0, -2);
		
		var x : float = -5.25;
		for (card in Players) {
			card.transform.position = Vector3(x, -4.3, -2);
			x += 3.5;
		}
	}
}*/
