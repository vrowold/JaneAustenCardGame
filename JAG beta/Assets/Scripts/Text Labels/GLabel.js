#pragma strict

var card : GameObject;

function Update () {
	if (Master.playerBlowup) {
		this.GetComponent(GUIText).text = "";
	} else {
		this.GetComponent(GUIText).text = card.GetComponent(Gentleman).Tokens.ToString();
	}
}