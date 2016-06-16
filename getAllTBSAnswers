function testing_printTBSQuestionInfo(question, title) {
 
    function testing_printLog(info) {
 
        console.log(info + "  kind:  " + question.kind + "   sub-kind:" + (question.hasOwnProperty("sub-kind") ? question["sub-kind"] : " sk doesn't exist ") + "   correct answers:  " + question.correctAnswers);
 
    }
 
    if (question.kind == "tbsDocumentReview") {
        testing_printLog("lesson title: " + title + "    id: " + question.identifier);
    }
 
 
    else {
 
        var oReq = new XMLHttpRequest();
        address = "http://qa.efficientlearning.com/pv5/v8/2/app/cpaexcel/res/html/" + question.guid + ".html";
        oReq.onload = testing_reqListener;
        oReq.open("get", address, true);
        oReq.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        oReq.send();
    }
    function testing_reqListener() {
        elementInResponse = $.parseHTML(this.responseText);
        elementInResponse.forEach(function (item) {
 
            if (item.attributes != null) {
 
                if (item.hasAttribute("class")) {
 
                    if (item.getAttributeNode("class").value == "title") {
                        testing_printLog("id: " + item.innerHTML);
                    }
                }
 
            }
 
 
        });
 
    }
}
 
var testing_Lessons = pv5.plan.get_lessons();
testing_Lessons.forEach(function (lesson) {
    if (lesson.hasOwnProperty("tbs_assessment_questions")) {
        lesson.tbs_assessment_questions.forEach(function (question) {
            testing_printTBSQuestionInfo(question, lesson.title);
        });
    }
});
