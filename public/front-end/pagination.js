const prev = document.getElementById("prev");
const next = document.getElementById("next");

next.addEventListener("click", () => {
    const page = parseInt(document.getElementById("page").innerText);
    const maxpage = document.getElementById("maxpage");
    const myInit = {
        credentials: "same-origin"
    };
    Promise.all([
        fetch(`/api/pagination?page=${page + 1}`).then((data) => data.json()),
        fetch("template/tickets.ejs", myInit).then((template) => template.text())

    ]
    ).then(([data, template]) => {
        const html = ejs.render(template, { tickets: data.tickets });
        document.getElementById("paginationList").innerHTML = html;
        document.getElementById("page").innerHTML = data.currPage;
        maxpage.innerHTML = data.maxPage ;
       
        validButtons();
    })
        .catch((err) => {
            console.log(err.message);

        });

});
prev.addEventListener("click", () => {
    const page = parseInt(document.getElementById("page").innerText);
    const maxpage = document.getElementById("maxpage");
    const myInit = {
        credentials: "same-origin"
    };
    Promise.all([
        fetch(`/api/pagination?page=${page -1}`).then((data) => data.json()),
        fetch("template/tickets.ejs", myInit).then((template) => template.text())

    ]
    ).then(([data, template]) => {
        const html = ejs.render(template, { tickets: data.tickets });
        document.getElementById("paginationList").innerHTML = html;
        document.getElementById("page").innerHTML = data.currPage;
        maxpage.innerHTML = data.maxPage;
       
        validButtons();
    })
        .catch((err) => {
            console.log(err.message);

        });

});



function validButtons() {
    const currPage = document.getElementById("page").innerText;
    if (currPage === '1') {
        document.getElementById("prev").disabled = true;
    } else {
        document.getElementById("prev").disabled = false;
    }
    if (currPage === document.getElementById("maxpage").innerText) {
        document.getElementById("next").disabled = true;
    } else {
        document.getElementById("next").disabled = false;
    }
};