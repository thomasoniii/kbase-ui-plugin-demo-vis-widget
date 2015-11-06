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
    'kb_vis_piechart'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var generate_pie_data = function generate_pie_data() {
                    var numSlices = Math.floor(Math.random() * 20);

                    var newDataset = [];
                    for (var i = 0; i < numSlices; i++) {
                        newDataset.push(
                            {
                                value : Math.random(),
                                //color : 'red',
                                label : 'Label ' + (i + 1),
                            }
                        );
                    };

                    return newDataset;
                }

                var pie_data = generate_pie_data();

                var $pie = $.jqElem('div')
                    .css({width: '800px', height: '500px'})
                    .kbasePiechart({
                        scaleAxes: true,
                        useUniqueID : false,
                        graident: true,
                        startingPosition : 'top',
                        innerRadius : -100,
                        outsideLabels : true,
                        dataset: pie_data
                    });

                var $demo = $.jqElem('div')
                    .append($pie.$elem)
                    .append(
                        $.jqElem('button')
                            .on('click', function(e) {
                                $pie.setDataset(generate_pie_data());
                            })
                            .append('Randomize pie chart')
                    )
                ;

                return {
                    title: 'Sample bar chart',
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
