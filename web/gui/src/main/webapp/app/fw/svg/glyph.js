/*
 * Copyright 2015 Open Networking Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 ONOS GUI -- SVG -- Glyph Service
 */
(function () {
    'use strict';

    // injected references
    var $log, fs, sus;

    // internal state
    var glyphs = d3.map();

    // ----------------------------------------------------------------------
    // Base set of Glyphs...

    var birdData = {
            _bird: "352 224 113 112",
            bird: "M427.7,300.4 c-6.9,0.6-13.1,5-19.2,7.1c-18.1,6.2-33.9," +
            "9.1-56.5,4.7c24.6,17.2,36.6,13,63.7,0.1c-0.5,0.6-0.7,1.3-1.3," +
            "1.9c1.4-0.4,2.4-1.7,3.4-2.2c-0.4,0.7-0.9,1.5-1.4,1.9c2.2-0.6," +
            "3.7-2.3,5.9-3.9c-2.4,2.1-4.2,5-6,8c-1.5,2.5-3.1,4.8-5.1,6.9c-1," +
            "1-1.9,1.9-2.9,2.9c-1.4,1.3-2.9,2.5-5.1,2.9c1.7,0.1,3.6-0.3,6.5" +
            "-1.9c-1.6,2.4-7.1,6.2-9.9,7.2c10.5-2.6,19.2-15.9,25.7-18c18.3" +
            "-5.9,13.8-3.4,27-14.2c1.6-1.3,3-1,5.1-0.8c1.1,0.1,2.1,0.3,3.2," +
            "0.5c0.8,0.2,1.4,0.4,2.2,0.8l1.8,0.9c-1.9-4.5-2.3-4.1-5.9-6c-2.3" +
            "-1.3-3.3-3.8-6.2-4.9c-7.1-2.6-11.9,11.7-11.7-5c0.1-8,4.2-14.4," +
            "6.4-22c1.1-3.8,2.3-7.6,2.4-11.5c0.1-2.3,0-4.7-0.4-7c-2-11.2-8.4" +
            "-21.5-19.7-24.8c-1-0.3-1.1-0.3-0.9,0c9.6,17.1,7.2,38.3,3.1,54.2" +
            "C429.9,285.5,426.7,293.2,427.7,300.4z"
        },

        glyphDataSet = {
            _viewbox: "0 0 110 110",

            unknown: "M35,40a5,5,0,0,1,5-5h30a5,5,0,0,1,5,5v30a5,5,0,0,1-5,5" +
            "h-30a5,5,0,0,1-5-5z",

            node: "M15,100a5,5,0,0,1-5-5v-65a5,5,0,0,1,5-5h80a5,5,0,0,1,5,5" +
            "v65a5,5,0,0,1-5,5zM14,22.5l11-11a10,3,0,0,1,10-2h40a10,3,0,0,1," +
            "10,2l11,11zM16,35a5,5,0,0,1,10,0a5,5,0,0,1-10,0z",

            switch: "M10,20a10,10,0,0,1,10-10h70a10,10,0,0,1,10,10v70a10,10," +
            "0,0,1-10,10h-70a10,10,0,0,1-10-10zM60,26l12,0,0-8,18,13-18,13,0" +
            "-8-12,0zM60,60l12,0,0-8,18,13-18,13,0-8-12,0zM50,40l-12,0,0-8" +
            "-18,13,18,13,0-8,12,0zM50,74l-12,0,0-8-18,13,18,13,0-8,12,0z",

            roadm: "M10,35l25-25h40l25,25v40l-25,25h-40l-25-25zM58,26l12,0,0" +
            "-8,18,13-18,13,0-8-12,0zM58,60l12,0,0-8,18,13-18,13,0-8-12,0z" +
            "M52,40l-12,0,0-8-18,13,18,13,0-8,12,0zM52,74l-12,0,0-8-18,13," +
            "18,13,0-8,12,0z",

            endstation: "M10,15a5,5,0,0,1,5-5h65a5,5,0,0,1,5,5v80a5,5,0,0,1" +
            "-5,5h-65a5,5,0,0,1-5-5zM87.5,14l11,11a3,10,0,0,1,2,10v40a3,10," +
            "0,0,1,-2,10l-11,11zM17,19a2,2,0,0,1,2-2h56a2,2,0,0,1,2,2v26a2," +
            "2,0,0,1-2,2h-56a2,2,0,0,1-2-2zM20,20h54v10h-54zM20,33h54v10h" +
            "-54zM42,70a5,5,0,0,1,10,0a5,5,0,0,1-10,0z",

            router: "M10,55A45,45,0,0,1,100,55A45,45,0,0,1,10,55M20,50l12,0," +
            "0-8,18,13-18,13,0-8-12,0zM90,50l-12,0,0-8-18,13,18,13,0-8,12,0z" +
            "M50,47l0-12-8,0,13-18,13,18-8,0,0,12zM50,63l0,12-8,0,13,18,13" +
            "-18-8,0,0-12z",

            bgpSpeaker: "M10,40a45,35,0,0,1,90,0Q100,77,55,100Q10,77,10,40z" +
            "M50,29l12,0,0-8,18,13-18,13,0-8-12,0zM60,57l-12,0,0-8-18,13," +
            "18,13,0-8,12,0z",

            chain: "M60.4,77.6c-4.9,5.2-9.6,11.3-15.3,16.3c-8.6,7.5-20.4,6.8" +
            "-28-0.8c-7.7-7.7-8.4-19.6-0.8-28.4c6.5-7.4,13.5-14.4,20.9-20.9" +
            "c7.5-6.7,19.2-6.7,26.5-0.8c3.5,2.8,4.4,6.1,2.2,8.7c-2.7,3.1" +
            "-5.5,2.5-8.5,0.3c-4.7-3.4-9.7-3.2-14,0.9C37.1,58.7,31,64.8," +
            "25.2,71c-4.2,4.4-4.2,10.6-0.6,14.3c3.7,3.7,9.7,3.7,14.3-0.4" +
            "c2.9-2.5,5.3-5.5,8.3-8c1-0.9,3-1.1,4.4-0.9C54.8,76.3,57.9,77.1," +
            "60.4,77.6zM49.2,32.2c5-5.2,9.7-10.9,15.2-15.7c12.8-11,31.2" +
            "-4.9,34.3,11.2C100,34.2,98.3,40.2,94,45c-6.7,7.4-13.7,14.6" +
            "-21.2,21.2C65.1,73,53.2,72.7,46,66.5c-3.2-2.8-3.9-5.8-1.6-8.4" +
            "c2.6-2.9,5.3-2.4,8.2-0.3c5.2,3.7,10,3.3,14.7-1.1c5.8-5.6,11.6" +
            "-11.3,17.2-17.2c4.6-4.8,4.9-11.1,0.9-15c-3.9-3.9-10.1-3.4-15," +
            "1.2c-3.1,2.9-5.7,7.4-9.3,8.5C57.6,35.3,53,33,49.2,32.2z",

            crown: "M99.5,21.6c0,3-2.3,5.4-5.1,5.4c-0.3,0-0.7,0-1-0.1c-1.8," +
            "4-4.8,10-7.2,17.3c-3.4,10.6-0.9,26.2,2.7,27.3C90.4,72,91.3," +
            "75,88,75H22.7c-3.3,0-2.4-3-0.9-3.5c3.6-1.1,6.1-16.7,2.7-27.3" +
            "c-2.4-7.4-5.4-13.5-7.2-17.5c-0.5,0.2-1,0.3-1.6,0.3c-2.8,0" +
            "-5.1-2.4-5.1-5.4c0-3,2.3-5.4,5.1-5.4c2.8,0,5.1,2.4,5.1,5.4c0," +
            "1-0.2,1.9-0.7,2.7c0.7,0.8,1.4,1.6,2.4,2.6c8.8,8.9,11.9,12.7," +
            "18.1,11.7c6.5-1,11-8.2,13.3-14.1c-2-0.8-3.3-2.7-3.3-5.1c0-3," +
            "2.3-5.4,5.1-5.4c2.8,0,5.1,2.4,5.1,5.4c0,2.5-1.6,4.5-3.7,5.2" +
            "c2.3,5.9,6.8,13,13.2,14c6.2,1,9.3-2.7,18.1-11.7c0.7-0.7,1.4" +
            "-1.5,2-2.1c-0.6-0.9-1-2-1-3.1c0-3,2.3-5.4,5.1-5.4C97.2,16.2," +
            "99.5,18.6,99.5,21.6zM92,87.9c0,2.2-1.7,4.1-3.8,4.1H22.4c" +
            "-2.1,0-4.4-1.9-4.4-4.1v-3.3c0-2.2,2.3-4.5,4.4-4.5h65.8c2.1," +
            "0,3.8,2.3,3.8,4.5V87.9z",

            lock: "M79.4,48.6h-2.7c0.2-5.7-0.2-20.4-7.9-28.8c-3.6-3.9-8.3" +
            "-5.9-13.7-5.9c-5.4,0-10.2,2-13.8,5.9c-7.8,8.4-8.3,23.2-8.1,28.8" +
            "h-2.7c-4.4,0-8,2.6-8,5.9v35.7c0,3.3,3.6,5.9,8,5.9h48.9c4.4,0," +
            "8-2.6,8-5.9V54.5C87.5,51.3,83.9,48.6,79.4,48.6z M48.1,26.1c1.9" +
            "-2,4.1-2.9,7-2.9c2.9,0,5.1,0.9,6.9,2.9c5,5.4,5.6,17.1,5.4,22.6" +
            "h-25C42.3,43.1,43.1,31.5,48.1,26.1z",

            topo: 'M97.2,76.3H86.6l-7.7-21.9H82c1,0,1.9-0.8,1.9-1.9V35.7c' +
            '0-1-0.8-1.9-1.9-1.9H65.2c-1,0-1.9,0.8-1.9,1.9v2.6L33.4,26.1v-11' +
            'c0-1-0.8-1.9-1.9-1.9H14.7c-1,0-1.9,0.8-1.9,1.9v16.8c0,1,0.8,' +
            '1.9,1.9,1.9h16.8c1,0,1.9-0.8,1.9-1.9v-2.6l29.9,12.2v9L30.5,76.9' +
            'c-0.3-0.3-0.8-0.5-1.3-0.5H12.4c-1,0-1.9,0.8-1.9,1.9V95c0,1,0.8,' +
            '1.9,1.9,1.9h16.8c1,0,1.9-0.8,1.9-1.9v-6.9h47.4V95c0,1,0.8,1.9,' +
            '1.9,1.9h16.8c1,0,1.9-0.8,1.9-1.9V78.2C99.1,77.2,98.2,76.3,97.2,' +
            '76.3z M31.1,85.1v-4.9l32.8-26.4c0.3,0.3,0.8,0.5,1.3,0.5h10.5l' +
            '7.7,21.9h-3c-1,0-1.9,0.8-1.9,1.9v6.9H31.1z',

            // --- Navigation glyphs ------------------------------------

            flowTable: 'M15.9,19.1h-8v-13h8V19.1z M90.5,6.1H75.6v13h14.9V6.1z' +
            ' M71.9,6.1H56.9v13h14.9V6.1z M53.2,6.1H38.3v13h14.9V6.1z M34.5,' +
            '6.1H19.6v13h14.9V6.1z M102.2,6.1h-8v13h8V6.1z M102.2,23.6H7.9v' +
            '78.5h94.4V23.6z M86,63.2c0,3.3-2.7,6-6,6c-2.8,0-5.1-1.9-5.8-' +
            '4.5H63.3v5.1c0,0.9-0.7,1.5-1.5,1.5h-5.2v10.6c2.6,0.7,4.5,3,4.5,' +
            '5.8c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6c0-2.8,1.9-5.1,4.4-5.8V71.3' +
            'H48c-0.9,0-1.5-0.7-1.5-1.5v-5.1H36c-0.7,2.6-3,4.4-5.8,4.4c-3.3,' +
            '0-6-2.7-6-6s2.7-6,6-6c2.8,0,5.2,1.9,5.8,4.5h10.5V56c0-0.9,0.7-' +
            '1.5,1.5-1.5h5.5V43.8c-2.6-0.7-4.5-3-4.5-5.8c0-3.3,2.7-6,6-6s6,' +
            '2.7,6,6c0,2.8-1.9,5.1-4.5,5.8v10.6h5.2c0.9,0,1.5,0.7,1.5,1.5v' +
            '5.6h10.8c0.7-2.6,3-4.5,5.8-4.5C83.3,57.1,86,59.8,86,63.2z M55.1,' +
            '42.3c2.3,0,4.3-1.9,4.3-4.3c0-2.3-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,' +
            '4.3C50.8,40.4,52.7,42.3,55.1,42.3z M34.4,63.1c0-2.3-1.9-4.3-4.3' +
            '-4.3s-4.3,1.9-4.3,4.3s1.9,4.3,4.3,4.3S34.4,65.5,34.4,63.1z ' +
            'M55.1,83.5c-2.3,0-4.3,1.9-4.3,4.3s1.9,4.3,4.3,4.3s4.3-1.9,4.3-' +
            '4.3S57.5,83.5,55.1,83.5zM84.2,63.2c0-2.3-1.9-4.3-4.3-4.3s-4.3,' +
            '1.9-4.3,4.3s1.9,4.3,4.3,4.3S84.2,65.5,84.2,63.2z',

            // --- Topology toolbar specific glyphs ----------------------

            summary: "M95.8,9.2H14.2c-2.8,0-5,2.2-5,5v81.5c0,2.8,2.2,5,5," +
            "5h81.5c2.8,0,5-2.2,5-5V14.2C100.8,11.5,98.5,9.2,95.8,9.2z " +
            "M16.7,22.2c0-1.1,0.9-2,2-2h20.1c1.1,0,2,0.9,2,2v20.1c0,1.1-0.9," +
            "2-2,2H18.7c-1.1,0-2-0.9-2-2V22.2z M93,87c0,1.1-0.9,2-2,2H18.9" +
            "c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2H91c1.1,0,2,0.9,2,2V87z " +
            "M93,65c0,1.1-0.9,2-2,2H18.9c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2," +
            "2-2H91c1.1,0,2,0.9,2,2V65z",

            details: "M95.8,9.2H14.2c-2.8,0-5,2.2-5,5v81.5c0,2.8,2.2,5,5," +
            "5h81.5c2.8,0,5-2.2,5-5V14.2C100.8,11.5,98.5,9.2,95.8,9.2z M16.9," +
            "22.2c0-1.1,0.9-2,2-2H91c1.1,0,2,0.9,2,2v7c0,1.1-0.9,2-2,2H18.9c" +
            "-1.1,0-2-0.9-2-2V22.2z M93,87.8c0,1.1-0.9,2-2,2H18.9c-1.1," +
            "0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2H91c1.1,0,2,0.9,2,2V87.8z M93,68.2" +
            "c0,1.1-0.9,2-2,2H18.9c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2H91" +
            "c1.1,0,2,0.9,2,2V68.2z M93,48.8c0,1.1-0.9,2-2,2H19c-1.1,0-2-" +
            "0.9-2-2v-7c0-1.1,0.9-2,2-2H91c1.1,0,2,0.9,2,2V48.8z",

            ports: "M98,9.2H79.6c-1.1,0-2.1,0.9-2.1,2.1v17.6l-5.4,5.4c-1.7" +
            "-1.1-3.8-1.8-6-1.8c-6,0-10.9,4.9-10.9,10.9c0,2.2,0.7,4.3,1.8,6" +
            "l-7.5,7.5c-1.8-1.2-3.9-1.9-6.2-1.9c-6,0-10.9,4.9-10.9,10.9c0," +
            "2.3,0.7,4.4,1.9,6.2l-6.2,6.2H11.3c-1.1,0-2.1,0.9-2.1,2.1v18.4" +
            "c0,1.1,0.9,2.1,2.1,2.1h18.4c1.1,0,2.1-0.9,2.1-2.1v-16l7-6.9" +
            "c1.4,0.7,3,1.1,4.7,1.1c6,0,10.9-4.9,10.9-10.9c0-1.7-0.4-3.3-" +
            "1.1-4.7l8-8c1.5,0.7,3.1,1.1,4.8,1.1c6,0,10.9-4.9,10.9-10.9c0" +
            "-1.7-0.4-3.4-1.1-4.8l6.9-6.9H98c1.1,0,2.1-0.9,2.1-2.1V11.3" +
            "C100.1,10.2,99.2,9.2,98,9.2z M43.4,72c-3.3,0-6-2.7-6-6s2.7-6," +
            "6-6s6,2.7,6,6S46.7,72,43.4,72z M66.1,49.5c-3.3,0-6-2.7-6-6" +
            "c0-3.3,2.7-6,6-6s6,2.7,6,6C72.2,46.8,69.5,49.5,66.1,49.5z",

            map: "M95.8,9.2H14.2c-2.8,0-5,2.2-5,5v66c0.3-1.4,0.7-2.8," +
            "1.1-4.1l1.6,0.5c-0.9,2.4-1.6,4.8-2.2,7.3l-0.5-0.1v12c0,2.8,2.2," +
            "5,5,5h81.5c2.8,0,5-2.2,5-5V14.2C100.8,11.5,98.5,9.2,95.8,9.2z " +
            "M16.5,67.5c-0.4,0.5-0.7,1-1,1.5c-0.3,0.5-0.6,1-0.9,1.6l-1.9-0.9" +
            "c0.3-0.6,0.6-1.2,0.9-1.8c0.3-0.6,0.6-1.2,1-1.7c0.7-1.1,1.5-2.2," +
            "2.5-3.2l1.8,1.8C18,65.6,17.2,66.5,16.5,67.5z M29.7,64.1" +
            "c-0.4-0.4-0.8-0.8-1.2-1.1c-0.1-0.1-0.2-0.1-0.2-0.1c0,0-0.1," +
            "0-0.1-0.1l-0.1,0l0,0l-0.1,0c-0.3-0.1-0.5-0.2-0.8-0.2c-0.5-0.1" +
            "-1.1-0.2-1.6-0.3c-0.6,0-1.1,0-1.6,0l-0.4-2.8c0.7-0.1,1.5-0.2,2.2" +
            "-0.1c0.7,0,1.4,0.1,2.2,0.3c0.4,0.1,0.7,0.2,1,0.3l0.1,0l0,0l0.1," +
            "0l0.1,0c0.1,0,0.1,0,0.3,0.1c0.3,0.1,0.5,0.2,0.7,0.4c0.7,0.5," +
            "1.2,0.9,1.7,1.4L29.7,64.1z M39.4,74.7c-1.8-1.8-3.6-3.8-5.3-5.7" +
            "l2.6-2.4c0.9,0.9,1.8,1.8,2.7,2.7c0.9,0.9,1.8,1.7,2.7,2.6L39.4," +
            "74.7z M50.8,84.2c-1.1-0.7-2.2-1.5-3.3-2.3c-0.5-0.4-1.1-0.8-1.6" +
            "-1.2c-0.5-0.4-1-0.8-1.5-1.2l2.7-3.4c0.5,0.4,1,0.8,1.5,1.1c0.5," +
            "0.3,1,0.7,1.5,1c1,0.7,2.1,1.3,3.1,1.9L50.8,84.2z M61.3," +
            "88.7c-0.7-0.1-1.4-0.3-2.1-0.5c-0.7-0.2-1.4-0.5-2-0.7l1.8" +
            "-4.8c0.6,0.2,1.1,0.4,1.6,0.5c0.5,0.2,1.1,0.3,1.6,0.4c1,0.2,2.1," +
            "0.2,3,0.1l0.7,5.1C64.3,89.1,62.7,88.9,61.3,88.7z M75.1,80.4c" +
            "-0.2,0.7-0.5,1.4-0.9,2c-0.2,0.3-0.3,0.7-0.5,1l-0.3,0.5l-0.3," +
            "0.4l-3.9-2.8l0.3-0.4l0.2-0.3c0.1-0.2,0.3-0.4,0.4-0.7c0.3-0.5," +
            "0.5-0.9,0.7-1.5c0.4-1,0.8-2.1,1.1-3.3l4.2,0.9C75.9,77.7,75.6," +
            "79,75.1,80.4z M73,69.2l0.2-1.9l0.1-1.9c0.1-1.2,0.1-2.5,0.1-" +
            "3.8l2.5-0.2c0.2,1.3,0.4,2.6,0.5,3.9l0.1,2l0.1,2L73,69.2z " +
            "M73,51l0.5-0.1c0.4,1.3,0.8,2.6,1.1,3.9L73.2,55C73.1,53.7,73.1," +
            "52.3,73,51z M91.9,20.4c-0.7,1.4-3.6,3.6-4.2,3.9c-1.5,0.8-5," +
            "2.8-10.1,7.7c3,2.9,5.8,5.4,7.3,6.4c2.6,1.8,3.4,4.3,3.6,6.1c0.1," +
            "1.1-0.1,2.5-0.4,3c-0.5,0.9-1.6,2-3,1.4c-2-0.8-11.5-9.6-13-11c" +
            "-3.5,3.9-7.4,8.9-11.7,15.1c0,0-3.1,3.4-5.2,0.9C52.9,51.5,61," +
            "39.3,61,39.3s2.2-3.1,5.6-7c-2.9-3-5.9-6.3-6.6-7.3c0,0-3.7-5-1.3" +
            "-6.6c3.2-2.1,6.3,0.8,6.3,0.8s3.1,3.3,7,7.2c4.7-4.7,10.1-9.2," +
            "14.7-10c0,0,3.3-1,5.2,1.7C92.5,18.8,92.4,19.6,91.9,20.4z",

            cycleLabels: "M72.5,33.9c0,0.6-0.2,1-0.5,1H40c-0.3,0-0.5-0.4" +
            "-0.5-1V20.7c0-0.6,0.2-1,0.5-1h32c0.3,0,0.5,0.4,0.5,1V33.9z " +
            "M41.2,61.8c0-0.6-0.2-1-0.5-1h-32c-0.3,0-0.5,0.4-0.5,1V75c0,0.6," +
            "0.2,1,0.5,1h32c0.3,0,0.5-0.4,0.5-1V61.8z M101.8,61.8c0-0.6-0.2" +
            "-1-0.5-1h-32c-0.3,0-0.5,0.4-0.5,1V75c0,0.6,0.2,1,0.5,1h32c0.3," +
            "0,0.5-0.4,0.5-1V61.8z M17.2,52.9c0-0.1-0.3-7.1,4.6-13.6l-2.4-1.8" +
            "c-5.4,7.3-5.2,15.2-5.1,15.5L17.2,52.9z M12.7,36.8l7.4,2.5l1.5," +
            "7.6L29.5,31L12.7,36.8z M94.2,42.3c-2.1-8.9-8.3-13.7-8.6-13.9l" +
            "-1.8,2.4c0.1,0,5.6,4.3,7.5,12.2L94.2,42.3z M99,37.8l-6.6,4.1l" +
            "-6.8-3.7l7.1,16.2L99,37.8z M69,90.2l-1.2-2.8c-0.1,0-6.6,2.8" +
            "-14.3,0.6l-0.8,2.9c2.5,0.7,4.9,1,7,1C65,91.8,68.7,90.2,69,90.2z " +
            "M54.3,97.3L54,89.5l6.6-4.1l-17.6-1.7L54.3,97.3z",

            oblique: "M80.9,30.2h4.3l15-16.9H24.8l-15,16.9h19v48.5h-4l-15," +
            "16.9h75.3l15-16.9H80.9V30.2z M78.6,78.7H56.1V30.2h22.5V78.7z" +
            "M79.7,17.4c2.4,0,4.3,1.9,4.3,4.3c0,2.4-1.9,4.3-4.3,4.3s-4.3" +
            "-1.9-4.3-4.3C75.4,19.3,77.4,17.4,79.7,17.4z M55,17.4c2.4,0," +
            "4.3,1.9,4.3,4.3c0,2.4-1.9,4.3-4.3,4.3s-4.3-1.9-4.3-4.3C50.7," +
            "19.3,52.6,17.4,55,17.4z M26.1,21.7c0-2.4,1.9-4.3,4.3-4.3c2.4," +
            "0,4.3,1.9,4.3,4.3c0,2.4-1.9,4.3-4.3,4.3C28,26,26.1,24.1,26.1," +
            "21.7z M31.1,30.2h22.6v48.5H31.1V30.2z M30.3,91.4c-2.4,0-4.3" +
            "-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3c2.4,0,4.3,1.9,4.3,4.3C34.6," +
            "89.5,32.7,91.4,30.3,91.4z M54.9,91.4c-2.4,0-4.3-1.9-4.3-4.3c0" +
            "-2.4,1.9-4.3,4.3-4.3c2.4,0,4.3,1.9,4.3,4.3C59.2,89.5,57.3," +
            "91.4,54.9,91.4z M84,87.1c0,2.4-1.9,4.3-4.3,4.3c-2.4,0-4.3-1.9" +
            "-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3C82.1,82.8,84,84.7,84,87.1z",

            filters: "M24.8,13.3L9.8,40.5h75.3l15.0-27.2H24.8z M72.8,32.1l-" +
            "9.7-8.9l-19.3,8.9l-6.0-7.4L24.1,30.9l-1.2-2.7l15.7-7.1l6.0,7.4" +
            "l19.0-8.8l9.7,8.8l11.5-5.6l1.3,2.7L72.8,32.1zM24.3,68.3L9.3," +
            "95.5h75.3l15.0-27.2H24.3z M84.3,85.9L70.7,79.8l-6.0,7.4l-19.3" +
            "-8.9l-9.7,8.9l-13.3-6.5l1.3-2.7l11.5,5.6l9.7-8.8l19.0,8.8l6.0" +
            "-7.4l15.7,7.1L84.3,85.9z M15.3,57h-6v-4h6V57zM88.1,57H76.0v-4h" +
            "12.1V57z M69.9,57H57.8v-4h12.1V57z M51.7,57H39.6v-4H51.7V57z " +
            "M33.5,57H21.4v-4h12.1V57zM100.2,57h-6v-4h6V57z",

            resetZoom: "M86,79.8L61.7,54.3c1.8-2.9,2.8-6.3,2.9-10c0.3-11.2" +
            "-8.6-20.5-19.8-20.8C33.7,23.2,24.3,32,24.1,43.2c-0.3,11.2,8.6," +
            "20.5,19.8,20.8c4,0.1,8.9-0.8,11.9-3.6l23.7,25c1.5,1.6,4,2.3," +
            "5.3,1l1.6-1.6C87.7,83.7,87.5,81.4,86,79.8z M31.4,43.4c0.2-7.1," +
            "6.1-12.8,13.2-12.6C51.8,31,57.5,37,57.3,44.1c-0.2,7.1-6.1,12.8" +
            "-13.2,12.6C36.9,56.5,31.3,50.6,31.4,43.4zM22.6,104H6V86.4c0" +
            "-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1v11.4h10.4c1.7,0,3.1,1.4," +
            "3.1,3.1S24.3,104,22.6,104z M25.7,9.1c0,1.7-1.4,3.1-3.1,3.1" +
            "H12.2v11.4c0,1.7-1.4,3.1-3.1,3.1S6,25.3,6,23.6V6h16.6C24.3,6," +
            "25.7,7.4,25.7,9.1z M84.3,100.9c0-1.7,1.4-3.1,3.1-3.1h10.4V86.4" +
            "c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1V104H87.4C85.7,104,84.3," +
            "102.6,84.3,100.9z M87.4,6H104v17.6c0,1.7-1.4,3.1-3.1,3.1s-3.1" +
            "-1.4-3.1-3.1V12.2H87.4c-1.7,0-3.1-1.4-3.1-3.1S85.7,6,87.4,6z",

            relatedIntents: "M99.9,43.7v22.6c0,1.9-1.5,3.4-3.4,3.4H73.9c" +
            "-1.9,0-3.4-1.5-3.4-3.4V43.7c0-1.9,1.5-3.4,3.4-3.4h22.6C98.4," +
            "40.3,99.9,41.8,99.9,43.7z M48.4,46.3l6.2,6.7h-4.6L38.5,38v9.7" +
            "l4.7,5.3H10.1V57h33.2l-4.8,5.3v9.5L49.8,57h5.1v0l-6.5,7v11.5" +
            "L64.1,55L48.4,34.4V46.3z",

            nextIntent: "M88.1,55.7L34.6,13.1c0,0-1.6-0.5-2.1-0.2c-1.9,1.2" +
            "-6.5,13.8-3.1,17.2c7,6.9,30.6,24.5,32.4,25.9c-1.8,1.4-25.4,19" +
            "-32.4,25.9c-3.4,3.4,1.2,16,3.1,17.2c0.6,0.4,2.1-0.2,2.1-0.2" +
            "s53.1-42.4,53.5-42.7C88.5,56,88.1,55.7,88.1,55.7z",

            prevIntent: "M22.5,55.6L76,12.9c0,0,1.6-0.5,2.2-0.2c1.9,1.2," +
            "6.5,13.8,3.1,17.2c-7,6.9-30.6,24.5-32.4,25.9c1.8,1.4,25.4,19," +
            "32.4,25.9c3.4,3.4-1.2,16-3.1,17.2c-0.6,0.4-2.2-0.2-2.2-0.2" +
            "S22.9,56.3,22.5,56C22.2,55.8,22.5,55.6,22.5,55.6z",

            intentTraffic: "M14.7,71.5h-6v-33h6V71.5z M88.5,38.5H76.9v33" +
            "h11.7V38.5z M70.1,38.5H58.4v33h11.7V38.5z M51.6,38.5H39.9v33" +
            "h11.7V38.5z M33.1,38.5H21.5v33h11.7V38.5z M101.3,38.5h-6v33h6" +
            "V38.5z",

            allTraffic: "M15.7,64.5h-7v-19h7V64.5z M78.6,45.5H62.9v19h15.7" +
            "V45.5z M47.1,45.5H31.4v19h15.7V45.5z M101.3,45.5h-7v19h7V45.5z" +
            "M14.7,14.1h-6v19h6V14.1z M88.5,14.1H76.9v19h11.7V14.1z M70.1," +
            "14.1H58.4v19h11.7V14.1z M51.6,14.1H39.9v19h11.7V14.1z M33.1,14.1" +
            "H21.5v19h11.7V14.1z M101.3,14.1h-6v19h6V14.1z M14.7,76.9h-6v19" +
            "h6V76.9z M88.5,76.9H76.9v19h11.7V76.9z M70.1,76.9H58.4v19h11.7" +
            "V76.9z M51.6,76.9H39.9v19h11.7V76.9z M33.1,76.9H21.5v19h11.7" +
            "V76.9z M101.3,76.9h-6v19h6V76.9z",

            flows: "M93.8,46.1c-4.3,0-8,3-9,7H67.9v-8.8c0-1.3-1.1-2.4-2.4" +
            "-2.4h-8.1V25.3c4-1,7-4.7,7-9.1c0-5.2-4.2-9.4-9.4-9.4c-5.2,0" +
            "-9.4,4.2-9.4,9.4c0,4.3,3,8,7,9v16.5H44c-1.3,0-2.4,1.1-2.4,2.4" +
            "v8.8H25.3c-1-4.1-4.7-7.1-9.1-7.1c-5.2,0-9.4,4.2-9.4,9.4s4.2," +
            "9.4,9.4,9.4c4.3,0,8-2.9,9-6.9h16.4v7.9c0,1.3,1.1,2.4,2.4,2.4" +
            "h8.6v16.6c-4,1.1-6.9,4.7-6.9,9c0,5.2,4.2,9.4,9.4,9.4c5.2,0," +
            "9.4-4.2,9.4-9.4c0-4.4-3-8-7.1-9.1V68.2h8.1c1.3,0,2.4-1.1,2.4" +
            "-2.4v-7.9h16.8c1.1,4,4.7,7,9,7c5.2,0,9.4-4.2,9.4-9.4S99,46.1," +
            "93.8,46.1z M48.7,16.3c0-3.5,2.9-6.4,6.4-6.4c3.5,0,6.4,2.9,6.4," +
            "6.4s-2.9,6.4-6.4,6.4C51.5,22.6,48.7,19.8,48.7,16.3zM16.2,61.7c" +
            "-3.5,0-6.4-2.9-6.4-6.4c0-3.5,2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4" +
            "C22.6,58.9,19.7,61.7,16.2,61.7z M61.4,93.7c0,3.5-2.9,6.4-6.4," +
            "6.4c-3.5,0-6.4-2.9-6.4-6.4c0-3.5,2.9-6.4,6.4-6.4C58.6,87.4," +
            "61.4,90.2,61.4,93.7z M93.8,61.8c-3.5,0-6.4-2.9-6.4-6.4c0-3.5," +
            "2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4C100.1,58.9,97.3,61.8,93.8,61.8z",

            eqMaster: "M100.1,46.9l-10.8-25h0.2c0.5,0,0.8-0.5,0.8-1.1v-3.2" +
            "c0-0.6-0.4-1.1-0.8-1.1H59.2v-5.1c0-0.5-0.8-1-1.7-1h-5.1c-0.9,0" +
            "-1.7,0.4-1.7,1v5.1l-30.2,0c-0.5,0-0.8,0.5-0.8,1.1v3.2c0,0.6," +
            "0.4,1.1,0.8,1.1h0.1l-10.8,25C9,47.3,8.4,48,8.4,48.8v1.6l0,0h0" +
            "v6.4c0,1.3,1.4,2.3,3.2,2.3h21.7c1.8,0,3.2-1,3.2-2.3v-8c0-0.9" +
            "-0.7-1.6-1.7-2L22.9,21.9h27.9v59.6l-29,15.9c0,1.2,1.8,2.2,4.1," +
            "2.2h58.3c2.3,0,4.1-1,4.1-2.2l-29-15.9V21.9h27.8L75.2,46.8c-1," +
            "0.4-1.7,1.1-1.7,2v8c0,1.3,1.4,2.3,3.2,2.3h21.7c1.8,0,3.2-1,3.2" +
            "-2.3v-8C101.6,48,101,47.3,100.1,46.9z M22,23.7l10.8,22.8H12.1" +
            "L22,23.7z M97.9,46.5H77.2L88,23.7L97.9,46.5z"
        },

        badgeDataSet = {
            _viewbox: "0 0 10 10",

            uiAttached: "M2,2.5a.5,.5,0,0,1,.5-.5h5a.5,.5,0,0,1,.5,.5v3" +
            "a.5,.5,0,0,1-.5,.5h-5a.5,.5,0,0,1-.5-.5zM2.5,2.8a.3,.3,0,0,1," +
            ".3-.3h4.4a.3,.3,0,0,1,.3,.3v2.4a.3,.3,0,0,1-.3,.3h-4.4" +
            "a.3,.3,0,0,1-.3-.3zM2,6.55h6l1,1.45h-8z",

            checkMark: "M2.6,4.5c0,0,0.7-0.4,1.2,0.3l1.0," +
            "1.8c0,0,2.7-5.4,2.8-5.7c0,0,0.5-0.9,1.4-0.1c0," +
            "0,0.5,0.5,0,1.3S6.8,7.3,5.6,9.2c0,0-0.4," +
            "0.5-1.2,0.1S2.2,5.4,2.2,5.4S2.2,4.7,2.6,4.5z",

            xMark: "M9.0,7.2C8.2,6.9,7.4,6.1,6.7,5.2c0.4-0.5," +
            "0.7-0.8,0.8-1.0C7.8,3.5,9.4,1.6,8.1,1.1" +
            "C6.8,0.6,6.6,1.7,6.6,1.7C6.4,2.1,6.0,2.7,5.4," +
            "3.4C4.9,2.5,4.5,1.9,4.5,1.9" +
            "S3.8,0.2,2.9,0.7C1.9,1.1,2.3,2.3,2.3,2.3c0.3,1.1,0.8,2.1,1.4,2.9" +
            "C2.5,6.4,1.3,7.4,1.3,7.4S0.8,7.8,0.8,8.1C0.9,8.3,0.9,9.6,2.4,9.1" +
            "C3.1,8.8,4.1,7.9,5.1,7.0c1.3,1.3,2.5,1.9,2.5,1.9s0.5,0.5,1.4-0.2" +
            "C9.8,7.9,9.0,7.2,9.0,7.2z",

            triangleUp: "M0.5,6.2c0,0,3.8-3.8,4.2-4.2C5,1.7,5.3,2,5.3,2l4.3," +
            "4.3c0,0,0.4,0.4-0.1,0.4c-1.7,0-8.2,0-8.8,0C0,6.6,0.5,6.2,0.5,6.2z",

            triangleDown: "M9.5,4.2c0,0-3.8,3.8-4.2,4.2c-0.3,0.3-0.5,0-0.5," +
            "0L0.5,4.2c0,0-0.4-0.4,0.1-0.4c1.7,0,8.2,0,8.8,0C10,3.8,9.5,4.2," +
            "9.5,4.2z",

            plus: "M4,2h2v2h2v2h-2v2h-2v-2h-2v-2h2z",

            minus: "M2,4h6v2h-6z",

            play: "M2.5,2l5.5,3l-5.5,3z",

            stop: "M2.5,2.5h5v5h-5z"
        },

        spriteData = {
            _cloud: '0 0 110 110',
            cloud: "M37.6,79.5c-6.9,8.7-20.4,8.6-22.2-2.7" +
            "M16.3,41.2c-0.8-13.9,19.4-19.2,23.5-7.8" +
            "M38.9,30.9c5.1-9.4,15.1-8.5,16.9-1.3" +
            "M54.4,32.9c4-12.9,14.8-9.6,18.6-3.8" +
            "M95.8,58.5c10-4.1,11.7-17.8-0.9-19.8" +
            "M18.1,76.4C5.6,80.3,3.8,66,13.8,61.5" +
            "M16.2,62.4C2.1,58.4,3.5,36,16.8,36.6" +
            "M93.6,74.7c10.2-2,10.7-14,5.8-18.3" +
            "M71.1,79.3c11.2,7.6,24.6,6.4,22.1-11.7" +
            "M36.4,76.8c3.4,13.3,35.4,11.6,36.1-1.4" +
            "M70.4,31c11.8-10.4,26.2-5.2,24.7,10.1"
        };

    // ----------------------------------------------------------------------
    // === Constants

    var msgGS = 'GlyphService.',
        rg = "registerGlyphs(): ",
        rgs = "registerGlyphSet(): ";

    // ----------------------------------------------------------------------

    function warn(msg) {
        $log.warn(msgGS + msg);
    }

    function addToMap(key, value, vbox, overwrite, dups) {
        if (!overwrite && glyphs.get(key)) {
            dups.push(key);
        } else {
            glyphs.set(key, {id: key, vb: vbox, d: value});
        }
    }

    function reportDups(dups, which) {
        var ok = (dups.length == 0),
            msg = 'ID collision: ';

        if (!ok) {
            dups.forEach(function (id) {
                warn(which + msg + '"' + id + '"');
            });
        }
        return ok;
    }

    function reportMissVb(missing, which) {
        var ok = (missing.length == 0),
            msg = 'Missing viewbox property: ';

        if (!ok) {
            missing.forEach(function (vbk) {
                warn(which + msg + '"' + vbk + '"');
            });
        }
        return ok;
    }

    // ----------------------------------------------------------------------
    // === API functions ===

    function clear() {
        // start with a fresh map
        glyphs = d3.map();
    }

    function init() {
        clear();
        registerGlyphs(birdData);
        registerGlyphSet(glyphDataSet);
        registerGlyphSet(badgeDataSet);
        registerGlyphs(spriteData);
    }

    function registerGlyphs(data, overwrite) {
        var dups = [],
            missvb = [];

        angular.forEach(data, function (value, key) {
            var vbk = '_' + key,
                vb = data[vbk];

            if (key[0] !== '_') {
                if (!vb) {
                    missvb.push(vbk);
                    return;
                }
                addToMap(key, value, vb, overwrite, dups);
            }
        });
        return reportDups(dups, rg) && reportMissVb(missvb, rg);
    }

    function registerGlyphSet(data, overwrite) {
        var dups = [],
            vb = data._viewbox;

        if (!vb) {
            warn(rgs + 'no "_viewbox" property found');
            return false;
        }

        angular.forEach(data, function (value, key) {
            if (key[0] !== '_') {
                addToMap(key, value, vb, overwrite, dups);
            }
        });
        return reportDups(dups, rgs);
    }

    function ids() {
        return glyphs.keys();
    }

    function glyph(id) {
        return glyphs.get(id);
    }

    // Note: defs should be a D3 selection of a single <defs> element
    function loadDefs(defs, glyphIds, noClear) {
        var list = fs.isA(glyphIds) || ids(),
            clearCache = !noClear;

        if (clearCache) {
            // remove all existing content
            defs.html(null);
        }

        // load up the requested glyphs
        list.forEach(function (id) {
            var g = glyph(id);
            if (g) {
                if (noClear) {
                    // quick exit if symbol is already present
                    if (defs.select('symbol#' + g.id).size() > 0) {
                        return;
                    }
                }
                defs.append('symbol')
                    .attr({ id: g.id, viewBox: g.vb })
                    .append('path').attr('d', g.d);
            }
        });
    }

    // trans can specify translation [x,y]
    function addGlyph(elem, glyphId, size, overlay, trans) {
        var sz = size || 40,
            ovr = !!overlay,
            xns = fs.isA(trans),
            atr = {
                width: sz,
                height: sz,
                'class': 'glyph',
                'xlink:href': '#' + glyphId
            };

        if (xns) {
            atr.transform = sus.translate(trans);
        }
        return elem.append('use').attr(atr).classed('overlay', ovr);
    }

    // ----------------------------------------------------------------------

    angular.module('onosSvg')
    .factory('GlyphService',
        ['$log', 'FnService', 'SvgUtilService',

        function (_$log_, _fs_, _sus_) {
            $log = _$log_;
            fs = _fs_;
            sus = _sus_;

            return {
                clear: clear,
                init: init,
                registerGlyphs: registerGlyphs,
                registerGlyphSet: registerGlyphSet,
                ids: ids,
                glyph: glyph,
                loadDefs: loadDefs,
                addGlyph: addGlyph
            };
        }]
    );

}());
