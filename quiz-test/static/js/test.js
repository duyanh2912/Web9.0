$("#js-test-form").on("submit", event => {
    event.preventDefault();

    $.ajax({
        url: "/api/answer",
        type: "post",
        data: $("#js-test-form").serialize()
    })
        .then(result => {
            $("#js-success-notification")
                .html(`Test completed! Your score is ${result.score}.`)
                .removeClass("d-none");
            $("html, body").animate({scrollTop: 0}, "fast");
            result.answers.forEach(correctAnswer => {
                $(`[name="question_${correctAnswer.id}"][value="${correctAnswer.correct}"]`)
                    .parent()
                    .addClass("text-success");

                if ($(`[name="question_${correctAnswer.id}"]:checked`).attr("value") != correctAnswer.correct) {
                    $(`[name="question_${correctAnswer.id}"]:checked`).parent().addClass("text-danger");
                }
            })
        })
        .fail(err => {
            alert("An error occured, please try again later");
            console.error(err);
        });
});