#pragma strict

var Player0 : GameObject;
var Player1 : GameObject;
var Player2 : GameObject;
var Player3 : GameObject;
var first : GameObject;

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
	
	Destroy(GameObject.Find("Gentlemen/Gentleman0/TextLabel"));
	Destroy(GameObject.Find("Gentlemen/Gentleman0/Highlight"));
	Destroy(GameObject.Find("Gentlemen/Gentleman0/Heart"));
	
	Destroy(GameObject.Find("Gentlemen/Gentleman1/TextLabel"));
	Destroy(GameObject.Find("Gentlemen/Gentleman1/Highlight"));
	Destroy(GameObject.Find("Gentlemen/Gentleman1/Heart"));
	
	Destroy(GameObject.Find("Gentlemen/Gentleman2/TextLabel"));
	Destroy(GameObject.Find("Gentlemen/Gentleman2/Highlight"));
	Destroy(GameObject.Find("Gentlemen/Gentleman2/Heart"));
	
	Destroy(GameObject.Find("Players/Player0/Heart1"));
	Destroy(GameObject.Find("Players/Player0/Heart2"));
	Destroy(GameObject.Find("Players/Player0/Heart3"));
	Destroy(GameObject.Find("Players/Player0/Family"));
	Destroy(GameObject.Find("Players/Player0/FamilyLabel"));
	Destroy(GameObject.Find("Players/Player0/Highlight"));
	Destroy(GameObject.Find("Players/Player0/HeartLabel1"));
	Destroy(GameObject.Find("Players/Player0/HeartLabel2"));
	Destroy(GameObject.Find("Players/Player0/HeartLabel3"));
	Destroy(GameObject.Find("Players/Player0/TextLabel1"));
	Destroy(GameObject.Find("Players/Player0/TextLabel2"));
	Destroy(GameObject.Find("Players/Player0/TextLabel3"));
	
	Destroy(GameObject.Find("Players/Player1/Heart1"));
	Destroy(GameObject.Find("Players/Player1/Heart2"));
	Destroy(GameObject.Find("Players/Player1/Heart3"));
	Destroy(GameObject.Find("Players/Player1/Family"));
	Destroy(GameObject.Find("Players/Player1/FamilyLabel"));
	Destroy(GameObject.Find("Players/Player1/Highlight"));
	Destroy(GameObject.Find("Players/Player1/TextLabel1"));
	Destroy(GameObject.Find("Players/Player1/TextLabel2"));
	Destroy(GameObject.Find("Players/Player1/TextLabel3"));
	Destroy(GameObject.Find("Players/Player1/HeartLabel1"));
	Destroy(GameObject.Find("Players/Player1/HeartLabel2"));
	Destroy(GameObject.Find("Players/Player1/HeartLabel3"));
	
	Destroy(GameObject.Find("Players/Player2/Heart1"));
	Destroy(GameObject.Find("Players/Player2/Heart2"));
	Destroy(GameObject.Find("Players/Player2/Heart3"));
	Destroy(GameObject.Find("Players/Player2/Family"));
	Destroy(GameObject.Find("Players/Player2/FamilyLabel"));
	Destroy(GameObject.Find("Players/Player2/Highlight"));
	Destroy(GameObject.Find("Players/Player2/HeartLabel1"));
	Destroy(GameObject.Find("Players/Player2/HeartLabel2"));
	Destroy(GameObject.Find("Players/Player2/HeartLabel3"));
	Destroy(GameObject.Find("Players/Player2/TextLabel1"));
	Destroy(GameObject.Find("Players/Player2/TextLabel2"));
	Destroy(GameObject.Find("Players/Player2/TextLabel3"));
	
	Destroy(GameObject.Find("Players/Player3/Heart1"));
	Destroy(GameObject.Find("Players/Player3/Heart2"));
	Destroy(GameObject.Find("Players/Player3/Heart3"));
	Destroy(GameObject.Find("Players/Player3/Family"));
	Destroy(GameObject.Find("Players/Player3/FamilyLabel"));
	Destroy(GameObject.Find("Players/Player3/Highlight"));
	Destroy(GameObject.Find("Players/Player3/HeartLabel1"));
	Destroy(GameObject.Find("Players/Player3/HeartLabel2"));
	Destroy(GameObject.Find("Players/Player3/HeartLabel3"));
	Destroy(GameObject.Find("Players/Player3/TextLabel1"));
	Destroy(GameObject.Find("Players/Player3/TextLabel2"));
	Destroy(GameObject.Find("Players/Player3/TextLabel3"));
	
	if (Player0.GetComponent(Player).Ranking == 1){
		Player0.transform.position = Vector3(-2, -3.5, -2);
	}else{
		Player0.renderer.enabled = false;
	}
	
	if (Player1.GetComponent(Player).Ranking == 1){
		Player1.transform.position = Vector3(-2, -3.5, -2);
	}else{
		Player1.renderer.enabled = false;
	}
	
	if (Player2.GetComponent(Player).Ranking == 1){
		Player2.transform.position = Vector3(-2, -3.5, -2);
	}else{
		Player2.renderer.enabled = false;
	}
	
	if (Player3.GetComponent(Player).Ranking == 1){
		Player3.transform.position = Vector3(-2, -3.5, -2);
	}else{
		Player3.renderer.enabled = false;
	}
	
	if (Gentleman0.GetComponent(Gentleman).Ranking == 1){
		Gentleman0.transform.position = Vector3(1, -3.5, 1);
	}else{
		Gentleman0.renderer.enabled = false;
	}
	
	if (Gentleman1.GetComponent(Gentleman).Ranking == 1){
		Gentleman1.transform.position = Vector3(1, -3.5, 1);
	}else{
		Gentleman1.renderer.enabled = false;
	}
	
	if (Gentleman2.GetComponent(Gentleman).Ranking == 1){
		Gentleman2.transform.position = Vector3(1, -3.5, 1);
	}else{
		Gentleman2.renderer.enabled = false;
	}
	
	
	
	/*
	Player0.SetActive(false);
	Player1.SetActive(false);
	Player2.SetActive(false);
	Player3.SetActive(false);
	
	Gentleman0.SetActive(false);
	Gentleman1.SetActive(false);
	Gentleman2.SetActive(false);
	
	
	
	
	DontDestroyOnLoad(GameObject.Find("Players"));
	DontDestroyOnLoad(GameObject.Find("Gentlemen"));
	*/
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
	Application.LoadLevel("Married");
	}
}