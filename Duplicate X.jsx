/**
 * Duplicate selected layer(s) a specified number of times
 * through a simple UI.
 *
 * @author github.com/idlepickle
 * @version 1.0
 */
function dupSelectLayers(e){var t=app.project.activeItem;if(!(t instanceof CompItem)){alert("No active composition selected.");return}var o=t.selectedLayers;if(0===o.length){alert("No layers selected.");return}for(var n=0;n<e;n++)for(var a=0;a<o.length;a++)o[a].duplicate();alert("Selected layer(s) duplicated "+e+" times.")}function showUI(){var e=new Window("dialog","Duplicate Selected Layers");e.add("statictext",void 0,"Number of Duplicates:");var t=e.add("edittext",void 0,"2");t.characters=5,t.active=!0;var o=e.add("group"),n=o.add("button",void 0,"OK"),a=o.add("button",void 0,"Cancel"),i={duplicationCount:null};return n.onClick=function(){var o=parseInt(t.text,10);if(isNaN(o)||o<1){alert("Please enter a valid number of duplicates (1 or more).");return}i.duplicationCount=o,e.close()},a.onClick=function(){e.close()},e.show(),i}function main(){app.beginUndoGroup("Duplicate Selected Layers");var e=app.project.activeItem;if(!(e instanceof CompItem)){alert("No active composition selected."),app.endUndoGroup();return}if(0===e.selectedLayers.length){alert("Select layer(s) first."),app.endUndoGroup();return}var t=showUI();if(null===t.duplicationCount){app.endUndoGroup();return}dupSelectLayers(t.duplicationCount),app.endUndoGroup()}main();