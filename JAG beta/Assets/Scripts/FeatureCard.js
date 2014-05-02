#pragma strict

var FaceDown : GameObject;

public class FeatureCard extends MonoBehaviour {
	var value : int;
	var faceup : boolean;
	var parent : GameObject;
	
	function Start() {
		FaceDown = this.transform.Find("FaceDown").gameObject;
	}
	
	function Update() {
		if (!faceup) {
			FaceDown.GetComponent(SpriteRenderer).enabled = true;
			this.transform.gameObject.GetComponent(SpriteRenderer).enabled = false;
		} else {
			FaceDown.GetComponent(SpriteRenderer).enabled = false;
			this.transform.gameObject.GetComponent(SpriteRenderer).enabled = true;
		}
	}
}