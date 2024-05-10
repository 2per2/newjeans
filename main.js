require('dotenv').config();
const express = require('express'), 
	app = express(), 
	layouts = require('express-ejs-layouts'),
	path = require('path'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	FileStore = require('session-file-store')(session),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	passportLocalSequelize = require('passport-local-sequelize'),
	flash = require('express-flash'),
	morgan = require('morgan'),
	memberRouter = require('./routes/memberRouter'),
	homeRouter = require('./routes/homeRouter'),
	commentRouter = require('./routes/commentRouter'),
	mypageRouter = require('./routes/mypageRouter'),
	fanController = require('./controllers/fanController'),
	userRouter = require('./routes/userRouter'),
	db = require('./models/index'),
	mysql = require('mysql2/promise');
db.sequelize.sync();

// app setting
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);
app.use(layouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser('keyboard cat'));

// extract data from the user
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());


// session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: new FileStore()
}));
app.use(flash());

// passport 초기화 (안 하면 res.locals가 안됨)
app.use(passport.initialize());
app.use(passport.session());

// res.locals 변수 초기화
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flash = req.flash('flash');
	next();
});

// Passport에서 사용할 LocalStrategy 설정 (controllers/user.js에서 signIn 할 때 쓸거임)
passport.use(new LocalStrategy({
    usernameField: 'id', // 사용자 ID를 사용하여 로그인
    passwordField: 'password'
}, (id, password, done) => {
    db.User.findByPk(id)
        .then(user => {
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Invalid id or password' });
            }
            return done(null, user);
        })
        .catch(err => done(err));
}));

// serializeUser 및 deserializeUser 메서드 설정
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});

// routes
app.get('/', homeRouter);
app.get('/comment', commentRouter);
app.post('/comment', commentRouter);
app.delete('/comment/delete/:commentId', commentRouter);
app.get('/member/:name', memberRouter);
app.post('/member/:name', memberRouter);
app.get('/signup', userRouter);
app.post('/signup', userRouter);
app.get('/signin', userRouter);
app.post('/signin', userRouter);
app.get('/password_reset', userRouter);
app.post('/password_reset', userRouter);
app.get('/password_setting', userRouter);
app.post('/password_setting', userRouter);
app.get('/signout', userRouter);
app.delete('/user/delete/:id', userRouter);
app.get('/fan', fanController.getAllFans);
app.get('/err', (req, res, error) => {
	res.send('oops');
});
app.get('/mypage', mypageRouter); 
app.post('/mypage/update/email', mypageRouter);
app.post('/mypage/update/birthdate', mypageRouter);

// start the server
app.listen(app.get('port'), () => {
	console.log(`Server started in port ${app.get('port')}`);
});
