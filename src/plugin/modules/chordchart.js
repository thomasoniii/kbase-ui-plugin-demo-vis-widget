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
    'kb_vis_chordchart'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var generate_chord_data = function generate_chord_data() {
                    var newDataset = [];
                    var numChords = Math.floor(Math.random() * 10);
                    for (var i = 0; i < numChords; i++) {
                        newDataset[i] = [];
                        for (var j = 0; j < numChords; j++) {
                            newDataset[i][j] = Math.floor(Math.random() * 12000)
                        }
                    }

                    return newDataset;
                }

                var chord_data = generate_chord_data();

                var $chord = $.jqElem('div')
                    .css({width: '800px', height: '800px'})
                    .kbasePiechart({
                        startingPosition : 'top',
                        labels : true,
                        dataset: chord_data
                    });

                var $demo = $.jqElem('div')
                    .append($chord.$elem)
                    .append(
                        $.jqElem('button')
                            .on('click', function(e) {
                                $chord.setDataset(generate_chord_data());
                            })
                            .append('Randomize chord chart')
                    )
                ;

                return {
                    title: 'Sample chord chart',
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
