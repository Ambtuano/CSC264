const questionList = document.querySelector('#question-list');
const form = document.querySelector('#add-search-form');




// create element and render submission list 
function renderSubmission(doc) {
    let li = document.createElement('li');
    let question = document.createElement('span');
    let company = document.createElement('span');
    let date = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    question.textContent = doc.data().Question;
    company.textContent = doc.data().Company;
    date.textContent = doc.data().Date;

    li.appendChild(question);
    li.appendChild(company);
    li.appendChild(date);

    questionList.appendChild(li);
}


// hides form and list when logged out
// only shows submissions of user
const setupSubmissionList = (data) => {
    if (data.length) {
        form.innerHTML = '<input type="text" id="searchInput" placeholder="Search.."><input type="submit" value="Submit"></input>';
        questionList.innerHTML = '<h1> Results <h1>';
        data.forEach(doc => {
            const submission = doc.data();
            renderSubmission(doc);
        })
    } else {
        form.innerHTML = '';
        questionList.innerHTML = '<h3> Login to view interview questions <h3>';
    }
}

//listening for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //getting data
        db.collection('Submissions').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                setupSubmissionList(snapshot.docs);
            });
        })
    }
    else {
        console.log('user logged out');
        setupSubmissionList([]);
    }
})