/*
 * views/mypage.ejs에서 btn-update-email를 눌렀을 때 이메일을 업데이트
 * */
const updateEmailBtn = document.getElementById('btn-update-email');
if (updateEmailBtn) {
	updateEmailBtn.addEventListener('click', function() {
		const emailInput = document.getElementById('input-email');
		const newEmail = emailInput.value;

		fetch('/mypage/update/email', {
		    method: 'POST',
		    headers: {
			'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ email: newEmail })
		})
		.then(response => {
		    if (response.ok) {
			console.log('successed');
		    } else {
			console.error('Failed to update email');
		    }
		})
		.catch(error => {
		    console.error('Error updating email:', error);
		});
	});
}

const updateBirthdateBtn = document.getElementById('btn-update-birthdate');
if (updateBirthdateBtn) {
	updateBirthdateBtn.addEventListener('click', function() {
		const birthdateInput = document.getElementById('input-birthdate');
		const newBirthdate = birthdateInput.value;

		fetch('/mypage/update/birthdate', {
		    method: 'POST',
		    headers: {
			'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ birthdate: newBirthdate })
		})
		.then(response => {
		    if (response.ok) {
			console.log('successed');
		    } else {
			console.error('Failed to update birthdate');
		    }
		})
		.catch(error => {
		    console.error('Error updating birthdate:', error);
		});
	});
}

document.getElementById('btn-refresh').addEventListener('click', function() {
	window.location.href = '/mypage'; // 새로고침이 아니라 마이페이지로 이동하도록
});

