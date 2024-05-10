document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userId');
      		const deleteUrl = `/user/delete/${userId}`; 
            // DELETE 요청을 보내어 사용자 삭제
            fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    // 삭제 성공 시 페이지 새로고침
			window.location.reload();
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        });
    });
});

