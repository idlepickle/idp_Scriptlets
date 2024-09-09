/**
 * Mass change compositions settings
 * (Resolution, FPS and Duration)
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function cCSUI() {
	var win = new Window("dialog", "Change Comp Settings");
	var r_grp = win.add("group");
	r_grp.orientation = "row";
	r_grp.alignment = "left";
	var cRes_cb = r_grp.add("checkbox", undefined, "Resolution");
	cRes_cb.value = false;
	var res_dd = r_grp.add("dropdownlist", undefined, ["Full", "Half", "Third", "Quarter"]);
	res_dd.selection = 0;
	var f_grp = win.add("group");
	f_grp.orientation = "row";
	f_grp.alignment = "left";
	var cFps_cb = f_grp.add("checkbox", undefined, "FPS");
	cFps_cb.value = false;
	var fps_inp = f_grp.add("edittext", undefined, "25");
	fps_inp.characters = 5;
	var d_grp = win.add("group");
	d_grp.orientation = "row";
	d_grp.alignment = "left";
	var cDur_cb = d_grp.add("checkbox", undefined, "Duration");
	cDur_cb.value = false;
	var durType_dd = d_grp.add("dropdownlist", undefined, ["Change to", "Add on"]);
	durType_dd.selection = 0;
	var dur_inp = d_grp.add("edittext", undefined, "5");
	dur_inp.characters = 5;
	var sec_rdo = d_grp.add("radiobutton", undefined, "sec");
	var frames_rdo = d_grp.add("radiobutton", undefined, "fr");
	sec_rdo.value = true;
	frames_rdo.value = false;
	var applyAll_cb = win.add("checkbox", undefined, "Apply to all Comps in Project");
	applyAll_cb.value = false;
	applyAll_cb.alignment = "left";
	var btn_grp = win.add("group");
	btn_grp.alignment = "center";
	var ok_btn = btn_grp.add("button", undefined, "OK");
	var cancel_btn = btn_grp.add("button", undefined, "Cancel");

	function rUI() {
		res_dd.enabled = cRes_cb.value;
		fps_inp.enabled = cFps_cb.value;
		dur_inp.enabled = cDur_cb.value;
		frames_rdo.enabled = cDur_cb.value;
		sec_rdo.enabled = cDur_cb.value;
		durType_dd.enabled = cDur_cb.value;
	}
	rUI();
	cRes_cb.onClick = rUI;
	cFps_cb.onClick = rUI;
	cDur_cb.onClick = rUI;
	ok_btn.onClick = function() {
		var sRes = res_dd.selection.text;
		var applyAll = applyAll_cb.value;
		var fps = parseFloat(fps_inp.text);
		var duration = parseFloat(dur_inp.text);
		var isFrames = frames_rdo.value;
		var durType = durType_dd.selection.text;
		var resolutionFactor;
		switch (sRes) {
			case "Full":
				resolutionFactor = [1, 1];
				break;
			case "Half":
				resolutionFactor = [2, 2];
				break;
			case "Third":
				resolutionFactor = [3, 3];
				break;
			case "Quarter":
				resolutionFactor = [4, 4];
				break;
			default:
				resolutionFactor = [1, 1];
		}
		if (!cRes_cb.value && !cFps_cb.value && !cDur_cb.value) {
			alert("Select at least one option to change.");
			return;
		}
		cCS(cRes_cb.value, resolutionFactor, cFps_cb.value, fps, cDur_cb.value, duration, isFrames, durType, applyAll);
		win.close();
	};
	cancel_btn.onClick = function() {
		win.close();
	};
	win.center();
	win.show();
}

function cCS(changeRes, newRes, changeFps, fps, changeDur, duration, isFrames, durType, applyAll) {
	var project = app.project;
	var selectedComps = project.selection;
	var compositions = [];
	if (applyAll) {
		for (var j = 1; j <= project.numItems; j++) {
			var item = project.item(j);
			if (item instanceof CompItem) {
				compositions.push(item);
			}
		}
	} else {
		if (selectedComps.length > 0) {
			for (var i = 0; i < selectedComps.length; i++) {
				if (selectedComps[i] instanceof CompItem) {
					compositions.push(selectedComps[i]);
				}
			}
		}
	}
	if (compositions.length === 0) {
		alert("No comp(s) selected.");
		return;
	}
	app.beginUndoGroup("Change Comps Settings");
	for (var k = 0; k < compositions.length; k++) {
		var comp = compositions[k];
		if (changeRes) {
			comp.resolutionFactor = newRes;
		}
		if (changeFps && !isNaN(fps) && fps > 0) {
			comp.frameRate = fps;
		}
		if (changeDur && !isNaN(duration) && duration > 0) {
			var newDur = 0;
			var durInSec = duration;
			if (isFrames) {
				durInSec = duration / comp.frameRate;
			}
			if (durType === "Add on") {
				newDur = comp.duration + durInSec;
			} else {
				newDur = durInSec;
			}
			comp.duration = newDur;
		}
	}
	app.endUndoGroup();
	if (changeRes || changeFps || changeDur) {
		alert("Changes applied to " + compositions.length + " comp(s).");
	}
}
cCSUI();
