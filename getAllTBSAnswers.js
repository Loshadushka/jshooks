function testing_printTBSQuestionInfo(structure) {


    function testing_printLog(info, question) {

        console.log(info + "  kind:  " + question.kind + "   sub-kind:" + (question.hasOwnProperty("sub-kind") ? question["sub-kind"] : " sk doesn't exist ") + "   correct answers:  " + question.correctAnswers);

    }


    var oReq = new XMLHttpRequest();
    address = "http://qa.efficientlearning.com/pv5/v8/2/app/cpaexcel/res/html/" + structure.question.guid + ".html";
    oReq.onload = function () {
        testing_reqListener(event, structure)
    };
    oReq.open("get", address, true);
    oReq.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    oReq.send();

    function testing_reqListener(event, structure) {


        var elementInResponse = $.parseHTML(event.target.responseText);
        elementInResponse.forEach(testing_printInfoIfQuestionHasIncorrectAnswers, structure);

    }


    function testing_printInfoIfQuestionHasIncorrectAnswers(item) {

        if (item.attributes != null) {

            if (!item.hasAttribute("class")) {

                if (this.question.kind == "tbsDocumentReview") {

                    testing_printLog("lesson title: " + this.title + "    id: " + this.question.identifier, this.question);

                    var start_value = 1;
                    var question = this.question;
                    item.querySelectorAll("select").forEach(function (item, index, array) {
                        debugger;
                        var last_value = start_value + item.querySelectorAll("option").length - 1;
                        if (!testing_isBetween(start_value, last_value, this.correctAnswers[index])) {
                            console.log("%cguid: " + this.guid + " identifier: " + this.identifier + " has incorrect value " + this.correctAnswers[index] + " which should be between " + start_value + " and " + last_value, "color:red;");
                        }
                        start_value = last_value + 1;
                    }, question);
                }


            }
            else {
                if (item.getAttributeNode("class").value == "title") {
                    testing_printLog("lesson title: " + this.title + "    id: " + item.innerHTML, this.question);
                }


            }

        }


    }


    function testing_isBetween(start, last, point) {

        return point >= start && point <= last;


    }
}


pv5.plan.get_lessons().forEach(function (lesson) {
    if (lesson.hasOwnProperty("tbs_assessment_questions")) {
        lesson.tbs_assessment_questions.forEach(function (question) {
            var structure = {question: question, title: lesson.title};
            testing_printTBSQuestionInfo(structure);
        });
    }
});

pv5.activeApp.courseContent.children.forEach(function (item) {
    if (item.hasOwnProperty("children")) {
        item.children.forEach(function (item2) {
            if (item2.hasOwnProperty("parts")) {
                item2.parts[3].questions.forEach(
                    function (question) {
                        debugger;
                        var structure = {question: question, title: item2.title};
                        testing_printTBSQuestionInfo(structure);
                    }
                );
            }
        });
    }
});
