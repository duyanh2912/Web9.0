const source = document.getElementById("girl-list-template").innerHTML;
const template = Handlebars.compile(source);

let pageToLoad = 0;
let isLoading = false;

const $grid = $('.grid').masonry({
    percentPosition: true,
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    gutter: ".gutter-sizer"
});

function loadNextPage() {
    isLoading = true;

    $.get(`/api/images/page/${pageToLoad}`)
        .then(data => {
            const html = $(template(data));
            $grid.append(html).masonry('appended', html);
            $grid.imagesLoaded().progress(function () {
                $grid.masonry("layout");
            });

            isLoading = false;
            pageToLoad += 1;

            if ($("html").height() < $(window).height()) {
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
    const bodyHeight = $("html").height();

    if (windowHeight + offset > bodyHeight - windowHeight / 2) loadNextPage();
}

$(window).on("scroll", checkEndlessScrolling);