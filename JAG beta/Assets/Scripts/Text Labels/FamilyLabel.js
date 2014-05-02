#pragma strict

var card : GameObject;

function Update () {
	if (Master.GManBlowup) {
		this.GetComponent(GUIText).text = "";
	} else {
		this.GetComponent(GUIText).text = card.GetComponent(Player).Family.ToString();
	}
}