#pragma strict


static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var debuglog : boolean; //stop infinite debug statements
var count : int = 0;
var G1Selected : boolean;
var G2Selected : boolean;
var F1Selected : boolean;
var F2Selected : boolean;
var G1 : GameObject;
var G2 : GameObject;
var F1Pos : Vector3;
var F1Scale : Vector3;
var Feature1 : GameObject;
var Feature2 : GameObject;
var index1 : int;
var index2 : int;

var GManBlowup : boolean;
var GManSelect : GameObject;
var tempPos : Vector3;
var tempPos1 : Vector3;

//for use with detecting mouse input
private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 10) {
		//debug statement
		if (!debuglog) {
			Debug.Log("Prejudice card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman to cause prejudice.");
		}
		
		if (count < 1) {
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Gentleman0":
							if (!G1Selected && !G2Selected) {
								G1 = hit.collider.gameObject;
								Debug.Log(G1.name + " as G1");
								Expand(hit.collider.gameObject);
								G1Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !F1Selected) {
								Collapse(hit.collider.gameObject);
								G1 = null;
								G1Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !G2Selected && G1 != hit.collider.gameObject) {
								G2 = hit.collider.gameObject;
								Debug.Log(G2.name + " as G2");
								Expand(hit.collider.gameObject);
								G2Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G2Selected && !F2Selected) {
								Collapse(hit.collider.gameObject);
								G2 = null;
								G2Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							}
							break;
						case "Gentleman1":
							if (!G1Selected && !G2Selected) {
								G1 = hit.collider.gameObject;
								Debug.Log(G1.name + " as G1");
								Expand(hit.collider.gameObject);
								G1Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !F1Selected) {
								Collapse(hit.collider.gameObject);
								G1 = null;
								G1Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !G2Selected && G1 != hit.collider.gameObject) {
								G2 = hit.collider.gameObject;
								Debug.Log(G2.name + " as G2");
								Expand(hit.collider.gameObject);
								G2Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G2Selected && !F2Selected) {
								Collapse(hit.collider.gameObject);
								G2 = null;
								G2Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							}
							break;
						case "Gentleman2":
							if (!G1Selected && !G2Selected) {
								G1 = hit.collider.gameObject;
								Debug.Log(G1.name + " as G1");
								Expand(hit.collider.gameObject);
								G1Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !F1Selected) {
								Collapse(hit.collider.gameObject);
								G1 = null;
								G1Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							} else if (G1Selected && !G2Selected && G1 != hit.collider.gameObject) {
								G2 = hit.collider.gameObject;
								Debug.Log(G2.name + " as G2");
								Expand(hit.collider.gameObject);
								G2Selected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select a feature card to swap out.");
								hit.collider.gameObject.GetComponent(Gentleman).highlight=true;
								Click.GetComponent(AudioSource).Play();
							} else if (G2Selected && !F2Selected) {
								Collapse(hit.collider.gameObject);
								G2 = null;
								G2Selected = false;
								hit.collider.gameObject.GetComponent(Gentleman).highlight=false;
								Click.GetComponent(AudioSource).Play();
							}
							break;
						case "FeatureCard":
							if (!hit.collider.gameObject.GetComponent(FeatureCard).faceup) {
								if (G1Selected && !G2Selected && !F1Selected) {
									Feature1 = hit.collider.gameObject;
									if (!Feature1.GetComponent(FeatureCard).faceup) {
										Debug.Log(G1.name + " " + Feature1.GetComponent(FeatureCard).value + " as F1");
										F1Selected = true;
										Click.GetComponent(AudioSource).Play();
										Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now select the other Gentleman to swap from.");
										index1 = G1.GetComponent(Gentleman).Features.IndexOf(Feature1);
										Collapse(G1);
										F1Pos = Feature1.transform.position;
										F1Scale = Feature1.transform.localScale;
									} else {
										Feature1 = null;
									}
								} else if (G2Selected && !F2Selected) {
									Feature2 = hit.collider.gameObject;
									if (!Feature2.GetComponent(FeatureCard).faceup) {
										Debug.Log(G2.name + " " + Feature2.GetComponent(FeatureCard).value + " as F2");
										F2Selected = true;
										Click.GetComponent(AudioSource).Play();
										index2 = G2.GetComponent(Gentleman).Features.IndexOf(Feature2);
										G2.GetComponent(Gentleman).Features[index2] = Feature1;
										G1.GetComponent(Gentleman).Features[index1] = Feature2;
										Feature2.transform.position = F1Pos;
										Feature2.transform.localScale = F1Scale;
										Collapse(G2);
										G1.GetComponent(Gentleman).highlight = false;
										G2.GetComponent(Gentleman).highlight = false;
										G1.GetComponent(Gentleman).TotalValue -= Feature1.GetComponent(FeatureCard).value;
										G1.GetComponent(Gentleman).TotalValue += Feature2.GetComponent(FeatureCard).value;
										G2.GetComponent(Gentleman).TotalValue -= Feature2.GetComponent(FeatureCard).value;
										G2.GetComponent(Gentleman).TotalValue += Feature1.GetComponent(FeatureCard).value;
										count++;
									} else {
										Feature2 = null;
									}
								}
							}
							break;
					}
				}
			}
		} else {
			Debug.Log("ending prejudice card play");
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			count = 0;
			G1Selected = false;
			G2Selected = false;
			F1Selected = false;
			F2Selected = false;
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
