#pragma strict

function Start () {

}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		Application.LoadLevel("start");
	}
}