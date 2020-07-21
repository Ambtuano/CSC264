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
    }
})


// Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting user info
    
    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signupForm.reset();
        window.location.href = "../home.html";
    });
});
