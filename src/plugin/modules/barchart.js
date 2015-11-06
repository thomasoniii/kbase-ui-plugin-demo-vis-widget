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
    'kb_vis_barchart'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {
                var bars = [];
                for (var i = 0; i < 20; i++) {
                    bars.push({
                        bar: i,
                        color: ['#00BBBB', '#0000FF', '#00BBBB', '#0000FF'],
                        value: [Math.random() * 10, Math.random() * 20, Math.random() * 10, Math.random() * 30]
                    });
                }
                var $bar = $.jqElem('div')
                    .css({width: '800px', height: '500px'})
                    .kbaseBarchart({
                        scaleAxes: true,
                        xLabel: 'Survey Data',
                        //yLabel      : 'Meaningful data',
                        hGrid: true,
                        dataset: bars
                    });

                return {
                    title: 'Sample bar chart',
                    content: $bar.$elem
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
