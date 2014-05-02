#pragma strict

function Update () {
	if (this.transform.parent.GetComponent(Gentleman).highlight) {
		this.GetComponent(SpriteRenderer).enabled = true;
	} else {
		this.GetComponent(SpriteRenderer).enabled = false;
	}
}