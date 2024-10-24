/**
 * Mass change compositions settings
 * (Background Color, Resolution, FPS and Duration)
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0 - Initial release.
 * @version 1.1 - Added option to change Comp background color.
 * @version 1.2 - Added option to change Comp dimensions + FPS dropdown + bugfixes.
 */
function showui() {
	var e = new Window("dialog", "Batch Change Comp(s) Settings"),
		a = e.add("group");
	a.spacing = 4, a.orientation = "row", a.alignment = "left";
	var t = a.add("checkbox", void 0, "BG Color #");
	t.size = [80, 14], t.value = !1;
	var o = a.add("edittext", void 0, "ffffff");
	o.characters = 8;
	var n = e.add("group");
	n.spacing = 4, n.orientation = "row", n.alignment = "left";
	var i = n.add("checkbox", void 0, "Dimensions");
	i.size = [80, 14], i.value = !1;
	var d = n.add("edittext", void 0, "1920");
	d.characters = 6, n.add("statictext", void 0, "x");
	var r = n.add("edittext", void 0, "1080");
	r.characters = 6;
	var l = e.add("group");
	l.spacing = 4, l.orientation = "row", l.alignment = "left";
	var v = l.add("checkbox", void 0, "Resolution");
	v.size = [80, 14], v.value = !1;
	var c = l.add("dropdownlist", void 0, ["Full", "Half", "Third", "Quarter"]);
	c.selection = 0;
	var s = e.add("group");
	s.spacing = 4, s.orientation = "row", s.alignment = "left";
	var u = s.add("checkbox", void 0, "FPS");
	u.size = [80, 14], u.value = !1;
	var h = s.add("edittext", void 0, "25");
	h.characters = 6;
	var $ = s.add("dropdownlist", void 0, ["8", "12", "15", "23.976", "24", "25", "29.97", "30", "50", "59.94", "60", "120"]);
	$.size = [2, 14], $.selection = null, $.onChange = function() {
		$.selection && (h.text = $.selection.text)
	};
	var f = e.add("group");
	f.spacing = 4, f.orientation = "row", f.alignment = "left";
	var g = f.add("checkbox", void 0, "Duration");
	g.size = [80, 14], g.value = !1;
	var p = f.add("dropdownlist", void 0, ["Change to", "Add on"]);
	p.selection = 0;
	var x = f.add("edittext", void 0, "5");
	x.characters = 5;
	var b = f.add("dropdownlist", void 0, ["seconds", "frames"]);
	b.selection = 0;
	var _ = e.add("checkbox", void 0, "Apply to all Comps in Project");
	_.value = !1, _.alignment = "left", e.add("statictext", void 0, "").preferredSize.height = 0;
	var m = e.add("group");
	m.alignment = "center";
	var C = m.add("button", void 0, "Apply"),
		k = m.add("button", void 0, "Close");

	function w() {
		o.enabled = t.value, d.enabled = i.value, r.enabled = i.value, c.enabled = v.value, h.enabled = u.value, $.enabled = u.value, p.enabled = g.value, x.enabled = g.value, b.enabled = g.value
	}
	w(), t.onClick = w, i.onClick = w, v.onClick = w, u.onClick = w, g.onClick = w, C.onClick = function() {
		var a, n, l = o.text,
			s = parseInt(d.text),
			$ = parseInt(r.text),
			f = c.selection.text;
		switch (f) {
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
		var m = parseFloat(h.text),
			C = p.selection.text,
			k = parseFloat(x.text),
			w = b.selection.text;
		switch (w) {
			case "seconds":
			default:
				n = !1;
				break;
			case "frames":
				n = !0
		}
		var z = _.value;
		if (t.value && !/^([0-9A-F]{3}){1,2}$/i.test(l)) {
			alert("Invalid hex value.");
			return
		}
		if (i.value && (isNaN(s) || s <= 0 || isNaN($) || $ <= 0)) {
			alert("Use positive numbers for width and height.");
			return
		}
		if (u.value && (isNaN(m) || m <= 0)) {
			alert("Invalid FPS value.");
			return
		}
		if (!t.value && !i.value && !v.value && !u.value && !g.value) {
			alert("No option selected.");
			return
		}
		changecompset(t.value, l, i.value, s, $, v.value, a, u.value, m, g.value, k, n, C, z), e.close()
	}, k.onClick = function() {
		e.close()
	}, e.center(), e.show()
}

function hextorgb(e) {
	var a = parseInt(e = e.replace("#", ""), 16);
	return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255]
}

function changecompset(e, a, t, o, n, i, d, r, l, v, c, s, u, h) {
	var $ = app.project,
		f = $.selection,
		g = [];
	if (h)
		for (var p = 1; p <= $.numItems; p++) {
			var x = $.item(p);
			x instanceof CompItem && g.push(x)
		} else if (f.length > 0)
			for (var b = 0; b < f.length; b++) f[b] instanceof CompItem && g.push(f[b]);
	if (0 === g.length) {
		alert("No comp(s) selected.");
		return
	}
	app.beginUndoGroup("Change Comps Settings");
	for (var _ = 0; _ < g.length; _++) {
		var m = g[_];
		if (e) {
			var C = hextorgb(a);
			m.bgColor = C
		}
		if (t && (m.width = o, m.height = n), i && (m.resolutionFactor = d), r && !isNaN(l) && l > 0 && (m.frameRate = l), v && !isNaN(c) && c > 0) {
			var k = 0,
				w = c;
			s && (w = c / m.frameRate), k = "Add on" === u ? m.duration + w : w, m.duration = k
		}
	}
	app.endUndoGroup(), (e || t || i || r || v) && (g.length > 1 ? alert("Changes applied to " + g.length + " comps.") : alert("Changes applied to " + g.length + " comp."))
}
showui();
