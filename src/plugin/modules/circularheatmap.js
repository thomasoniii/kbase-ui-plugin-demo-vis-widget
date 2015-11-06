/*global
 define
 */
/*jslint
 browser: true,
 white: true
 */
define([
    'bluebird',
    'jquery',
    'underscore',
    'kb_common_dom',
    'kb_vis_circular_heatmap'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var generate_hm_data = function generate_hm_data() {

                    var numPies     = Math.floor(Math.random() * 30)
                    var numSlices   = Math.floor(Math.random() * 100);

                    var newDataset = [];
                    for (var i = 0; i < numPies; i++) {
                        newDataset[i] = [];
                    }
                    for (var j = 0; j < newDataset.length; j++) {
                        for (var i = 0; i < numSlices; i++) {

                            var value = Math.random();

                            newDataset[j].push(
                                {
                                    val : value,
                                    label : 'Label ' + (i + 1),
                                    tooltip : 'Ring : ' + (j + 1) + '<br>' + 'Label : ' + (i + 1) + '<br>' + 'Value : ' + value,
                                }
                            );
                        }
                    };

                    return newDataset;
                }

                var hm_data = generate_hm_data();

                var $hm = $.jqElem('div')
                    .css({width: '800px', height: '500px'})
                    .kbaseCircularHeatmap({
                        labels : false,
                        innerRadius : 50,
                        startingPosition : 'top',
                        outerRadiusInset : 0,
                        childOptions : {
                            labels : false,
                            startingPosition : 'top',
                            outerRadiusInset : 0,
                        }
                    });

                $hm.setDatasets(hm_data);

                var $demo = $.jqElem('div')
                    .append($hm.$elem)
                    .append(
                        $.jqElem('button')
                            .on('click', function(e) {
                                $hm.setDatasets(generate_hm_data());
                            })
                            .append('Randomize heatmap')
                    )
                ;

                return {
                    title: 'Sample heatmap',
                    content: $demo
                };
            }

            function init(config) {
                return new Promise(function (resolve) {
                    resolve();
                });
            }

            function attach(node) {
                return new Promise(function (resolve) {
                    mount = node;
                    container = dom.createElement('div');
                    mount.appendChild(container);
                    var rendered = render();

                    runtime.send('ui', 'setTitle', rendered.title);
                    $(container).append(rendered.content);

                    resolve();
                });
            }
            function start(params) {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
            function stop() {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
            function detach() {
                return new Promise(function (resolve) {
                    $(container).empty();
                    resolve();
                });
            }

            return {
                init: init,
                attach: attach,
                start: start,
                stop: stop,
                detach: detach
            };
        }

        return {
            make: function (config) {
                return widget(config);
            }
        };
    });
