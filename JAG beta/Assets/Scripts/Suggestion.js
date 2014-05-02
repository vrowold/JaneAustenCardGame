var CurrentGMan : GameObject; //selected Gentleman to have token taken from
var player : GameObject; //selected player to receive token
var GTokens : int; //CurrentGman's list of tokens
var PTokens : int; //player's list of tokens
var GSelected : boolean; //if a Gentleman has been selected
var G0 : boolean; //G0 has been selected
var G1 : boolean; //G1 has been selected
var G2 : boolean; //G2 has been selected
var count : int = 0; //how many times tokens have been moved
var which : int; //for moving token into player's correct token list

var debuglog : boolean; //stop infinite debug statements

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
//only called when a SocietyCard with id# 0 is played from Master script
if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 8) {
//debug statement
if (!debuglog) {
Debug.Log("Suggestion");
debuglog = true;
}
	if (count < 2) {
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
CurrentGMan = hit.transform.gameObject; //set CurrentGMan to selected GameObject
GTokens = CurrentGMan.GetComponent(Gentleman).Tokens; //get Gentleman's tokens list
GSelected = true; //don't allow another Gentleman to be selected until this is flushed
which = 0;
G0 = true; //Gentleman0 has been selected, no longer selectable
}
break;
case "Gentleman1":
if (!GSelected && !G1) {
Debug.Log("G1 selected");
CurrentGMan = hit.transform.gameObject;
GTokens = CurrentGMan.GetComponent(Gentleman).Tokens;
GSelected = true;
which = 1;
G1 = true;
}
break;
case "Gentleman2":
if (!GSelected && !G2) {
Debug.Log("G2 selected");
CurrentGMan = hit.transform.gameObject;
GTokens = CurrentGMan.GetComponent(Gentleman).Tokens;
GSelected = true;
which = 2;
G2 = true;
}
break;
}
}
}
}
}
}