define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/Store/SeqFeature/BigBed',
    'JBrowse/View/Track/Wiggle/Density',
],
function (
    declare,
    array,
    lang,
    BigBed,
    Density,
) {
    return declare(Density, {

        constructor: function (args) {
            this.highlightStore = new BigBed(Object.assign({},this.config.bigbed,args))
        }
    });
});
