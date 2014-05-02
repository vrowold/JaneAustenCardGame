#pragma strict

import System.Collections.Generic;

var SocietyDeck : List.<GameObject>;
var SDeck0 : List.<GameObject>;
var SDeck1 : List.<GameObject>;
var SDeck2 : List.<GameObject>;
var SDeck3 : List.<GameObject>;
var GrandBall0 : GameObject;
var GrandBall1 : GameObject;
var GrandBall2 : GameObject;

//runs at start of game
function Start () {
	SocietyDeckSetup();
}

function Update () {

}

//initial setup for Society Deck
function SocietyDeckSetup() {
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
function ListPop(list1:List.<GameObject>, list2:List.<GameObject>) {
	var temp : GameObject = list1[0];
	list1.RemoveAt(0);
	list2.Add(temp);
}