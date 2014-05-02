#pragma strict

var Gentlemen : List.<GameObject>;
var GMan : GameObject;
var debuglog : boolean;
var which : int;
var count : int = 0;
var roll : int = 0;
var player : GameObject;
var fourth : GameObject;
var third : GameObject;
var second : GameObject;
var first : GameObject;
var selected : boolean = false;
var hasRolled : boolean = false;
var Players : List.<GameObject>;
var count2 : int = 0;
var sorted : boolean = false;
var accept : boolean = false;
var reject : boolean = false;

function OnGUI() {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 20) {
		if (GUI.Button(Rect(20, 70, 80, 20), "Dance!")) {
			if (selected && !hasRolled) {
				roll = Random.Range(1, 7);
				hasRolled = true;
			}
		}
	}
	
	if (count >= 4) {
		//if (player.GetComponent(Player).Family >= Mathf.Abs(GMan.GetComponent(Gentleman).VisibleValue / 2)) {
			if (GUI.Button(Rect(20, 70, 80, 20), "Accept")) {
				accept = true;
			//}
		}
		
		//if (player.GetComponent(Player).Family >= Mathf.Abs(GMan.GetComponent(Gentleman).VisibleValue / 2)) {
			if (GUI.Button(Rect(20, 100, 80, 20), "Reject")) {
				//player.GetComponent(Player).Family -= Mathf.Abs(GMan.GetComponent(Gentleman).VisibleValue / 2);
				reject = true;
			}
		//}
	}
}

function Update() {
	if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 20) {
		if (!debuglog) {
			Debug.Log("Grand Ball " + Master.GrandBallCount);
			debuglog = true;
			Master.TextLabel.GetComponent(GUIText).text = "";
		}
		
		if (count < 4) {
			Master.CurrentCard.GetComponent(SpriteRenderer).enabled = true;
			
			player = Master.Players[count];
			
			if (!selected) {
				if (player.GetComponent(Player).Tokens[0] >= player.GetComponent(Player).Tokens[1] && player.GetComponent(Player).Tokens[0] >= player.GetComponent(Player).Tokens[2]) {
					GMan = Gentlemen[0];
					which = 0;
					if (player.GetComponent(Player).Tokens[0] == player.GetComponent(Player).Tokens[1]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[1];
							which = 1;
						}
					} else if (player.GetComponent(Player).Tokens[0] == player.GetComponent(Player).Tokens[2]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[2];
							which = 2;
						}
					}
				} else if (player.GetComponent(Player).Tokens[1] >= player.GetComponent(Player).Tokens[0] && player.GetComponent(Player).Tokens[1] >= player.GetComponent(Player).Tokens[2]) {
					GMan = Gentlemen[1];
					which = 1;
					if (player.GetComponent(Player).Tokens[1] == player.GetComponent(Player).Tokens[0]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[0];
							which = 0;
						}
					} else if (player.GetComponent(Player).Tokens[1] == player.GetComponent(Player).Tokens[2]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[2];
							which = 2;
						}
					}
				} else if (player.GetComponent(Player).Tokens[2] >= player.GetComponent(Player).Tokens[0] && player.GetComponent(Player).Tokens[2] >= player.GetComponent(Player).Tokens[1]) {
					GMan = Gentlemen[2];
					which = 2;
					if (player.GetComponent(Player).Tokens[2] == player.GetComponent(Player).Tokens[0]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[0];
							which = 0;
						}
					} else if (player.GetComponent(Player).Tokens[2] == player.GetComponent(Player).Tokens[1]) {
						if (!Random.Range(0, 2)) {
							GMan = Gentlemen[1];
							which = 1;
						}
					}
				}
				Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(Master.TextLabel.GetComponent(GUIText).text + player.name + " press the Dance button to dance with " + GMan.name);
				selected = true;
			}//close if (!selected)
			
			if (hasRolled) {
				var i : int;
				switch (roll) {
					case 1:
						for (i = 0; i < 3; i++) {
							if (player.GetComponent(Player).Tokens[which] > 0) {
								player.GetComponent(Player).Tokens[which]--;
								GMan.GetComponent(Gentleman).Tokens++;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 1! You lose 3 Hearts. ");
							}
						}
						break;
					case 2:
						for (i = 0; i < 1; i++) {
							if (player.GetComponent(Player).Tokens[which] > 0) {
								player.GetComponent(Player).Tokens[which]--;
								GMan.GetComponent(Gentleman).Tokens++;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 2! You lose 1 Heart. ");
							}
						}
						break;
					case 5:
						for (i = 0; i < 1; i++) {
							if (GMan.GetComponent(Gentleman).Tokens > 0) {
								player.GetComponent(Player).Tokens[which]++;
								GMan.GetComponent(Gentleman).Tokens--;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 5! You win 1 Heart. ");
							}
						}
						break;
					case 6:
						for (i = 0; i < 3; i++) {
							if (GMan.GetComponent(Gentleman).Tokens > 0) {
								player.GetComponent(Player).Tokens[which]++;
								GMan.GetComponent(Gentleman).Tokens--;
								Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 6! You win 3 Hearts. ");
							}
						}
						break;
					case 3:
						Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 3. Nothing changes. ");
						break;
					case 4:
						Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " rolled a 4. Nothing changes. ");
						break;

				}//close switch(roll)
				hasRolled = false;
				selected = false;
				count++;
			}//close if (hasRolled)
		} else {
			
			
			matchMaking();
			
			first.GetComponent(Player).Ranking = 1;
			second.GetComponent(Player).Ranking = 2;
			third.GetComponent(Player).Ranking = 3;
			fourth.GetComponent(Player).Ranking = 4;
			
			
			Gentlemen[0].GetComponent(Gentleman).Ranking = 1;
			Gentlemen[1].GetComponent(Gentleman).Ranking = 2;
			Gentlemen[2].GetComponent(Gentleman).Ranking = 3;
			
			Application.LoadLevel("WinningScreen");
			/*
			second.SetActive(false);
			third.SetActive(false);
			fourth.SetActive(false);
			*/
			
			
		//close if (count < 4)
			/*
			Master.GrandBallCount++;
			
			if (Master.GrandBallCount < 3) {
				Debug.Log(Master.GrandBallCount);
				Master.CurrentCard.GetComponent(SpriteRenderer).enabled = false;
				//Master.CurrentCard.GetComponent(BoxCollider).enabled = false;
				//Master.CurrentCard.GetComponent(BoxCollider).size = Vector3(0, 0, 0);
				Master.CurrentCard.layer = 2;
				Master.CurrentCard.transform.position.z = 2;
				Master.CurrentCard = null;
				Master.cardPlayed = false;
				var turn : int = Master.turn;
				Master.Players[turn].transform.position = Vector3(-7.4, -4.3, 0);
				Master.Players[(turn + 1) % 4].transform.position = Vector3(7.9, 4.4, 0);
				Master.Players[(turn + 2) % 4].transform.position = Vector3(7.9, 2.3, -1);
				Master.Players[(turn + 3) % 4].transform.position = Vector3(7.9, 0.2, -2);
				debuglog = false;
			} else {//3 GrandBalls, move to Proposals
			*/
				
				/* if (count2 < 3) {
					if (!sorted) {
						SortGMen(); //sorts with the lowest VisibleValue first
						var index : int;
						var pIndex : int = 0;
						GMan = Gentlemen[count2];
						switch(GMan.name) {
							case "Gentleman0":
								index = 0;
								break;
							case "Gentleman1":
								index = 1;
								break;
							case "Gentleman2":
								index = 2;
								break;
						}
						SortPlayers(index);
						player = Players[pIndex];
						Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(GMan.name + " is proposing to " + player.name + ". You may accept or reject him.");
						sorted = true;
					}//end if (!sorted)
					
					if (accept) {
						Master.TextLabel.GetComponent(GUIText).text = Master.FormatString(player.name + " and " + GMan.name + " have been happily married!");
						Players.Remove(player);
						count2++;
						pIndex = 0;
						accept = false;
						sorted = false;
					} else if (reject) {
						pIndex++;
						if (pIndex >= Players.Count) {
							count2++;
							pIndex = 0;
							sorted = false;
						} else {
							player = Players[pIndex];
						}//end else
						reject = false;
					}//end else if (reject)
				}//end if (count2 < 3) */
			//}//end else
		}//end else
	}//end if (Master.cardPlayed && Master.CurrentCard.GetComponent(SocietyCard).id == 20)
}//end function Update()

function SortBest(){
	//var GentlemenPresort = [[0,Gentleman[0].GetComponent(Gentleman).TotalValue],[1,Gentleman[1].GetComponent(Gentleman).TotalValue],[2,Gentleman[2].GetComponent(Gentleman).TotalValue]];
	/*
	var tvg0 = Gentleman[0].GetComponent(Gentleman).TotalValue;
	var tvg1 = Gentleman[1].GetComponent(Gentleman).TotalValue;
	var tvg2 = Gentleman[2].GetComponent(Gentleman).TotalValue;
	var max = Math.max(tvg0,tvg1,tvg2);
	if (tvg0 == max){
	*/
	for (var i : int = 1; i < Gentlemen.Count; i++) {
		var x : GameObject = Gentlemen[i];
		var j : int = i;
		while (j > 0 && Gentlemen[j - 1].GetComponent(Gentleman).TotalValue < x.GetComponent(Gentleman).TotalValue) {
			Gentlemen[j] = Gentlemen[j - 1];
			j = j - 1;
		}
		Gentlemen[j] = x;
	}
}
	

function matchMaking(){
	var index5 : int = 2;
	Debug.Log("before sort");
	SortBest();
	
	switch (Gentlemen[0].transform.name){
		case "Gentleman0":
			index5 = 0;
			break;
		case "Gentleman1":
			index5 = 1;
			break;
		case "Gentleman2":
			index5 = 2;
			break;
	}
	Debug.Log("before sort"+index5.ToString());
	
	SortPlayers(index5);
	Debug.Log("after sort"+index5.ToString());
	first = Players[0];
	Debug.Log(Players[0].transform.name);
	Players.RemoveAt(0);
	
	switch (Gentlemen[1].transform.name){
		case "Gentleman0":
			index5 = 0;
			break;
		case "Gentleman1":
			index5 = 1;
			break;
		case "Gentleman2":
			index5 = 2;
			break;
	}
	Debug.Log("before sort"+index5.ToString());
	
	SortPlayers(index5);
	Debug.Log("after sort"+index5.ToString());
	second = Players[0];
	Debug.Log(Players[0].transform.name);
	Players.RemoveAt(0);
	
	switch (Gentlemen[2].transform.name){
		case "Gentleman0":
			index5 = 0;
			break;
		case "Gentleman1":
			index5 = 1;
			break;
		case "Gentleman2":
			index5 = 2;
			break;
	}
	Debug.Log("before sort"+index5.ToString());
	
	SortPlayers(index5);
	Debug.Log("after sort"+index5.ToString());
	third = Players[0];
	Debug.Log(Players[0].transform.name);
	Players.RemoveAt(0);
	
	fourth = Players[0];
	Debug.Log(Players[0].transform.name);
	
	
}


function SortGMen() {
	for (var i : int = 1; i < Gentlemen.Count; i++) {
		var x : GameObject = Gentlemen[i];
		var j : int = i;
		while (j > 0 && Gentlemen[j - 1].GetComponent(Gentleman).VisibleValue > x.GetComponent(Gentleman).VisibleValue) {
			Gentlemen[j] = Gentlemen[j - 1];
			j = j - 1;
		}
		Gentlemen[j] = x;
	}
}

function SortPlayers(f : int) {
	for (var i : int = 1; i < Players.Count; i++) {
		var x : GameObject = Players[i];
		var j : int = i;
		while (j > 0 && Players[j - 1].GetComponent(Player).Tokens[f] < x.GetComponent(Player).Tokens[f]) {
			Players[j] = Players[j - 1];
			j = j - 1;
		}
		Players[j] = x;
	}
}
