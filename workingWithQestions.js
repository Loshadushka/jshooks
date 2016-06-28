function testing_workingWithQuestion(question) {
    if (question.kind == "tbsDocumentReview") {
        if (document.querySelector(".identifier").innerHTML.replace("(", "").replace(")", "") == question.identifier) {
            testing_wholeProcessedAnswersCount = 0;
            testing_delay = 500;
            testing_questionPointer = 0;
            testing_pressButtonInARow = setTimeout(function () {
                var answer = question.correctAnswers[testing_questionPointer] - testing_wholeProcessedAnswersCount - 1;
                setTimeout(function (i) {
                    document.querySelectorAll("div.assessment_question:not([style='display: none;']) span.answer_choice")[i].click();
                }, 100, testing_questionPointer);
                setTimeout(function (i, answer) {
                    document.querySelectorAll("div.assessment_question:not([style='display: none;']) div.answer_box")[i].querySelectorAll("label")[answer].click();
                }, 200, testing_questionPointer, answer);
                setTimeout(function (i) {
                    document.querySelectorAll("div.assessment_question:not([style='display: none;']) div.button_box")[i].querySelector("button.accept_button").click();
                }, 300, testing_questionPointer);
                testing_wholeProcessedAnswersCount = testing_wholeProcessedAnswersCount + document.querySelectorAll("div.assessment_question:not([style='display: none;']) div.answer_box")[testing_questionPointer].querySelectorAll("label").length;
                testing_questionPointer++;
                testing_pressButtonInARow = setTimeout(arguments.callee, testing_delay);
                if (testing_questionPointer == question.correctAnswers.length) {
                    clearTimeout(testing_pressButtonInARow);

                }
            }, testing_delay);


        }


    }
    if (question.kind == "tbsResearch") {
        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {

            if (document.querySelectorAll("div.assessment_question:not([style='display: none;']) input").length == 4) {


                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input").forEach(function (item, index) {

                    item.value = question.correctAnswers[0][index];
                    $(".assessment_question[data-guid='" + question.guid + "'] input").eq(index).change();
                })


            }
            else {
                document.querySelector(".assessment_question[data-guid='" + question.guid + "'] select").value = question.correctAnswers[0][0];
                document.querySelectorAll(".assessment_question[data-guid='" + question.guid + "'] input")[0].value = question.correctAnswers[0][1];
                document.querySelectorAll(".assessment_question[data-guid='" + question.guid + "'] input")[1].value = question.correctAnswers[0][2];
                $(".assessment_question[data-guid='" + question.guid + "'] input").eq(0).change();
            }
        }


    }


    if (question.kind == "tbsGeneral" && question["sub-kind"] == "infosheet") {

        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {

            if (document.querySelectorAll("div.assessment_question:not([style='display: none;']) select.mcq").length > 0) {

                testing_wholeProcessedAnswersCount = 0;
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) .answer_box").forEach(function (item, index) {
                    $(item).dblclick();
                    var answer = question.correctAnswers[index] - testing_wholeProcessedAnswersCount - 1;
                    testing_wholeProcessedAnswersCount = testing_wholeProcessedAnswersCount + document.querySelectorAll(".pv5_lightbox_wrapper.infosheet_lb li").length;
                    document.querySelectorAll(".pv5_lightbox_wrapper.infosheet_lb li")[answer].click();


                })


            }
            else {


                for (var i = 0; i < question.correctAnswers.length; i++) {
                    document.querySelectorAll(".assessment_question[data-guid='" + question.guid + "'] .textfield input")[i].value = question.correctAnswers[i];
                    $(".assessment_question[data-guid='" + question.guid + "'] .textfield input").eq(i).change();
                }
            }
        }
    }

    if (question.kind == "tbsGeneral" && question["sub-kind"] == "yesNo") {


        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {


            question.correctAnswers.forEach(function (item) {


                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input.truefalse")[item - 1].click();

            })


        }


    }


    if (question.kind == "tbsGeneral" && question["sub-kind"] == "spreadsheet") {

        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {


            if (document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([style='border: none; background: lightgrey; color: black;']").length > 0) {


                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([style='border: none; background: lightgrey; color: black;']").forEach(function (item, index) {

                    item.value = question.correctAnswers[index];
                    $(".assessment_question[data-guid='" + question.guid + "'] input").eq(index).change();
                })


            }

            else {

                testing_wholeProcessedAnswersCount = 0;
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) .answer_box").forEach(function (item, index) {
                    $(item).dblclick();
                    var answer = question.correctAnswers[index] - testing_wholeProcessedAnswersCount;
                    testing_wholeProcessedAnswersCount = testing_wholeProcessedAnswersCount + document.querySelectorAll(".pv5_lightbox_wrapper li").length;
                    document.querySelectorAll(".pv5_lightbox_wrapper li")[answer - 1].click();


                })
            }


        }
    }

}
