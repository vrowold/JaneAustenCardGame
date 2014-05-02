#pragma strict


static var Click : GameObject;
Click = GameObject.Find("Click");
static var Coin : GameObject;
Coin = GameObject.Find("Coin");
var count : int = 0;
var player : GameObject;
var GMan : GameObject;
var roll : int;
var which : int;
var GSelected : boolean = false;
var i : int;
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
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 7) {
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
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 7) {
		if (!debuglog) {
			Debug.Log("Drunken Declaration card");
			debuglog = true;
		}
		
		if (count < 4) {
			player = Master.Players[(count + 1) % 4];
			player.GetComponent(Player).highlight = true;
			Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Select a Gentleman.");
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
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman0 has been selected. Please press Roll.");
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								Click.GetComponent(AudioSource).Play();
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman0 has been selected. Please press Roll.");
								
							}
							which = 0;
							selected = true;
							break;
						case "Gentleman1":
							if (!GSelected) {
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman1 has been selected. Please press Roll.");
								GSelected = true;
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								Click.GetComponent(AudioSource).Play();
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman1 has been selected. Please press Roll.");
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
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman2 has been selected. Please press Roll.");
								
							} else {
								GMan.GetComponent(Gentleman).highlight = false;
								Click.GetComponent(AudioSource).Play();
								GMan = hit.transform.gameObject;
								GMan.GetComponent(Gentleman).highlight = true;
								Click.GetComponent(AudioSource).Play();
								GSelected = true;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString("Gentleman2 has been selected. Please press Roll.");
								
							}
							which = 2;
							selected = true;
							break;
						case "Player0":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									for (i = i; i > 0; i--) {
										if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
											otherPlayer.GetComponent(Player).Tokens[which]--;
											player.GetComponent(Player).Tokens[which]++;
											Coin.GetComponent(AudioSource).Play();
											Debug.Log(player.name + " gets a token from " + otherPlayer.name);
											Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " gets a token from " + otherPlayer.name);
										} else {
											break;
										}
									}
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player1":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									for (i = i; i > 0; i--) {
										if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
											otherPlayer.GetComponent(Player).Tokens[which]--;
											player.GetComponent(Player).Tokens[which]++;
											Coin.GetComponent(AudioSource).Play();
											Debug.Log(player.name + " gets a token from " + otherPlayer.name);
											Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " gets a token from " + otherPlayer.name);
										} else {
											break;
										}
									}
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player2":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									for (i = i; i > 0; i--) {
										if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
											otherPlayer.GetComponent(Player).Tokens[which]--;
											player.GetComponent(Player).Tokens[which]++;
											Coin.GetComponent(AudioSource).Play();
											Debug.Log(player.name + " gets a token from " + otherPlayer.name);
											Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " gets a token from " + otherPlayer.name);
										} else {
											break;
										}
									}
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
						case "Player3":
							otherPlayer = hit.transform.gameObject;
							if (fromPlayer && otherPlayer != player) {
								if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
									for (i = i; i > 0; i--) {
										if (otherPlayer.GetComponent(Player).Tokens[which] > 0) {
											otherPlayer.GetComponent(Player).Tokens[which]--;
											player.GetComponent(Player).Tokens[which]++;
											Coin.GetComponent(AudioSource).Play();
											Debug.Log(player.name + " gets a token from " + otherPlayer.name);
											Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " gets a token from " + otherPlayer.name);
										} else {
											break;
										}
									}
									fromPlayer = false;
									otherPlayer = null;
								}
							}
							break;
					}
				}
			}
			if (hasRolled && !done) {
				if (roll == 0) {
					for (i = 3; i > 0; i--) {
						if (player.GetComponent(Player).Tokens[which] > 0) {
							player.GetComponent(Player).Tokens[which]--;
							GMan.GetComponent(Gentleman).Tokens++;
							Debug.Log(player + " loses a token from " + GMan);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player + " loses a token from " + GMan);
						}
					}
				} else if (roll == 5) {
					for (i = 3; i > 0; i--) {
						if (GMan.GetComponent(Gentleman).Tokens > 0) {
							GMan.GetComponent(Gentleman).Tokens--;
							player.GetComponent(Player).Tokens[which]++;
							Debug.Log(player + " gains a token from " + GMan);
							Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player + " gains a token from " + GMan);
						} else {
							fromPlayer = true;
							break;
						}
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
			Debug.Log("end drunken declaration card");
			Master.CurrentPlayer.GetComponent(Player).Hand.Remove(Master.CurrentCard);
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
			Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
			Master.CurrentCard.layer = 2;
			Master.CurrentCard.transform.position.z = 2;
			count = 0;
			done = false;
			Master.cardPlayed = false;
			Master.turnEnd = true;
			debuglog = false;
		}
	}
}
