let source = document.getElementById("girl-list-template").innerHTML;
let template = Handlebars.compile(source);

let pageToLoad = 0;
let isLoading = false;

function loadNextPage() {
    isLoading = true;

    $.get(`/api/images/page/${pageToLoad}`)
        .then(data => {
            let html = template(data);
            $("#girl-list-container").append(html);

            isLoading = false;
            pageToLoad += 1;

            if ($("body").height() < $(window).height()) {
                loadNextPage();
            }
        })
        .catch(err => {
            isLoading = false;
            console.log(err)
        });
}

loadNextPage();

function checkEndlessScrolling() {
    if (isLoading) return;
    const offset = $(window).scrollTop();
    const windowHeight = $(window).height();
    const bodyHeight = $("body").height();

    if (windowHeight + offset > bodyHeight - windowHeight / 2) loadNextPage();
}

$(window).on("scroll", checkEndlessScrolling);