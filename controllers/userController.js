const db = require('../models/index'),
      flash = require('connect-flash'),
	bcrypt = require('bcrypt'),
      User = db.User;
const passport = require('passport');

module.exports = {
	showSignup: async (req, res, next) => {
		req.flash();
		res.render('signup', { message: req.flash() });
	},
	showSignin: async (req, res, next) => {
		req.flash();
		res.render('signin', { message: req.flash() });
	},
	getUserById: async (req, res, next) => {
    try {
        const userId = req.body.id;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
	    return user;
    } catch (error) {
        next(error); // 에러 처리를 위해 next를 호출하여 에러 핸들러로 이동
    }
},
	getUserByEmail: async (userEmail) => {
    try {
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return 'user not found';
        }
	    return user;
    } catch (error) {
	    return 'error';
    }
	},
    signUp: async (req, res, next) => {
        try {
            const { id, password, email, birthdate } = req.body;

            // 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ id, password: hashedPassword, email, birthdate });
            const savedUser = await newUser.save();
		req.flash('success', 'Created your account successfully');
		res.render('signin', { message: req.flash() });
        } catch (error) {
            next(error);
        }
    },

    updatePassword: async (userEmail, newPassword) => {
        try {
		// 이메일은 쿠키로 받고 비번은 바디에서 입력받음
            // 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(newPassword, 10);
		console.log('values: ',userEmail, newPassword, hashedPassword);

            const updatedUser = await User.update({ password: hashedPassword }, { where: { email: userEmail } });
            if (!updatedUser) {
		    return 'Failed to reset password';
            }
		    return updatedUser;
        } catch (error) {
		return 'What?!';
        }
    },
	updateEmail: async (req, res, next) => {
		const userId = req.user.id;
		const newEmail = req.body.email;
		const overlappedUser = await User.findOne({ where: { email: newEmail }});
		if (newEmail === '') {
			req.flash('error', 'Please enter your email');
			return res.render('mypage', { message: req.flash() });
		}
		if ((overlappedUser) && (newEmail == overlappedUser.email)) {
			req.flash('error', 'Please enter other email');
			return res.render('mypage', { message: req.flash() });
		}
		try {
			const updatedEmail = await User.update({ email: newEmail }, {where: { id: userId }});		
			if (!updatedEmail) {
				req.flash('error', 'Failed to update email');
				return res.render('mypage', { message: req.flash() });
			}
			req.flash('error', 'Your email was successfully updated. Click the refresh button to check update');
			return res.render('mypage', { message: req.flash() });
	   	} catch (error) {
			next(error);
		}
	},
	updateBirthdate: async (req, res, next) => {
		const userId = req.user.id;
		const newBirthdate = req.body.birthdate;
		try {
			const updatedBirthdate = await User.update({ birthdate: newBirthdate }, {where: { id: userId }});		
			if (!updatedBirthdate) {
				req.flash('error', 'Failed to update birthdate');
				return res.render('mypage', { message: req.flash() });
			}
			req.flash('error', 'Your birthdate was successfully updated. Click the refresh button to check update');
			return res.render('mypage', { message: req.flash() });
	   	} catch (error) {
			next(error);
		}
	},
    deleteUser: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const deletedUser = await User.destroy({ where: { id: userId } });
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
		// 200을 보내고 javascript/deleteBtn.js에서 대답을 받고 페이지 새로고침
		return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    	},
	signIn: /* passport.authenticate('local', {
		 successRedirect: function(req, res) {
        return `/mypage/${req.user.id}`;
    }, // 동적으로 url 지정은 불가
		successFlash: 'successed',
		failureRedirect: '/user/signin',
		failureFlash: true 
	}),*/
	
	function(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err); // 에러 발생 시 다음 미들웨어에 전달
            }
            if (!user) {
                // 사용자 인증 실패 시 에러 메시지 전달
                return res.status(401).send(info.message);
            }
            // 사용자 인증 성공 시 로그인
            req.logIn(user, (err) => {
                if (err) {
                    return next(err); // 에러 발생 시 다음 미들웨어에 전달
                }
                // 로그인 성공 시 사용자 정보를 응답으로 전송
		res.locals.currentUser = user;
		res.locals.loggedIn = true;
		req.flash('success', 'hello');
		return res.render('mypage', { message: req.flash() });
                //return res.json({ user });
            });
        })(req, res, next); // passport.authenticate('local') 미들웨어 호출
    }, 
	 
    signOut: (req, res) => {
		req.session.destroy(() => {
	    		res.locals.loggedIn = false;
		    res.redirect('/');
		});
	}
};
