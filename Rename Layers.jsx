/**
 * Simple mass layer renamer
 * through a simple UI.
 * (Does not seem to work for certain shape layers)
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function renameLayers(e, a, n) {
	var r = 0;

	function t(n) {
		for (var t = 1; t <= n.numLayers; t++) {
			var o = n.layer(t);
			o.name.trim().toLowerCase() === e.trim().toLowerCase() && (o.name = a, r++)
		}
	}
	if (n)
		for (var o = 1; o <= app.project.numItems; o++) {
			var i = app.project.item(o);
			i instanceof CompItem && t(i)
		} else {
			var d = app.project.activeItem;
			if (!(d instanceof CompItem)) {
				alert("No active composition selected.");
				return
			}
			t(d)
		}
	return r
}

function showUI() {
	var e = new Window("dialog", "Find and Rename Layers");
	e.add("statictext", void 0, "Find Layer Name:");
	var a = e.add("edittext", void 0, "");
	a.characters = 20, e.add("statictext", void 0, "New Layer Name:");
	var n = e.add("edittext", void 0, "");
	n.characters = 20;
	var r = e.add("checkbox", void 0, "Apply to entire project");
	r.value = !0, a.active = !0;
	var t = e.add("group"),
		o = t.add("button", void 0, "OK"),
		i = t.add("button", void 0, "Cancel"),
		d = {
			searchName: null,
			newName: null,
			searchAllComps: !1
		};
	return o.onClick = function() {
		var t = a.text,
			o = n.text,
			i = r.value;
		if ("" === t || "" === o) {
			alert("Please enter both the search name and new name.");
			return
		}
		d.searchName = t, d.newName = o, d.searchAllComps = i, e.close()
	}, i.onClick = function() {
		e.close()
	}, e.show(), d
}

function main() {
	app.beginUndoGroup("Find and Rename Layers");
	var e = showUI();
	if (null === e.searchName || null === e.newName) {
		app.endUndoGroup();
		return
	}
	var a = e.searchName,
		n = e.newName,
		r = renameLayers(a, n, e.searchAllComps);
	r > 0 ? alert(r + " layer(s) named '" + a + "' were renamed to '" + n + "'.") : alert("No layers with the name '" + a + "' were found."), app.endUndoGroup()
}
main();
