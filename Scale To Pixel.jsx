/**
 * Scale layer(s) to a specific pixel width and height
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
 function showui() {
	var activeComp = app.project.activeItem;
	if (!(activeComp instanceof CompItem) || activeComp.selectedLayers.length === 0) {
		alert("Select layer(s) first.");
		return;
	}
	var win = new Window("dialog", "Scale Layers");
	var t_grp = win.add("group");
	t_grp.orientation = "row";
	t_grp.alignment = "left";
	t_grp.add("statictext", undefined, "Enter 0 for no change");
	var w_grp = win.add("group");
	w_grp.orientation = "row";
	w_grp.alignment = "left";
	w_grp.add("statictext", undefined, "Width (px):");
	var w_in = w_grp.add("edittext", undefined, "0");
	w_in.characters = 10;
	var h_grp = win.add("group");
	h_grp.orientation = "row";
	h_grp.alignment = "left";
	h_grp.add("statictext", undefined, "Height (px):");
	var h_in = h_grp.add("edittext", undefined, "0");
	h_in.characters = 10;
	var btn_grp = win.add("group");
	btn_grp.alignment = "center";
	var ok_btn = btn_grp.add("button", undefined, "OK");
	var cancel_btn = btn_grp.add("button", undefined, "Cancel");
	ok_btn.onClick = function() {
		var width = parseFloat(w_in.text);
		var height = parseFloat(h_in.text);
		scalelayers(width, height);
		win.close();
	};
	cancel_btn.onClick = function() {
		win.close();
	};
	win.center();
	win.show();
}

function scalelayers(t_w, t_h) {
	var activeComp = app.project.activeItem;
	var selectedLayers = activeComp.selectedLayers;
	for (var i = 0; i < selectedLayers.length; i++) {
		var layer = selectedLayers[i];
		var l_sc = layer.property("Scale").value;
		var l_w = layer.sourceRectAtTime(0, false).width;
		var l_h = layer.sourceRectAtTime(0, false).height;
		var n_sx = l_sc[0];
		var n_sy = l_sc[1];
		if (t_w > 0) {
			n_sx = (t_w / l_w) * 100;
		}
		if (t_h > 0) {
			n_sy = (t_h / l_h) * 100;
		}
		layer.property("Scale").setValue([n_sx, n_sy]);
	}
}
showui();