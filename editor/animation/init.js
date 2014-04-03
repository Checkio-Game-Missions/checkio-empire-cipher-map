//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });


        function convertStringsTo2D (strings) {
            var strings2D = [];
            for (var i =0; i < strings.length; i++) {
                strings2D.push(strings[i].split(''));
            }
            return strings2D;
        }

        function createTableFrom2D (array2D ) {
            var $table = $("<table></table>");
            for (var i=0; i < array2D.length; i++) {
                var $tr = $("<tr></tr>");
                for (var j=0; j < array2D[i].length; j++) {
                    $tr.append($("<td>").html(array2D[i][j]))
                }
                $table.append($tr);
            }
            return $table;
        }

        function rotateSquareMatrixCW (matrix) {
            var rotatedMatrix = [];
            var N = matrix.length;
            for (var i=0; i < N; i++) {
                var tempArray = [];
                for (var j=0; j < N; j++) {
                    tempArray.push(matrix[N-j-1][i]);
                }
                rotatedMatrix.push(tempArray);
            }
            return rotatedMatrix;
        }

        function mergeGrillePassword (grille, cpassword) {
            var resultMatrix = [];
            var resultStr = '';
            for (var i=0; i < grille.length; i++) {
                var tempArray = [];
                for (var j=0; j < grille[i].length; j++) {
                    if (grille[i][j] == 'X') {
                        tempArray.push(cpassword[i][j]);
                        resultStr += cpassword[i][j];
                    }
                    else {
                        tempArray.push('.');
                    }
                }
                resultMatrix.push(tempArray);
            }
            return [resultMatrix, resultStr];
        }

        function collectDataFromTable ($table, size) {
            var array2D = [];
            var tds = $table.find("td");
            var vsize = Math.floor(tds.length / size);
            for (var i=0; i < vsize; i++) {
                var tempArray = [];
                for (var j=0; j <size; j++) {
                    var k = i * vsize + j;
                    var $inElement = $(tds[k]).find("*");
                    tempArray.push($inElement.html() || $inElement.val());
                }
                array2D.push(tempArray);
            }
            return array2D;
        }

        function fillBlue() {
            if ($(this).html() == '.') {
                $(this).addClass("fill-blue");
            }
        }


        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            var convertedInput = '[["' + [checkioInput[0].join('","'), checkioInput[1].join('","')].join('"], ["') + '"]]';

            var $explanation = $content.find(".explanation");

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + convertedInput + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + convertedInput + ')');
                $content.find('.answer').remove();
            }

            var grille = convertStringsTo2D(checkioInput[0]);
            var cpassword = convertStringsTo2D(checkioInput[1]);

            var $grilleTable = createTableFrom2D(grille);
            var $cpasswordTable = createTableFrom2D(cpassword);


            var $grilleTd = $explanation.find("table .td-grille");
            var $cpasswordTd = $explanation.find("table .td-cpassword");

            $grilleTd.append($grilleTable);
            $cpasswordTd.append($cpasswordTable);

            $grilleTable.find("td").each(function() {
                if ($(this).html() != 'X') {
                    $(this).addClass("fill-blue");
                }
            });



            for (var k=1; k <= 4; k++) {
                var mergeResult = mergeGrillePassword(grille, cpassword);
                var $iterationTable = createTableFrom2D(mergeResult[0]);
                var $iterationTd = $explanation.find("table .td-iteration" + k);
                var $iterationResultTd = $explanation.find("table .td-iteration-result" + k);
                $iterationResultTd.html('"' + mergeResult[1] + '"');
                $iterationTd.append($iterationTable);
                $iterationTable.find("td").each(fillBlue);

                grille = rotateSquareMatrixCW(grille);
            }

            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;

        ext.set_console_process_ret(function(this_e, ret){
            $tryit.find(".checkio-result").html('Password: '+ ret);
        });

        ext.set_generate_animation_panel(function(this_e){
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");
            var tGrille = [["X", ".", ".", "X"],[".", "X", "X", "."],[".", ".", ".", "."],[".", ".", ".", "."]];
            var tCpassword = [["a", "b", "c", "d"],["e", "f", "g", "h"],["i", "j", "l", "k"],["m", "n", "o", "p"]];

            var $tGrilleTd = $tryit.find(".td-input-grille");
            var $tCpasswordTd = $tryit.find(".td-input-cpassword");

            var $tGrilleTable = createTableFrom2D(tGrille);
            var $tCpasswordTable = createTableFrom2D(tCpassword);

            $tGrilleTd.append($tGrilleTable);
            $tCpasswordTd.append($tCpasswordTable);

            $tGrilleTable.find("td").each(function() {
                var $td = $(this);
                var value = $td.html();
                $td.html('');
                var $button = $("<button>").html(value);
                $button.click(function() {
                    if ($(this).html() == 'X'){
                        $(this).html('.');
                    }
                    else {
                        $(this).html('X');
                    }
                    return false;
                });
                $button.addClass("btn-grille");
                $td.append($button);
            });

            var inputCount = 1;
            $tCpasswordTable.find("td").each(function() {
                    var $td = $(this);
                    var value = $td.html();
                    $td.html('');
                    var $input = $("<input>");
                    $input.val(value);
                    $input.attr("type", "text");
                    $input.attr("maxlength", "1");
                    $input.addClass("input-cpassword");
                    $input.addClass("input-count" + inputCount);
                    inputCount++;
                    $input.keyup(function() {
                        if ($(this).val().length >= 1){

                            var countRe = $(this).attr("class").match(/input-count(\d+)/);
                            if (countRe !== null) {
                                var count = parseInt(countRe[1]);
                                count = count >= (inputCount - 1) ? 1 : count+1;
                            }
                            $tCpasswordTable.find(".input-count" + count).focus();

                        }
                    });
                    $input.focus(function() {
                        $(this).select();
                        this.onmouseup = function() {
                            // Prevent further mouseup intervention
                            this.onmouseup = null;
                            return false;
                        };
                    });
                    $td.append($input);
                }
            );

            $tryit.find("form").submit(function(e) {
                tGrille = collectDataFromTable($tGrilleTable, 4);
                tCpassword = collectDataFromTable($tCpasswordTable, 4);
                this_e.sendToConsoleCheckiO([tGrille, tCpassword]);
                e.stopPropagation();
                return false;
            });
        });

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";
        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
