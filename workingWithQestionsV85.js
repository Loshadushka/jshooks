function testing_workingWithQuestion(question) {
    if (question.kind == "tbsDocumentReview") {
        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {
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

            if (document.querySelectorAll("div.assessment_question[data-guid='" + question.guid + "']:not([style='display: none;']) input:not([disabled])").length == 4) {


                document.querySelectorAll("div.assessment_question[data-guid='" + question.guid + "']:not([style='display: none;']) input:not([disabled])").forEach(function (item, index) {

                    item.value = question.correctAnswers[0][index];
                    $(".assessment_question[data-guid='" + question.guid + "'] input:not([disabled])").eq(index).keyup();
                })


            }
            else {
                document.querySelector(".assessment_question[data-guid='" + question.guid + "'] select:not([disabled])").value = question.correctAnswers[0][0];
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([disabled])")[0].value = question.correctAnswers[0][1];
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([disabled])")[1].value = question.correctAnswers[0][2];
                $(".assessment_question[data-guid='" + question.guid + "'] input:not([disabled])").eq(0).keyup();
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
                    testing_wholeProcessedAnswersCount = testing_wholeProcessedAnswersCount + document.querySelectorAll(".infosheet_selector li").length;
                    document.querySelectorAll(".infosheet_selector li a")[answer].click();
                    document.querySelector("button.ok-button").click();
                })
            }
            else {
                for (var i = 0; i < question.correctAnswers.length; i++) {
                    document.querySelectorAll(".assessment_question[data-guid='" + question.guid + "'] .textfield input")[i].value = Object.values(question.correctAnswers[i])[0];
                    $(".assessment_question[data-guid='" + question.guid + "'] .textfield input").eq(i).change();
                }
            }
        }
    }

    if (question.kind == "tbsGeneral" && question["sub-kind"] == "yesNo") {


        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {


            question.correctAnswers.forEach(function (item) {


                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input.truefalse +div")[item - 1].click();

            })


        }


    }


    if (question.kind == "tbsGeneral" && question["sub-kind"].includes("spreadsheet")) {

        if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {


            if (document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([style='border: none; background: lightgrey; color: black;']").length > 0) {


                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([style='border: none; background: lightgrey; color: black;']").forEach(function (item, index) {

                    item.value = Object.values(question.correctAnswers[index])[0];
                    $(".assessment_question[data-guid='" + question.guid + "'] input").eq(index).change();
                })


            }

            else {

                testing_wholeProcessedAnswersCount = 0;
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) .answer_box").forEach(function (item, index) {
                    $(item).dblclick();
                    var answer = question.correctAnswers[index] - testing_wholeProcessedAnswersCount;
                    testing_wholeProcessedAnswersCount = testing_wholeProcessedAnswersCount + document.querySelectorAll(".infosheet_selector li").length;
                    document.querySelectorAll(".infosheet_selector li a")[answer - 1].click();
                    document.querySelector("button.ok-button").click();


                })
            }


        }
    }

}
