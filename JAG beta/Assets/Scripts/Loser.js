#pragma strict

var Player0 : GameObject;
var Player1 : GameObject;
var Player2 : GameObject;
var Player3 : GameObject;

var Gentleman0 : GameObject;
var Gentleman1 : GameObject;
var Gentleman2 : GameObject;
static var Players : GameObject[];
static var Gentlemen : GameObject[];

function Awake () {
	
	Player0 = GameObject.Find("Players/Player0");

	Player1 = GameObject.Find("Players/Player1");
	Player2 = GameObject.Find("Players/Player2");
	Player3 = GameObject.Find("Players/Player3");
	
	Gentleman0 = GameObject.Find("Gentlemen/Gentleman0");
	Gentleman1 = GameObject.Find("Gentlemen/Gentleman1");
	Gentleman2 = GameObject.Find("Gentlemen/Gentleman2");
	
	Destroy(Gentleman0);
	Destroy(Gentleman1);
	Destroy(Gentleman2);
	
	if (Player0.GetComponent(Player).Ranking == 4){
		Player0.transform.position = Vector3(-2, -3.5, -2);
		Player3.renderer.enabled = true;
	}else{
		Player0.renderer.enabled = false;
	}
	
	if (Player1.GetComponent(Player).Ranking == 4){
		Player1.transform.position = Vector3(-2, -3.5, -2);
		Player3.renderer.enabled = true;
	}else{
		Player1.renderer.enabled = false;
	}
	
	if (Player2.GetComponent(Player).Ranking == 4){
		Player2.transform.position = Vector3(-2, -3.5, -2);
		Player3.renderer.enabled = true;
	}else{
		Player2.renderer.enabled = false;
	}
	
	if (Player3.GetComponent(Player).Ranking == 4){
		Player3.transform.position = Vector3(-2, -3.5, -2);
		Player3.renderer.enabled = true;
	}else{
		Player3.renderer.enabled = false;
	}
	
	
	/*
	Player0.SetActive(false);
	Player1.SetActive(false);
	Player2.SetActive(false);
	Player3.SetActive(false);
	
	Gentleman0.SetActive(false);
	Gentleman1.SetActive(false);
	Gentleman2.SetActive(false);
	
	Players = [Player0, Player1, Player2, Player3];
	Gentlemen = [Gentleman0,Gentleman1,Gentleman2];
	*/
	
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
	Destroy(Player0);
	Destroy(Player1);
	Destroy(Player2);
	Destroy(Player3);
	
	Application.LoadLevel("start");
	}
}