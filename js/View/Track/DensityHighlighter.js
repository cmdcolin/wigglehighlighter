define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/Track/Wiggle/XYPlot',
],
function (
    declare,
    array,
    lang,
    WiggleBase,
) {
    return declare(XYPlot, {

        constructor: function (args) {
            this.highlightStore = new BigBed({ ...this.config.bigbed })
        }
    });
});
