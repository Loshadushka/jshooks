function testing_workingWithQuestion(question) {
    if (document.querySelector("div.assessment_question:not([style='display: none;'])").dataset.guid == question.guid) {
        if (question.kind == "tbsDocumentReview") {
            testing_wholeProcessedAnswersCount = 0;
            testing_delay = 500;
            testing_questionPointer = 0;
            testing_pressButtonInARow = setTimeout(function() {
                var answer = question.correctAnswers[testing_questionPointer] - testing_wholeProcessedAnswersCount - 1;
                setTimeout(function(i) {
                    document.querySelectorAll("div.assessment_question:not([style='display: none;']) span.answer_choice")[i].click();
                }, 100, testing_questionPointer);
                setTimeout(function(i, answer) {
                    document.querySelectorAll("div.assessment_question:not([style='display: none;']) div.answer_box")[i].querySelectorAll("label")[answer].click();
                }, 200, testing_questionPointer, answer);
                setTimeout(function(i) {
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
        if (question.kind == "tbsResearch") {

            if (document.querySelectorAll("div.assessment_question[data-guid='" + question.guid + "']:not([style='display: none;']) input:not([disabled])").length == 4) {

                document.querySelectorAll("div.assessment_question[data-guid='" + question.guid + "']:not([style='display: none;']) input:not([disabled])").forEach(function(item, index) {

                    item.value = question.correctAnswers[0][index];
                    $(".assessment_question[data-guid='" + question.guid + "'] input:not([disabled])").eq(index).keyup();
                })

            } else {
                document.querySelector(".assessment_question[data-guid='" + question.guid + "'] select:not([disabled])").value = question.correctAnswers[0][0];
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([disabled])")[0].value = question.correctAnswers[0][1];
                document.querySelectorAll("div.assessment_question:not([style='display: none;']) input:not([disabled])")[1].value = question.correctAnswers[0][2];
                $(".assessment_question[data-guid='" + question.guid + "'] input:not([disabled])").eq(0).keyup();
            }

        }

        if (question.kind == "tbsGeneral" && question["sub-kind"] == "infosheet") {

            answerOnInfosheetSpreadsheetQuestions.apply(question);

        }

        if (question.kind == "tbsGeneral" && question["sub-kind"] == "yesNo") {

            question.correctAnswers.forEach(function(item) {

                document.querySelector("div.assessment_question:not([style='display: none;']) #" + item + " +div").click();

            })

        }

        if (question.kind == "tbsGeneral" && question["sub-kind"].includes("spreadsheet")) {

            answerOnInfosheetSpreadsheetQuestions.apply(question);

        }
    }
}

function answerOnInfosheetSpreadsheetQuestions() {

    this.correctAnswers.forEach(item=>{
        if (typeof item == "string") {

            $("#assessmentWidget div.assessment_question:not([style='display: none;']) select.mcq option[id='" + item + "']").parent().parent().click();
            $(".popup_entry_list input[value='" + item + "']").click();
            $(".action_accept").click();
        } else {
            $("#assessmentWidget div.assessment_question:not([style='display: none;']) .text_entry input[id='" + Object.keys(item)[0] + "']").parent().parent().click()
            $(".text_entry_input")[0].value = Object.values(item)[0];
            $(".text_entry_input").keyup();
            $(".action_accept").click();

        }

    }
    )

}
