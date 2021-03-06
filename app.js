let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let AuthUser = null;
let app = express();
const PARTIAL = 5;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const ServerPort = require('./config');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res, next) => {
    console.log(AuthUser);
    res.render("index", {
        user: AuthUser
    });
});
app.get('/about', (req, res, next) => {
    res.render("about", {
        user: AuthUser
    });
})
app.get('/photos', (req, res, next) => {
    res.render("media", {
        user: AuthUser
    });
})
app.get('/tours', (req, res, next) => {
    res.render("concerts", {
        user: AuthUser
    });
})
app.get('/contacts', (req, res, next) => {
    res.render("contacts", {
        user: AuthUser
    });
})
app.get('/login', (req, res, next) => {
    res.render("login", {
        user: AuthUser
    });
})
app.get('/music', (req, res, next) => {
    res.render("music", {
        user: AuthUser
    });
})
app.get('/profile', (req, res, next) => {
    if (AuthUser) {
        console.log(AuthUser.tickets.length);
        let pages = AuthUser.tickets.length / PARTIAL;
        res.render("profile", {
            user: AuthUser,
            tickets: AuthUser.tickets.slice(0, PARTIAL),
            currPage: 1,
            maxPage: (pages == 0) ? 0 : (Math.ceil(pages))
        });
    } else {
        res.redirect('/');
    }
})


app.get('/api/ticket', (req, res, next) => {

    if (AuthUser && req.query.name) {
        switch (req.query.name) {
            case "dobrofest": AuthUser.tickets.push({
                name: "Фестиваль Доброфест",
                city: "Ярославль",
                date: "12 июля 2019 , ПТ"
            });
                break;
            case "atlas": AuthUser.tickets.push({
                name: "Фестиваль Atlas Weekend",
                city: "Киев",
                date: "14 июля 2019 , ВС	"
            });
                break;
            case "yletay": AuthUser.tickets.push({
                name: "Фестиваль Улетай",
                city: "Лагуново",
                date: "19 июля 2019 , ПТ"
            }); break;
        }
        console.log(AuthUser.tickets);
        res.send(JSON.stringify(AuthUser.tickets[AuthUser.tickets.length - 1]));
    } else {
        res.send({ err: 'Unauthorized user ' })
    }
});
app.get('/api/pagination', (req, res, next) => {
    if (AuthUser && req.query.page) {
        const page = parseInt(req.query.page);
        const pages = AuthUser.tickets.length / PARTIAL;
        console.log(pages  + "   " + page);
        if (Math.ceil(pages) < parseInt(page) || parseInt(page) <= 0) {
            return res.send({
                user: AuthUser,
                tickets: [],
                str: "",
                currPage: page,
                maxPage: (pages == 0) ? 0 : Math.ceil(pages),
            });

        } else {
            console.log('test');

            let result = AuthUser.tickets.slice((page - 1) * PARTIAL, page * PARTIAL);
            // let idCounter = 0;
            // for (let i = page * PARTIAL; i < AuthUser.tickets.length && idCounter < PARTIAL; i++) {
            //     const item = AuthUser.tickets[i];
            //     result.push(item);
            //     ++idCounter;
            // }
            return res.send({
                user: AuthUser,
                tickets: result,
                str: "",
                currPage: page,
                maxPage: (pages == 0) ? 0 : Math.ceil(pages),
            });
        }

    } else {
        res.send({ err: 'Unauthorized user ' })
    }
});
app.post('/login', function (req, res) {
    if (req.body.email === "vitalik.kachanoff@gmail.com" && req.body.password === "vitas1") {
        AuthUser = {
            email: "vitalik.kachanoff@gmail.com",
            password: "vitas1",
            tickets: new Array()
        };
        AuthUser.tickets.push({
            name: "Фестиваль Улетай",
            city: "Лагуново",
            date: "19 июля 2019 , ПТ"
        });
        res.render('index', {
            user: AuthUser
        });
    }
});
app.get('/logout', function (req, res) {
    AuthUser = null;
    res.redirect("/");
});
app.listen(ServerPort, function () {
    console.log(`App listening on port ${ServerPort}!`);
});


module.exports = app;
