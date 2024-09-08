/**
 * Adds a Blink or Flicker effect to selected layers.
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.1
 */
function addBlinkOrFlickerEffect(i, t, e, a, n, r) {
	t ? (app.beginUndoGroup("Add Flickering Effect"), i.opacity.expression = "prob = " + r + "; opacity_norm = " + n + "; x = random(prob); if (x <= 1) opacity = random(" + a + ", " + n + "); else opacity = opacity_norm;") : (app.beginUndoGroup("Add Blinking Effect"), i.opacity.expression = "br = " + e + "; n = Math.sin(time * br); n < 0 ? " + a + " : " + n + ";"), app.endUndoGroup()
}

function showUI() {
	var i = new Window("dialog", "Blinking/Flickering Effect"),
		t = i.add("checkbox", void 0, "Flicker Effect");
	t.value = !1, i.add("statictext", void 0, "Blinks per second:");
	var e = i.add("edittext", void 0, "12");
	e.characters = 5, i.add("statictext", void 0, "Minimum Opacity:");
	var a = i.add("edittext", void 0, "0");
	a.characters = 5, i.add("statictext", void 0, "Maximum Opacity:");
	var n = i.add("edittext", void 0, "100");
	n.characters = 5, i.add("statictext", void 0, "Probability (Lower flickers more):");
	var r = i.add("edittext", void 0, "24");
	r.characters = 5, r.enabled = !1, t.active = !0, t.onClick = function() {
		var i = t.value;
		e.enabled = !i, r.enabled = i
	};
	var c = i.add("group"),
		d = c.add("button", void 0, "OK"),
		o = c.add("button", void 0, "Cancel"),
		l = null;
	return d.onClick = function() {
		var c = parseFloat(e.text),
			d = parseFloat(a.text),
			o = parseFloat(n.text),
			$ = parseFloat(r.text),
			s = t.value;
		if (!s && (isNaN(c) || c <= 0)) {
			alert("Enter a valid frequency.");
			return
		}
		if (isNaN(d) || d < 0 || d > 100) {
			alert("Enter a valid minimum opacity (0-100).");
			return
		}
		if (isNaN(o) || o < 0 || o > 100) {
			alert("Enter a valid maximum opacity (0-100).");
			return
		}
		if (s && (isNaN($) || $ <= 0)) {
			alert("Enter a valid probability.");
			return
		}
		l = {
			isFlicker: s,
			blinkRate: c,
			minOpacity: d,
			maxOpacity: o,
			probability: $
		}, i.close()
	}, o.onClick = function() {
		l = null, i.close()
	}, i.center(), i.show(), l
}

function main() {
	var i = app.project.activeItem;
	if (!(i instanceof CompItem) || 0 === i.selectedLayers.length) {
		alert("Select layer(s) first.");
		return
	}
	var t = i.selectedLayers,
		e = showUI();
	if (null !== e)
		for (var a = 0; a < t.length; a++) addBlinkOrFlickerEffect(t[a], e.isFlicker, e.blinkRate, e.minOpacity, e.maxOpacity, e.probability)
}
main();
