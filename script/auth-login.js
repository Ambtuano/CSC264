//listening for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //getting data
        // db.collection('Submissions').get().then((snapshot) => {
        //     setupSubmissionList(snapshot.docs);
        // })
    }
    else {
        console.log('user logged out');
        //setupSubmissionList([]);
    }
})

//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //closing login modal and reset form
        loginForm.reset();
        window.location.href = "../home.html";
    })
})

//logout
const logout = document.querySelector('#logoutBtn');
logout.addEventListener('click', (e) => {

    e.preventDefault();
    auth.signOut()
});