/**
 * Mass change compositions settings
 * (Background Color, Resolution, FPS and Duration)
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0 - Initial release.
 * @version 1.1 - Added option to change Comp background color.
 */
function showui() {
	var e = new Window("dialog", "Batch Change Comp(s) Settings"),
		a = e.add("group");
	a.orientation = "row", a.alignment = "left";
	var o = a.add("checkbox", void 0, "BG Color #");
	o.value = !1;
	var t = a.add("edittext", void 0, "ffffff");
	t.characters = 8;
	var n = e.add("group");
	n.orientation = "row", n.alignment = "left";
	var l = n.add("checkbox", void 0, "Resolution");
	l.value = !1;
	var r = n.add("dropdownlist", void 0, ["Full", "Half", "Third", "Quarter"]);
	r.selection = 0;
	var d = e.add("group");
	d.orientation = "row", d.alignment = "left";
	var i = d.add("checkbox", void 0, "FPS");
	i.value = !1;
	var v = d.add("edittext", void 0, "25");
	v.characters = 5;
	var u = e.add("group");
	u.orientation = "row", u.alignment = "left";
	var c = u.add("checkbox", void 0, "Duration");
	c.value = !1;
	var s = u.add("dropdownlist", void 0, ["Change to", "Add on"]);
	s.selection = 0;
	var f = u.add("edittext", void 0, "5");
	f.characters = 5;
	var h = u.add("radiobutton", void 0, "sec"),
		g = u.add("radiobutton", void 0, "fr");
	h.value = !0, g.value = !1;
	var p = e.add("checkbox", void 0, "Apply to all Comps in Project");
	p.value = !1, p.alignment = "left";
	var $ = e.add("group");
	$.alignment = "center";
	var b = $.add("button", void 0, "Apply"),
		m = $.add("button", void 0, "Close");

	function C() {
		t.enabled = o.value, r.enabled = l.value, v.enabled = i.value, f.enabled = c.value, g.enabled = c.value, h.enabled = c.value, s.enabled = c.value
	}
	C(), o.onClick = C, l.onClick = C, i.onClick = C, c.onClick = C, b.onClick = function() {
		var a, n = t.text,
			d = r.selection.text,
			u = p.value,
			h = parseFloat(v.text),
			$ = parseFloat(f.text),
			b = g.value,
			m = s.selection.text;
		switch (d) {
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
		if (o.value && !/^([0-9A-F]{3}){1,2}$/i.test(n)) {
			alert("Invalid hex value.");
			return
		}
		if (!o.value && !l.value && !i.value && !c.value) {
			alert("No option selected.");
			return
		}
		changecompset(o.value, n, l.value, a, i.value, h, c.value, $, b, m, u), e.close()
	}, m.onClick = function() {
		e.close()
	}, e.center(), e.show()
}

function hextorgb(e) {
	var a = parseInt(e = e.replace("#", ""), 16);
	return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255]
}

function changecompset(e, a, o, t, n, l, r, d, i, v, u) {
	var c = app.project,
		s = c.selection,
		f = [];
	if (u)
		for (var h = 1; h <= c.numItems; h++) {
			var g = c.item(h);
			g instanceof CompItem && f.push(g)
		} else if (s.length > 0)
			for (var p = 0; p < s.length; p++) s[p] instanceof CompItem && f.push(s[p]);
	if (0 === f.length) {
		alert("No comp(s) selected.");
		return
	}
	app.beginUndoGroup("Change Comps Settings");
	for (var $ = 0; $ < f.length; $++) {
		var b = f[$];
		if (e) {
			var m = hextorgb(a);
			b.bgColor = m
		}
		if (o && (b.resFactor = t), n && !isNaN(l) && l > 0 && (b.frameRate = l), r && !isNaN(d) && d > 0) {
			var C = 0,
				x = d;
			i && (x = d / b.frameRate), C = "Add on" === v ? b.duration + x : x, b.duration = C
		}
	}
	app.endUndoGroup(), (e || o || n || r) && (f.length > 1 ? alert("Changes applied to " + f.length + " comps.") : alert("Changes applied to " + f.length + " comp."))
}
showui();
