#pragma strict

function Update () {
	if (this.transform.parent.GetComponent(Player).highlight) {
		this.GetComponent(SpriteRenderer).enabled = true;
	} else {
		this.GetComponent(SpriteRenderer).enabled = false;
	}
}