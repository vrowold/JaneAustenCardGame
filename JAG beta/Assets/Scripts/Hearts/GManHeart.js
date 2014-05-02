#pragma strict

public class GManHeart extends MonoBehaviour {
	function Update() {
		if (Master.playerBlowup) {
			this.GetComponent(SpriteRenderer).sortingLayerName = "Default";
		} else {
			this.GetComponent(SpriteRenderer).sortingLayerName = "Hearts";
		}
	}
}