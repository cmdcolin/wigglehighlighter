# wigglehighlighter

[![](https://travis-ci.org/elsiklab/wigglehighlighter.svg?branch=master)](https://travis-ci.org/elsiklab/wigglehighlighter)

A JBrowse plugin for plotting multiple bigwig files on a single track. Includes a storeclass
that accepts multiple bigwig URLs and a custom tracktype for rendering the subtracks.


![](img/out.png)
Figure with MultiDensity and MultiXYPlot with different group colorings


## Example configs

Example for trackList.json (MultiDensity as example)

      {
         "storeClass" : "MultiBigWig/Store/SeqFeature/MultiBigWig",
         "urlTemplate" : "yourfile.bw",
         "bigbed": { "urlTemplate": "yourfile.bb" },
         "label" : "Track",
         "type" : "MultiBigWig/View/Track/MultiWiggle/MultiDensity"
         "style": {
           "highlightColor": "#f0f2",
           "broaden": 100
         }
      }


## Install

- Clone repo into plugins folder in JBrowse and name folder WiggleHighlighter
- Add "plugins": ["WiggleHighlighter"] to trackList.json or jbrowse_conf.json


Please see http://gmod.org/wiki/JBrowse_FAQ#How_do_I_install_a_plugin for more information about installing plugins

Still in beta! Feel free to provide feedback
