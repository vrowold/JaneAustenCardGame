#pragma strict

public class FamilyIcon extends MonoBehaviour {
	function Update() {
		if (Master.GManBlowup) {
			this.GetComponent(SpriteRenderer).enabled = false;
		} else {
			this.GetComponent(SpriteRenderer).enabled = true;
		}
	}
}