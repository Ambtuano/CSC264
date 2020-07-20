//listening for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //getting data
        db.collection('Submissions').get().then((snapshot) => {
            setupSubmissionList(snapshot.docs);
        })
    }
    else {
        console.log('user logged out');
        setupSubmissionList([]);
    }
})


// Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signupForm.reset();
        window.location.href = "http://www.w3schools.com";
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {

    e.preventDefault();
    auth.signOut()
});


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
        window.location.href = "http://www.w3schools.com";
    })
})