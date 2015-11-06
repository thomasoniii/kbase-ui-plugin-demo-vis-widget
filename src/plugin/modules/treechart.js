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
    'kb_vis_treechart'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var generate_tree_data = function generate_tree_data(dataset, depth) {

                    if (dataset == undefined) {
                        dataset = { name : 'Root', children : [] }
                    }

                    var labels = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];

                    for (var i = 0; i < labels.length; i++) {
                        if (Math.round(Math.random())) {
                            var child = {
                                name : labels[i] + '-' + depth,
                                children : []
                            };

                            if (depth > 0 && Math.round(Math.random())) {
                                generate_tree_data(child.children, depth - 1)
                            }
                        }
                    }

                    return dataset;
                }

                var tree_data = generate_tree_data();

                var $tree = $.jqElem('div')
                    .css({width: '800px', height: '500px'})
                    .kbaseTreechart({
                        lineStyle : 'square',
                        layout : 'cluster',
                        distance : 50,
                        bias : 'leaf',
                        fixed : true,
                        dataset: tree_data
                    });

                var $demo = $.jqElem('div')
                    .append($tree.$elem)
                    .append(
                        $.jqElem('button')
                            .on('click', function(e) {
                                $tree.setDataset(generate_tree_data());
                            })
                            .append('Randomize tree chart')
                    )
                ;

                return {
                    title: 'Sample tree chart',
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
