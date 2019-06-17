let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let AuthUser = null;
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
    res.render("profile", {
        user: AuthUser
    });
})
app.get('/login', function (req, res) {
    if (!app.AuthUser)
        res.render('login', {
            user: AuthUser
        });
    else {
        res.redirect('/');
    }
});
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
        res.send(AuthUser.tickets[AuthUser.tickets.lenght-1]);
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

        res.render('index', {
            user: AuthUser
        });
    }
});
app.get('/logout', function (req, res) {
    AuthUser = null;
    res.redirect("/");
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});


module.exports = app;
