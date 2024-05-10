const postBtn = document.getElementById('btn-post-comment');
if (postBtn) {
        postBtn.addEventListener('click', function() {
		event.preventDefault();
                const contentInput = document.getElementById('input-content');
                const newContent = contentInput.value;
                let parentId = this.getAttribute('data-parentcommentid');
                if (parentId === undefined) {
                        parentId = null;
                } else {
                        parentId = parseInt(parentId, 10);
                }

                fetch('/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify({ content: newContent, parentCommentId: parentId })
                })
                .then(response => {
                    if (response.ok) {
                        console.log('successed');
			    window.location.reload();
                    } else {
                        console.error('Failed to post comment');
                    }
                })
                .catch(error => {
                    console.error('Error posting comment:', error);
                });
        });
}

const deleteCommentBtns = document.querySelectorAll('.btn-delete-comment');
    deleteCommentBtns.forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.getAttribute('data-commentId');
            // DELETE 요청을 보내기
            fetch(`/comment/delete/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
			window.location.reload();
                } else {
                    console.error('Failed to delete comment');
                }
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
        });
});

let replyHeader = null;
const replyA = document.querySelectorAll('.a-reply');
    replyA.forEach(a => {
        a.addEventListener('click', function() {
            const commentId = this.getAttribute('data-commentId');
		const trimmedId = commentId.trim();
		postBtn.setAttribute('data-parentcommentid', trimmedId);
		const contentForm = document.getElementById('form-content');
                if (replyHeader) {
			contentForm.removeChild(replyHeader);
                }
		replyHeader = document.createElement('h2');
		replyHeader.textContent = `Reply to ${commentId}`;
		contentForm.insertBefore(replyHeader, contentForm.firstChild);
        });
});
