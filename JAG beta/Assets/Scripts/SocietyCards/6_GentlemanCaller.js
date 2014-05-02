#pragma strict

static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var count : int = 0;
var player : GameObject;
var GMan : GameObject;
var roll : int;
var GSelected : boolean = false;
var which : int;
var done : boolean = false;

var fromPlayer : boolean = false;
var otherPlayer : GameObject;

var selected : boolean = false;
var hasRolled : boolean = false;

var debuglog : boolean;

private var hit : RaycastHit;
private var ray : Ray;
var titleCamera : Camera;

function OnGUI() {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 6) {
		if (selected && !hasRolled) {
			if (GUI.Button(Rect(20, 70, 80, 20), "Roll")) {
				roll = Random.Range(0, 6);
				if (player == Master.CurrentPlayer) {
					roll++;
					if (roll > 5) {
						roll = 5;
					}
				}
				hasRolled = true;
			}
		}
	}
}

function Update () {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 6) {
		if (!debuglog) {
			Debug.Log("Gentleman Caller card");
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman.");
		}
		
		if (count < 4) {
			player = Master.Players[(count + 1) % 4];
			player.GetComponent(Player).highlight = true;
			if (Input.GetMouseButtonDown(0)) {
				ray = titleCamera.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, hit)) {
					switch(hit.collider.name) {
						case "Gentleman0":
							if (!GSelected) {
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							}
							which = 0;
							selected = true;
							break;
						case "Gentleman1":
							if (!GSelected) {
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							}
							which = 1;
							selected = true;
							break;
						case "Gentleman2":
							if (!GSelected) {
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								Click.GetComponent(AudioSource).Play();
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Now press Roll to gain or lose Hearts.");
							}
							which = 2;
							selected = true;
							break;
						case "Player0":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player1":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player2":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player3":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									otherPlayer.GetComponent(Player).Tokens[which]--;
									player.GetComponent(Player).Tokens[which]++;
									Coin.GetComponent(AudioSource).Play();
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
					}
				}
			}
			if (hasRolled && !done) {
				if (roll < 4) {
					if (player.GetComponent(Player).Tokens[which] > 0) {
						GMan.GetComponent(Gentleman).Tokens++;
						player.GetComponent(Player).Tokens[which]--;
						Coin.GetComponent(AudioSource).Play();
						Debug.Log(player + " loses a token from " + GMan);
					}
				} else {
					if (GMan.GetComponent(Gentleman).Tokens > 0) {
						GMan.GetComponent(Gentleman).Tokens--;
						player.GetComponent(Player).Tokens[which]++;
						Coin.GetComponent(AudioSource).Play();
						Debug.Log(player + " gains a token from " + GMan);
					} else {
						fromPlayer = true;
					}
				}
				done = true;
			} else if (done && !fromPlayer) {
				GMan.GetComponent(Gentleman).highlight = false;
				player.GetComponent(Player).highlight = false;
				count++;
				selected = false;
				hasRolled = false;
				GSelected = false;
				done = false;
			}
		} else {
			Debug.Log("end gentleman caller card");
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			count = 0;
			done = false;
			fromPlayer = false;
			selected = false;
			hasRolled = false;
			GSelected = false;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
	}
}
