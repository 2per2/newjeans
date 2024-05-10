const db = require('../models/index'),
	Fan = db.fan,
	User = db.User,
	Comment = db.Comment,
	Op = db.Sequelize.Op;

module.exports = {
	getAllComments: async (req, res, next) => {
		try {
			data = await Comment.findAll({
				include: [{ model: User }] // User 모델의 데이터를 함께 가져옴
			});
			res.render('comment', { message: req.flash(), comments: data });
		} catch (err) {
			res.status(500).send({
				message: err.message
			});
		}
	},
	postComment: async (req, res, next) => {
		try {
			const userId = req.user.id;
			const newContent = req.body.content; // res.body 아님!			
			const parentId = req.body.parentCommentId; // 하... 타입 무조건 맞춰줄것 + let으로 설정하기...
			console.log(userId, newContent, parentId);
			
			const comment = await Comment.create({
				content: newContent,
				userId: userId,
				parentCommentId: parentId 
			})

			if (!comment) {
				res.send('error');
			}
			res.redirect('/comment');
		} catch (err) {
			res.status(500).send(err);
		}
	},
	deleteComment: async (req, res, next) => {
		try {
			const commentId = req.params.commentId;
			const deletedComment = await Comment.destroy({ 
				where: { commentId: commentId }
			});
			if (!deletedComment) {
				res.send('Failed to delete comment');
			}
			// 200을 보내고 javascript/commentBtn.js에서 대답을 받고 새로고침
			return res.status(200).json({ message: "Comment deleted successfully" });
		} catch (err) {
			res.status(500).send('Error');
		}
	}
}
