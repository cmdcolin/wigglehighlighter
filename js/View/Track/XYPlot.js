define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/Store/SeqFeature/BigBed',
    'JBrowse/View/Track/Wiggle/XYPlot',
],
function (
    declare,
    array,
    lang,
    BigBed,
    XYPlot,
) {
    return declare(XYPlot, {

        constructor: function (args) {
            const ret = Object.assign({},this.config.bigbed,args)
            this.highlightStore = new BigBed(ret)
        },

        _postDraw: function( scale, leftBase, rightBase, block, canvas, features, featureRects, dataScale ) {
            console.log('here',block)
            //const container = dojo.create('div', {style: {position:'relative',width:`${canvas.width/2}px`,height:`${canvas.height/2}px`,display:'inline'}}, block.domNode)
            this.highlightStore.getFeatures({ref:this.browser.refSeq.name, start: leftBase, end: rightBase},
                feature => {
                    const s = block.bpToX(feature.get('start'))
                    const e = block.bpToX(feature.get('end'))
                    const ret = dojo.create('div',
                        {
                            style: {
                                left: `${s}px`,
                                width: `${e-s}px`,
                                height: '100px',
                                top: 0,
                                display: 'inline',
                                zIndex: 10000,
                                position: 'absolute',
                                backgroundColor: '#fffe'
                            }
                        }, block.domNode)
                },
                () => { console.log('done') },
                error => { console.error(error) }
            )
        }

    });
});
