define([
  "dojo/_base/declare",
  "dojo/on",
  "dojo/mouse",
  "dijit/Dialog",
  "JBrowse/Util",
  "JBrowse/Store/SeqFeature/BigBed",
  "JBrowse/View/Track/_FeatureDetailMixin",
], function (declare, on, mouse, Dialog, Util, BigBed, FeatureDetailMixin) {
  return declare(FeatureDetailMixin, {
    constructor: function (args) {
      if (this.config.bigbed) {
        this.highlightStore = new BigBed(
          Object.assign({}, this.config.bigbed, args)
        );
      } else {
        const conf = this.config.storeConf;
        const CLASS = dojo.global.require(conf.storeClass);
        const newConf = Object.assign({}, args, conf);
        newConf.config = Object.assign({}, args.config, conf);
        this.highlightStore = new CLASS(newConf);
      }
    },
    _defaultConfig: function () {
      return Util.deepUpdate(dojo.clone(this.inherited(arguments)), {
        highlightColor: "#f0f2",
        indicatorColor: "#f0f",
        indicatorHeight: 3,
        broaden: 0,
        onHighlightClick: (feature) =>
          new Dialog({
            content: this.defaultFeatureDetail(this, feature, null, null, null),
          }).show(),
        onHighlightRightClick: () => {},
      });
    },
    updateStaticElements: function (coords) {
      if (!("x" in coords)) return;
      this.blocks.forEach((block, blockIndex) => {
        // calculate the view left coord relative to the
        // block left coord in units of pct of the block
        // width
        if (!block || !this.label) return;
        var viewLeft =
          (100 * block.domNode.offsetLeft) / block.domNode.offsetWidth + 2;
        console.log({ viewLeft });

        // if the view start is unknown, or is to the
        // left of this block, we don't have to worry
        // about adjusting the feature labels
        if (!viewLeft) return;

        array.forEach(
          block.domNode.childNodes,
          function (featDiv) {
            if (!featDiv.label) return;
            var labelDiv = featDiv.label;
            var feature = featDiv.feature;

            // get the feature start and end in terms of block width pct
            var minLeft = parseInt(feature.get("start"));
            minLeft = (100 * (minLeft - block.startBase)) / blockWidth;
            var maxLeft = parseInt(feature.get("end"));
            maxLeft =
              100 *
              ((maxLeft - block.startBase) / blockWidth -
                labelDiv.offsetWidth / block.domNode.offsetWidth);

            // move our label div to the view start if the start is between the feature start and end
            labelDiv.style.left =
              Math.max(minLeft, Math.min(viewLeft, maxLeft)) + "%";
          },
          this
        );
      });

      console.log("here");
    },

    _postDraw: function (scale, leftBase, rightBase, block, canvas) {
      this.highlightStore.getFeatures(
        { ref: this.browser.refSeq.name, start: leftBase, end: rightBase },
        (feature) => {
          const s = block.bpToX(
            Math.max(
              feature.get("start") - this.config.broaden,
              block.startBase
            )
          );
          const e = block.bpToX(
            Math.min(feature.get("end") + this.config.broaden, block.endBase)
          );
          const ret = dojo.create(
            "div",
            {
              style: {
                left: `${s}px`,
                width: `${e - s}px`,
                height: canvas.style.height,
                top: 0,
                zIndex: 10000,
                position: "absolute",
                backgroundColor: this.getConf("highlightColor", [
                  feature,
                  this,
                ]),
              },
              innerHTML: "123",
            },
            block.domNode
          );
          const indicator = dojo.create(
            "div",
            {
              style: {
                left: `${s}px`,
                width: `${e - s}px`,
                height: `${this.config.indicatorHeight}px`,
                zIndex: 10000,
                top: canvas.style.height,
                position: "absolute",
                backgroundColor: this.getConf("indicatorColor", [
                  feature,
                  this,
                ]),
              },
            },
            block.domNode
          );

          const effectiveCallback = (event) => {
            event.stopPropagation();
            if (mouse.isRight(event)) {
              console.log("here");
              this.getConf("onHighlightRightClick", [feature, this]);
            } else {
              console.log("here2");
              this.getConf("onHighlightClick", [feature, this]);
            }
          };
          on(indicator, "mousedown", effectiveCallback);
          on(ret, "mousedown", effectiveCallback);
        },
        () => {},
        (error) => {
          console.error(error);
        }
      );
    },
  });
});
