/**
 * Mass change compositions background color
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function changeCompBG(o, e, n) {
	function r(e) {
		e.bgColor = o
	}
	if (n)
		for (var a = 1; a <= app.project.numItems; a++) {
			var t = app.project.item(a);
			t instanceof CompItem && r(t)
		} else
			for (var a = 0; a < e.length; a++) {
				var l = e[a];
				l instanceof CompItem && r(l)
			}
}

function hexToRgb(o) {
	var e = parseInt(o = o.replace("#", ""), 16);
	return [(e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (255 & e) / 255]
}

function showUI() {
	var o = new Window("dialog", "Change Comp BG Color");
	o.add("statictext", void 0, "BG Color (Hex value omit #):");
	var e = o.add("edittext", void 0, "ffffff");
	e.characters = 10;
	var n = o.add("checkbox", void 0, "Apply to all comps in project");
	n.value = !1, e.active = !0;
	var r = o.add("group"),
		a = r.add("button", void 0, "OK"),
		t = r.add("button", void 0, "Cancel"),
		l = {
			hexColor: null,
			applyToAll: !1
		};
	return a.onClick = function() {
		var r = e.text,
			a = n.value;
		if (!/^([0-9A-F]{3}){1,2}$/i.test(r)) {
			alert("Please enter a valid hex color value.");
			return
		}
		l.hexColor = r, l.applyToAll = a, o.close()
	}, t.onClick = function() {
		o.close()
	}, o.show(), l
}

function main() {
	app.beginUndoGroup("Change Comp BG Color");
	var o = app.project.selection,
		e = showUI();
	if (null === e.hexColor) {
		app.endUndoGroup();
		return
	}
	var n = hexToRgb(e.hexColor),
		r = e.applyToAll;
	if (0 === o.length && !r) {
		alert("Select comp(s) in the Project window."), app.endUndoGroup();
		return
	}
	changeCompBG(n, o, r), app.endUndoGroup()
}
main();
