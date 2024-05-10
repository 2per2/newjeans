/*
 * views/password_reset.ejs에서 btn-get-id를 눌렀을 때
 * */
const getEmailBtn = document.getElementById('btn-get-email');
if (getEmailBtn) {
        getEmailBtn.addEventListener('click', function() {
                const emailInput = document.getElementById('input-email');
                const email = emailInput.value;

                fetch('/password_reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify({ email: email })
                })
		//window.location.redirect('/password_setting');
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
