define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'dijit/Dialog',
    'JBrowse/Util',
    'JBrowse/Store/SeqFeature/BigBed',
    'JBrowse/View/Track/_FeatureDetailMixin',
],
function (
    declare,
    array,
    lang,
    on,
    Dialog,
    Util,
    BigBed,
    FeatureDetailMixin
) {
    return declare(FeatureDetailMixin, {
        constructor: function (args) {
            const ret = Object.assign({},this.config.bigbed,args)
            this.highlightStore = new BigBed(ret)
        },
        _defaultConfig: function() {
            return Util.deepUpdate(
                dojo.clone( this.inherited(arguments) ),
                {
                    highlightColor: '#f0f2',
                    indicatorColor: '#f0f',
                    indicatorHeight: 3,
                    broaden: 0
                }
            );
        },

        _postDraw: function( scale, leftBase, rightBase, block, canvas, features, featureRects, dataScale ) {
            this.highlightStore.getFeatures({ref:this.browser.refSeq.name, start: leftBase, end: rightBase},
                feature => {
                    const s = block.bpToX(Math.max(feature.get('start')-this.config.broaden,block.startBase))
                    const e = block.bpToX(Math.min(feature.get('end')+this.config.broaden,block.endBase))
                    const ret = dojo.create('div', {
                        style: {
                            left: `${s}px`,
                            width: `${e-s}px`,
                            height: canvas.style.height,
                            top: 0,
                            zIndex: 10000,
                            position: 'absolute',
                            backgroundColor: this.config.highlightColor
                        }
                    }, block.domNode)
                    const indicator = dojo.create('div', {
                        style: {
                            left: `${s}px`,
                            width: `${e-s}px`,
                            height: `${this.config.indicatorHeight}px`,
                            zIndex: 10000,
                            top: canvas.style.height,
                            position: 'absolute',
                            backgroundColor: this.config.indicatorColor
                        }
                    }, block.domNode)
                    console.log('herere')
                    on(indicator, 'click',
                      () => {
                          console.log('herere')
                          new Dialog({ content: this.defaultFeatureDetail(this, feature, null, null, null) }).show()
                      }
                    )
                    on(ret, 'click',
                        () => {
                          console.log('herere2')
                          new Dialog({ content: this.defaultFeatureDetail(this, feature, null, null, null) }).show()
                      }
                    )
                },
                () => { },
                error => { console.error(error) }
            )
        }

    });
});
