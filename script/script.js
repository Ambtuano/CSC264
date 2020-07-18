const questionList = document.querySelector('#question-list');
const form = document.querySelector('#add-submission-form');

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
        $('#add-submission-form').show();
        questionList.innerHTML = '<h1> Your Submissions <h1>';
        data.forEach(doc => {
            const submission = doc.data();
            if (doc.data().user == firebase.auth().currentUser.email) {
                renderSubmission(doc);
            }
        })
    } else {
        $('#add-submission-form').hide();
        questionList.innerHTML = '<h3> Login to view your submissions <h3>';
    }
}

// setting up calender/date picker
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {});
});

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Submissions').add({
        Question: form.question.value,
        Company: form.company.value,
        Date: form.date.value,
        user: firebase.auth().currentUser.email
    });
    form.question.value = '';
    form.company.value = '';
    form.date.value = '';
})

document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

})
