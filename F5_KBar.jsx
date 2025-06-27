/**
 * Miss the F5/Shift-F5 function back in the Flash days?
 * Here's a simple KBar scriplet to do exactly that for
 * selected layers. Does NOT do precomps recursively.
 *
 * @author github.com/idlepickle
 * @version 1.0 - Initial release.
 */
(function() {
    var e = app.project.activeItem;
    if (!(e && e instanceof CompItem)) {
        alert("Please select a composition.");
        return
    }
    var t = e.frameDuration;
    var a = e.time;
    var r = e.selectedLayers;
    if (r.length === 0) {
        alert("Please select at least one layer.");
        return
    }
    var n = ScriptUI.environment.keyboardState.shiftKey;
    var o = n ? -t : t;

    function p(e, t, a) {
        function r(e) {
            if (e.numProperties !== undefined) {
                for (var n = 1; n <= e.numProperties; n++) {
                    r(e.property(n))
                }
            } else if (e.numKeys > 0) {
                for (var o = e.numKeys; o >= 1; o--) {
                    var p = e.keyTime(o);
                    if (a > 0 && p >= t || a < 0 && p > t) {
                        var i = e.keyValue(o);
                        var y = e.keyInInterpolationType(o);
                        var l = e.keyOutInterpolationType(o);
                        var u = e.keyInTemporalEase(o);
                        var s = e.keyOutTemporalEase(o);
                        var f = e.propertyValueType === PropertyValueType.ThreeD_SPATIAL || e.propertyValueType === PropertyValueType.TwoD_SPATIAL ? [e.keyInSpatialTangent(o), e.keyOutSpatialTangent(o)] : null;
                        e.removeKey(o);
                        var T = e.addKey(p + a);
                        e.setValueAtKey(T, i);
                        if (y === KeyframeInterpolationType.LINEAR && l === KeyframeInterpolationType.LINEAR) {
                            e.setInterpolationTypeAtKey(T, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR)
                        } else {
                            e.setInterpolationTypeAtKey(T, y, l);
                            e.setTemporalEaseAtKey(T, u, s);
                            if (f) {
                                e.setSpatialTangentsAtKey(T, f[0], f[1])
                            }
                        }
                    }
                }
            }
        }
        r(e)
    }
    app.beginUndoGroup(n ? "Delete Frame" : "Add Frame");
    for (var i = 0; i < r.length; i++) {
        var y = r[i];
        p(y, a, o);
        if (n) {
            if (a < y.outPoint && y.outPoint + o > y.inPoint) {
                y.outPoint += o
            }
        } else {
            if (a >= y.outPoint) {
                y.outPoint = a + o
            } else {
                y.outPoint += o
            }
        }
    }
    app.endUndoGroup()
})();
