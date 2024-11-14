/**
 * Simple batch comp and layer renamer
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function showui() {
	var e = new Window("dialog", "Batch Renamer", void 0);
	e.orientation = "column", e.alignChildren = "fill";
	var t = e.add("tabbedpanel");
	t.alignChildren = "fill";
	var r = t.add("tab", void 0, "Compositions");
	r.alignChildren = "left", r.add("group").preferredSize.height = 5;
	var a = r.add("group", void 0);
	a.orientation = "row", a.add("statictext", void 0, "Search for:").preferredSize.width = 70;
	var i = a.add("edittext", void 0, "");
	i.characters = 20;
	var d = r.add("group", void 0);
	d.orientation = "row", d.add("statictext", void 0, "Replace with:").preferredSize.width = 70;
	var o = d.add("edittext", void 0, "");
	o.characters = 20, r.add("group").preferredSize.height = 40;
	var n = r.add("group", void 0);
	n.orientation = "row", n.alignment = "center";
	var c = n.add("button", void 0, "Rename Comps"),
		v = n.add("button", void 0, "Close");
	r.add("group").preferredSize.height = 10;
	var s = r.add("statictext", void 0, "* Case-sensitive search");
	s.characters = 20, c.onClick = function() {
		var e = i.text,
			t = o.text,
			r = 0;
		if (e && t) {
			app.beginUndoGroup("Rename Compositions");
			for (var a = [], d = 1; d <= app.project.numItems; d++) {
				var n = app.project.item(d);
				n instanceof CompItem && n.name.includes(e) && a.push(n)
			}
			for (var c = 0; c < a.length; c++) a[c].name = a[c].name.split(e).join(t), r++;
			app.endUndoGroup(), s.text = r > 0 ? r + " compositions renamed." : "No comps found."
		} else s.text = "Fill in both fields."
	}, v.onClick = function() {
		e.close()
	};
	var p = t.add("tab", void 0, "Layers");
	p.alignChildren = "left", p.add("group").preferredSize.height = 5;
	var l = p.add("group", void 0);
	l.orientation = "row", l.add("statictext", void 0, "Search for:").preferredSize.width = 70;
	var $ = l.add("edittext", void 0, "");
	$.characters = 20;
	var h = p.add("group", void 0);
	h.orientation = "row", h.add("statictext", void 0, "Replace with:").preferredSize.width = 70;
	var u = h.add("edittext", void 0, "");
	u.characters = 20, p.add("group").preferredSize.height = 0;
	var f = p.add("checkbox", void 0, "Search entire project");
	p.add("group").preferredSize.height = 10;
	var m = p.add("group", void 0);
	m.orientation = "row", m.alignment = "center";
	var g = m.add("button", void 0, "Rename Layers"),
		x = m.add("button", void 0, "Close");
	p.add("group").preferredSize.height = 10;
	var w = p.add("statictext", void 0, "* Case-sensitive search");

	function C(e, t, r) {
		for (var a = 0, i = 1; i <= e.numLayers; i++) {
			var d = e.layer(i); - 1 !== d.name.indexOf(t) && (d.name = d.name.replace(t, r), a++)
		}
		return a
	}
	w.characters = 20, g.onClick = function() {
		var e = $.text,
			t = u.text,
			r = 0;
		if (e && t) {
			if (app.beginUndoGroup("Rename Layers"), f.value)
				for (var a = 1; a <= app.project.numItems; a++) {
					var i = app.project.item(a);
					i instanceof CompItem && (r += C(i, e, t))
				} else app.project.activeItem && app.project.activeItem instanceof CompItem ? r = C(app.project.activeItem, e, t) : w.text = "No active comp selected.";
			app.endUndoGroup(), w.text = r > 0 ? r + " layers renamed." : "No layers found."
		} else w.text = "Fill in both fields."
	}, x.onClick = function() {
		e.close()
	}, e.center(), e.show()
}
showui();
