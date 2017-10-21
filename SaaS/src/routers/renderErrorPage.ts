const renderErrorPage = (res: { render: any }, message: string) => {
    res.render("error-page", {
        error: message,
        cssPath: "/static/css/error-page.css"
    });
};

export default renderErrorPage;