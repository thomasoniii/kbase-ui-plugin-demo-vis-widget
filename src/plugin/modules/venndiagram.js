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
    'kb_vis_venndiagram'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var $venn = $.jqElem('div')
                    .css({width: '800px', height: '800px'})
                    .kbaseVenndiagram(
                    {

                        xLabel      : 'Some useful experiment',
                        sortSubgroups:undefined,

                        dataset : {

                            c1 : {
                                label : 'Molecular Function',
                                value : 200,
                                tooltip : 'c1!',
                                action : function(d) { alert('Clicked on ' + d.label) },
                                fillColor : 'red',
                            },
                            c2 : {
                                label : 'Biological Process',
                                value : 200,
                                tooltip : 'c2!'
                            },
                            c3 : {
                                label : 'Cellular Component',
                                value : 200,
                                tooltip : 'c3!'
                            },

                            c1c2 : {
                                value : 23,
                                tooltip : 'c1c2!'
                            },
                            c1c3 : {
                                value : 161,
                                tooltip : 'c1c3!'
                            },
                            c2c3 : {
                                value : 56,
                                tooltip : 'c2c3!'
                            },
                            c1c2c3 : {
                                value : 273,
                                tooltip : 'c1c2c3!'
                            },
                        },



                    }
                );

                return {
                    title: 'Sample venn diagram',
                    content: $venn.$elem
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
