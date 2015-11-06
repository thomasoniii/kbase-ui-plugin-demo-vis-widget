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
    'kb_vis_forced_network'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var generate_network_data = function generate_network_data() {
                    var newDataset = { nodes : [], edges : []};

                    var numNodes = Math.floor(Math.random() * 200);

                    for (var i = 0; i < numNodes; i++) {
                        newDataset.nodes.push(
                            {name : 'Node ' + i, radius : Math.floor(Math.random() * 20), color : 'blue'}
                        );

                        newDataset.edges.push(
                            { source : Math.floor(Math.random() * numNodes), target : Math.floor(Math.random() * numNodes) }
                        );
                    }


                    return newDataset;
                }

                var network_data = generate_network_data();

                var $network = $.jqElem('div')
                    .css({width: '800px', height: '800px'})
                    .kbaseForcedNetwork({
                        scaleAxes : true,
                        dataset: network_data
                    });

                var $demo = $.jqElem('div')
                    .append($network.$elem)
                    .append(
                        $.jqElem('button')
                            .on('click', function(e) {
                                $network.setDataset(generate_network_data());
                            })
                            .append('Randomize network chart')
                    )
                ;

                return {
                    title: 'Sample forced network graph',
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
