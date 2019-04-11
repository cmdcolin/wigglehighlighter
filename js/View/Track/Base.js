define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/Util',
    'JBrowse/Store/SeqFeature/BigBed',
],
function (
    declare,
    array,
    lang,
    Util,
    BigBed,
) {
    return declare(null, {


        constructor: function (args) {
            const ret = Object.assign({},this.config.bigbed,args)
            this.highlightStore = new BigBed(ret)
        },
        _defaultConfig: function() {
            return Util.deepUpdate(
                dojo.clone( this.inherited(arguments) ),
                {
                    highlightColor: '#f0f2',
                    broaden: 0
                }
            );
        },

        _postDraw: function( scale, leftBase, rightBase, block, canvas, features, featureRects, dataScale ) {
            this.highlightStore.getFeatures({ref:this.browser.refSeq.name, start: leftBase, end: rightBase},
                feature => {
                    const s = block.bpToX(feature.get('start')-this.config.broaden)
                    const e = block.bpToX(feature.get('end')+this.config.broaden)
                    const ret = dojo.create('div',
                        {
                            style: {
                                left: `${s}px`,
                                width: `${e-s}px`,
                                height: canvas.style.height,
                                top: 0,
                                display: 'inline',
                                zIndex: 10000,
                                position: 'absolute',
                                backgroundColor: this.config.highlightColor
                            }
                        }, block.domNode)
                },
                () => { },
                error => { console.error(error) }
            )
        }

    });
});
