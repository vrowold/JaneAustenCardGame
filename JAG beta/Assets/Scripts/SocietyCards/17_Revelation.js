#pragma strict

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");

var debuglog : boolean; //stop infinite debug statements
var count : int = 0;
var GManBlowup : boolean;
var GManSelect : GameObject;
var featureFaceup : boolean = false;
var tempPos : Vector3;
var tempPos1 : Vector3;
var card : GameObject;
var GSelected : boolean;

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 17) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Revelation card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman.");
		}
		
		if (count < 1) {
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				//Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman.");
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Gentleman0":
							if (!GSelected) {
								Expand(hit.collider.gameObject);
								GSelected = true;
								Click.GetComponent(AudioSource).Play();
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card.");
							} else {
								Collapse(hit.collider.gameObject);
								GSelected = false;
								Click.GetComponent(AudioSource).Play();
							}
							if (featureFaceup) {
								GManSelect.GetComponent(Gentleman).VisibleValue += card.GetComponent(FeatureCard).value;
								count++;
							}
							break;
						case "Gentleman1":
							if (!GSelected) {
								Expand(hit.collider.gameObject);
								GSelected = true;
								Click.GetComponent(AudioSource).Play();
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card.");
							} else {
								Collapse(hit.collider.gameObject);
								GSelected = false;
								Click.GetComponent(AudioSource).Play();
							}
							if (featureFaceup) {
								GManSelect.GetComponent(Gentleman).VisibleValue += card.GetComponent(FeatureCard).value;
								count++;
							}
							break;
						case "Gentleman2":
							if (!GSelected) {
								Expand(hit.collider.gameObject);
								GSelected = true;
								Click.GetComponent(AudioSource).Play();
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card.");
							} else {
								Collapse(hit.collider.gameObject);
								GSelected = false;
								Click.GetComponent(AudioSource).Play();
							}
							if (featureFaceup) {
								GManSelect.GetComponent(Gentleman).VisibleValue += card.GetComponent(FeatureCard).value;
								count++;
							}
							break;
						case "FeatureCard":
							if (GManBlowup && !featureFaceup) {
								card = hit.transform.gameObject;
								if (!card.GetComponent(FeatureCard).faceup) {
									card.GetComponent(FeatureCard).faceup = true;
									featureFaceup = true;
									Click.GetComponent(AudioSource).Play();
								}
							}
							break;
					}
				}
			}
		} else {
			Debug.Log("ending revelation card play");
			//remove the LoveCard that was played, make it invisible, and unclickable
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			count = 0;
			GManBlowup = false;
			GSelected = false;
			featureFaceup = false;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
	}
}

function Expand(GMan : GameObject) {
	var features : List.<GameObject> = GMan.GetComponent(Gentleman).Features;
	var x : float;
	if (!GManBlowup) {
		Debug.Log(GMan.name + " enlarge");
		Master.GManBlowup = true;
		for (card in Master.Players) {
			card.GetComponent(SpriteRenderer).enabled = false;
		}
		Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
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
	}
}

function Collapse(GMan : GameObject) {
	var features : List.<GameObject> = GMan.GetComponent(Gentleman).Features;
	var x : float;
	if (GManBlowup && GManSelect == GMan) {
		Debug.Log(GMan.name + " normal size");
		Master.GManBlowup = false;
		GMan.transform.localScale = Vector3(1, 1, 0);
		GMan.transform.position = tempPos;
		GManBlowup = false;
		x = tempPos1.x;
		for (card in features) {
			card.transform.position = Vector3(x, 2.95, tempPos1.z);
			card.transform.localScale = Vector3(1, 1, 0);
			x += 1;
		}
		for (card in Master.Players) {
			card.GetComponent(SpriteRenderer).enabled = true;
		}
	}
}
