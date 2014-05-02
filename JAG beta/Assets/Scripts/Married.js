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
	
	if (Player0.GetComponent(Player).Ranking == 2){
		Player0.transform.position = Vector3(-4, -3.5, -2);
		Player0.renderer.enabled = true;
	}else if (Player0.GetComponent(Player).Ranking == 3){
		Player0.transform.position = Vector3(2.5, -3.5, -2);
		Player0.renderer.enabled = true;
	}else{
		Player0.renderer.enabled = false;
	}
	
	if (Player1.GetComponent(Player).Ranking == 2){
		Player1.transform.position = Vector3(-4, -3.5, -2);
		Player1.renderer.enabled = true;
	}else if (Player0.GetComponent(Player).Ranking == 3){
		Player1.transform.position = Vector3(2.5, -3.5, -2);
		Player1.renderer.enabled = true;
	}else{
		Player1.renderer.enabled = false;
	}
	
	if (Player2.GetComponent(Player).Ranking == 2){
		Player2.transform.position = Vector3(-4, -3.5, -2);
		Player2.renderer.enabled = true;
	}else if (Player2.GetComponent(Player).Ranking == 3){
		Player2.transform.position = Vector3(2.5, -3.5, -2);
		Player2.renderer.enabled = true;
	}else{
		Player2.renderer.enabled = false;
	}
	
	if (Player3.GetComponent(Player).Ranking == 2){
		Player3.transform.position = Vector3(-4, -3.5, -2);
		Player3.renderer.enabled = true;
	}else if (Player0.GetComponent(Player).Ranking == 3){
		Player3.transform.position = Vector3(2.5, -3.5, -2);
		Player3.renderer.enabled = true;
	}else{
		Player3.renderer.enabled = false;
	}





		
	if (Gentleman0.GetComponent(Gentleman).Ranking == 2){
		Gentleman0.transform.position = Vector3(-1, -3.5, 1);
		Gentleman0.renderer.enabled = true;
	}else if (Gentleman0.GetComponent(Gentleman).Ranking == 3){
		Gentleman0.transform.position = Vector3(5.5, -3.5, 1);
		Gentleman0.renderer.enabled = true;}
	else{
		Gentleman0.renderer.enabled = false;
	}
	
	if (Gentleman1.GetComponent(Gentleman).Ranking == 2){
		Gentleman1.transform.position = Vector3(-1, -3.5, 1);
		Gentleman1.renderer.enabled = true;
	}
	else if (Gentleman1.GetComponent(Gentleman).Ranking == 3){
		Gentleman1.transform.position = Vector3(5.5, -3.5, 1);
		Gentleman1.renderer.enabled = true;}
	else{
		Gentleman1.renderer.enabled = false;
	}
	
	if (Gentleman2.GetComponent(Gentleman).Ranking == 2){
		Gentleman2.transform.position = Vector3(-1, -3.5, 1);
		Gentleman2.renderer.enabled = true;
	}else if (Gentleman2.GetComponent(Gentleman).Ranking == 3){
		Gentleman2.transform.position = Vector3(5.5, -3.5, 1);
		Gentleman2.renderer.enabled = true;}
	else{
		Gentleman2.renderer.enabled = false;
	}
	
	
		

	


	/*
	Player0.SetActive(true);
	
	
	Players = [Player0, Player1, Player2, Player3];
	Gentlemen = [Gentleman0,Gentleman1,Gentleman2];
	
	
	DontDestroyOnLoad(GameObject.Find("Players"));
	DontDestroyOnLoad(GameObject.Find("Gentlemen"));
	*/
	
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
	Application.LoadLevel("Loser");
	}
}