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
        },

        _postDraw: function( scale, leftBase, rightBase, block, canvas, features, featureRects, dataScale ) {
            this.highlightStore.getFeatures({ref:this.browser.refSeq.name, start: leftBase, end: rightBase},
                feature => {
                    console.log(feature)
                }, () => { console.log('done') }
                error => { console.error(error) }
            )
        }

    });
});
