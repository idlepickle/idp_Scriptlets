/**
 * Mass change compositions settings
 * (Resolution, FPS and Duration)
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function changeCompUI() {
	var e = new Window("dialog", "Change Comp Settings"),
		a = e.add("group");
	a.orientation = "row", a.alignment = "left";
	var o = a.add("checkbox", void 0, "Resolution");
	o.value = !1;
	var t = a.add("dropdownlist", void 0, ["Full", "Half", "Third", "Quarter"]);
	t.selection = 0;
	var n = e.add("group");
	n.orientation = "row", n.alignment = "left";
	var d = n.add("checkbox", void 0, "FPS");
	d.value = !1;
	var l = n.add("edittext", void 0, "25");
	l.characters = 5;
	var r = e.add("group");
	r.orientation = "row", r.alignment = "left";
	var i = r.add("checkbox", void 0, "Duration");
	i.value = !1;
	var v = r.add("dropdownlist", void 0, ["Change to", "Add on"]);
	v.selection = 0;
	var c = r.add("edittext", void 0, "5");
	c.characters = 5;
	var u = r.add("radiobutton", void 0, "sec"),
		s = r.add("radiobutton", void 0, "fr");
	u.value = !0, s.value = !1;
	var g = e.add("checkbox", void 0, "Apply to all Comps in Project");
	g.value = !1, g.alignment = "left";
	var h = e.add("group");
	h.alignment = "center";
	var f = h.add("button", void 0, "OK"),
		p = h.add("button", void 0, "Cancel");

	function $() {
		t.enabled = o.value, l.enabled = d.value, c.enabled = i.value, s.enabled = i.value, u.enabled = i.value, v.enabled = i.value
	}
	$(), o.onClick = $, d.onClick = $, i.onClick = $, f.onClick = function() {
		var a, n = t.selection.text,
			r = g.value,
			u = parseFloat(l.text),
			h = parseFloat(c.text),
			f = s.value,
			p = v.selection.text;
		switch (n) {
			case "Full":
			default:
				a = [1, 1];
				break;
			case "Half":
				a = [2, 2];
				break;
			case "Third":
				a = [3, 3];
				break;
			case "Quarter":
				a = [4, 4]
		}
		if (!o.value && !d.value && !i.value) {
			alert("Select at least one option to change.");
			return
		}
		changeCompSettings(o.value, a, d.value, u, i.value, h, f, p, r), e.close()
	}, p.onClick = function() {
		e.close()
	}, e.center(), e.show()
}

function changeCompSettings(e, a, o, t, n, d, l, r, i) {
	var v = app.project,
		c = v.selection,
		u = [];
	if (i)
		for (var s = 1; s <= v.numItems; s++) {
			var g = v.item(s);
			g instanceof CompItem && u.push(g)
		} else if (c.length > 0)
			for (var h = 0; h < c.length; h++) c[h] instanceof CompItem && u.push(c[h]);
	if (0 === u.length) {
		alert("No comp(s) selected.");
		return
	}
	app.beginUndoGroup("Change Comps Settings");
	for (var f = 0; f < u.length; f++) {
		var p = u[f];
		if (e && (p.resolutionFactor = a), o && !isNaN(t) && t > 0 && (p.frameRate = t), n && !isNaN(d) && d > 0) {
			var $ = 0,
				m = d;
			l && (m = d / p.frameRate), $ = "Add on" === r ? p.duration + m : m, p.duration = $
		}
	}
	app.endUndoGroup(), (e || o || n) && alert("Changes applied to " + u.length + " comp(s).")
}
changeCompUI();