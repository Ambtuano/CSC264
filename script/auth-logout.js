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


//logout
const logout = document.querySelector('#logoutBtn');
logout.addEventListener('click', (e) => {
    console.log("hello")
    e.preventDefault();
    auth.signOut();
    window.location.href = "../login.html";
});