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
    'kb_vis_sparkline'],
    function (Promise, $, _, dom) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {

                var spark1 = [];
                var spark2 = [];
                var spark3 = [];
                for (var i = 0; i < 75; i++) {
                    spark1.push(Math.random());
                    spark2.push(Math.random());
                    spark3.push(Math.random());

                    if (i == 20) {
                        spark2.push({
                            y : Math.random(),
                            shape : 'circle',
                            shapeArea : 9,
                            color : 'red'
                        });
                    }
                }

                var $spark1 = $.jqElem('div').kbaseSparkline( { dataset : spark1 } );
                var $spark2 = $.jqElem('div').css('display' , 'inline-block').kbaseSparkline( { dataset : spark2 } );
                var $spark3 = $.jqElem('div').css('display' , 'inline-block').kbaseSparkline( { dataset : spark3 } );

                var $demo = $.jqElem('div')
                    .html('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem risus, dictum nec nisi at, fringilla iaculis nunc.\
                    Aliquam erat volutpat. Curabitur porttitor euismod semper. <div id = "spark1" style = "display:inline-block"></div>Integer et \
                    ultricies nulla. Sed tincidunt nibh ligula, quis volutpat \
                    est consequat faucibus. Ut at condimentum risus, ac porttitor tortor. In magna sem, fringilla at viverra sed, elementum nec ex. \
                    Duis ornare libero eu augue commodo, sed semper orci molestie. <div id = "spark2" style = "display:inline-block"></div>Fusce \
                    hendrerit ac dolor non iaculis. Aenean eu imperdiet turpis. \
                    Maecenas urna odio, convallis semper pulvinar non, sollicitudin ac lorem. Maecenas vel iaculis urna. Proin sit amet ante sit amet \
                    felis bibendum ornare.<div id = "spark3" style = "display:inline-block"></div>');

                $spark1._rewireIds($demo, $spark1);

                $spark1.data('spark1').kbaseSparkline({dataset : spark1});
                $spark1.data('spark2').kbaseSparkline({dataset : spark2});
                $spark1.data('spark3').kbaseSparkline({dataset : spark3});

                return {
                    title: 'Sample sparklines',
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
