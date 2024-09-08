/**
 * Adds a Blink or Flicker effect to selected layers.
 * Hold SHIFT in on run for Blink.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
! function e() {
	var n = app.project.activeItem;
	if (!(n && n instanceof CompItem)) {
		alert("Select a comp");
		return
	}
	var i = n.selectedLayers;
	if (0 === i.length) {
		alert("Select a layer");
		return
	}
	for (var r = ScriptUI.environment.keyboardState.shiftKey, t = 0, o = i.length; t < o; t++) {
		var a = i[t];
		r ? (app.beginUndoGroup("Add Blink"), a.opacity.expression = "blinkrate = 12;\nn = Math.sin(time*blinkrate);\nif (n < 0) 0;\nelse 100;") : (app.beginUndoGroup("Add Flicker"), a.opacity.expression = "probability = 24;\nopacity_norm = 100;\nx = random(probability);\nif (x <= 1) opacity = random(100);\nelse opacity = opacity_norm;")
	}
	app.endUndoGroup()
}();