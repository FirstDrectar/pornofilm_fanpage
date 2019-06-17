const prev = document.getElementById("prev");
const next = document.getElementById("next");

next.addEventListener("click", () => {
    const page = parseInt(document.getElementById("page").innerText);
    const maxpage = document.getElementById("maxpage");
    const myInit = {
        credentials: "same-origin"
    };
    console.log(page);
    Promise.all([
        fetch(`/api/pagination?page=${page + 1}`).then((data) => data.json()),
        fetch("template/tickets.ejs", myInit).then((template) => template.text())

    ]
    ).then(([data, template]) => {
        const html = ejs.render(template, { tickets: data.tickets });
        document.getElementById("paginationList").innerHTML = html;
        document.getElementById("page").innerHTML = data.currPage;
        maxpage.innerHTML = data.maxPage ;
        // document.getElementById("searchStr").value = searchStr;
        // pSearch.innerText = `Search:${searchStr}`;
        // console.log(html);
        // console.log(data);
        // console.log(template);
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
    console.log(page);
    Promise.all([
        fetch(`/api/pagination?page=${page -1}`).then((data) => data.json()),
        fetch("template/tickets.ejs", myInit).then((template) => template.text())

    ]
    ).then(([data, template]) => {
        const html = ejs.render(template, { tickets: data.tickets });
        document.getElementById("paginationList").innerHTML = html;
        document.getElementById("page").innerHTML = data.currPage;
        maxpage.innerHTML = data.maxPage ;
        // document.getElementById("searchStr").value = searchStr;
        // pSearch.innerText = `Search:${searchStr}`;
        // console.log(html);
        // console.log(data);
        // console.log(template);
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
        console.log("prev disabled")
    } else {
        document.getElementById("prev").disabled = false;
        console.log("prev enabled")
    }
    if (currPage === document.getElementById("maxpage").innerText) {
        console.log(currPage);
        document.getElementById("next").disabled = true;
        console.log("next disabled")
    } else {
        document.getElementById("next").disabled = false;
        console.log("next enabled")
    }
};