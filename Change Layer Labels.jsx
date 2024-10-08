/**
 * Searches for specified layers to apply a new label color
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function changeLayerColor(e, a, r) {
	var o = 0;

	function t(r) {
		for (var t = 1; t <= r.numLayers; t++) {
			var l = r.layer(t);
			l.name.trim().toLowerCase() === e.trim().toLowerCase() && (l.label = a, o++)
		}
	}
	if (r)
		for (var l = 1; l <= app.project.numItems; l++) {
			var n = app.project.item(l);
			n instanceof CompItem && t(n)
		} else {
			var i = app.project.activeItem;
			if (!(i instanceof CompItem)) return alert("No active composition selected."), 0;
			t(i)
		}
	return o
}

function showUI() {
	var e = new Window("dialog", "Change Layer Label Colors");
	e.add("statictext", void 0, "Find Layer Name:");
	var a = e.add("edittext", void 0, "");
	a.characters = 20, e.add("statictext", void 0, "Label Color Index (0-16):");
	var r = e.add("edittext", void 0, "1");
	r.characters = 5;
	var o = e.add("checkbox", void 0, "Apply to entire project");
	o.value = !0, a.active = !0;
	var t = e.add("group"),
		l = t.add("button", void 0, "OK"),
		n = t.add("button", void 0, "Cancel"),
		i = {
			layerName: null,
			labelColor: null,
			searchAllComps: !1
		};
	return l.onClick = function() {
		var t = a.text,
			l = parseInt(r.text, 10),
			n = o.value;
		if ("" === t) {
			alert("Layer name is required.");
			return
		}
		if (isNaN(l) || l < 0 || l > 16) {
			alert("Label Color Index must be between 0 and 16.");
			return
		}
		i.layerName = t, i.labelColor = l, i.searchAllComps = n, e.close()
	}, n.onClick = function() {
		e.close()
	}, e.show(), i
}

function main() {
	app.beginUndoGroup("Change Layer Label Colors");
	var e = showUI();
	if (null === e.layerName || null === e.labelColor) {
		app.endUndoGroup();
		return
	}
	var a, r = e.layerName,
		o = changeLayerColor(r, e.labelColor, e.searchAllComps);
	o > 0 ? alert(o + " layer(s) named '" + r + "' had their label color changed.") : alert("No layers with the name '" + r + "' were found."), app.endUndoGroup()
}
main();
