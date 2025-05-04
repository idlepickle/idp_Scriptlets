function showui() {
	var e = new Window("dialog", "Rename Compositions", void 0);
	(a = e.add("group")).spacing = 4, a.orientation = "row", a.alignment = "left", a.add("statictext", void 0, "Search for:").preferredSize.width = 70;
	var t = a.add("edittext", void 0, "");
	t.characters = 20, (b = e.add("group")).spacing = 4, b.orientation = "row", b.alignment = "left", b.add("statictext", void 0, "Replace with:").preferredSize.width = 70;
	var o = b.add("edittext", void 0, "");
	o.characters = 20, e.add("statictext", void 0, "").preferredSize.height = 4, (c = e.add("group")).orientation = "row", c.alignment = "center";
	var i = c.add("button", void 0, "Rename"),
		n = c.add("button", void 0, "Close");
	(d = e.add("group")).spacing = 4, d.orientation = "row", d.alignment = "left";
	var r = d.add("statictext", void 0, "* Case-sensitive search");
	r.characters = 30, i.onClick = function() {
		var e = t.text,
			i = o.text,
			n = 0;
		if (e && i) {
			app.beginUndoGroup("Rename Compositions");
			for (var s = 1; s <= app.project.numItems; s++) {
				var m = app.project.item(s);
				m instanceof CompItem && -1 !== m.name.indexOf(e) && (m.name = m.name.replace(e, i), n++)
			}
			app.endUndoGroup(), n > 0 ? r.text = n + " compositions renamed." : r.text = "No comps found."
		} else r.text = "Fill in both fields."
	}, n.onClick = function() {
		e.close()
	}, e.center(), e.show()
}
showui();
