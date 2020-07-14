const questionList = document.querySelector('#question-list');
const form = document.querySelector('#add-question-form');

// create element and render cafe jk student 
function renderSubmission(doc) {
    let li = document.createElement('li');
    let question = document.createElement('span');
    let company = document.createElement('span');
    let date = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    question.textContent = doc.data().question;
    company.textContent = doc.data().company;
    date.textContent = doc.data().date;

    li.appendChild(question);
    li.appendChild(company);
    li.appendChild(date);

    questionList.appendChild(li);
}

const setupSubmissionList = (data) => {
    if (data.length) {
        questionList.innerHTML = '<h1> Submission <h1>';
        data.forEach(doc => {
            const submission = doc.data();
            renderSubmission(doc);
        })
    } else {
        questionList.innerHTML = '<h3> Login to view your submissions <h3>'
    }
}

// setting up calender/date picker
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {});
});

//saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('Submissions').add({
        Question: form.question.value,
        Company: form.company.value,
        Date: form.date.value,
        //user: user.value
    });
    form.question.value = '';
    form.company.value = '';
    form.data.value = '';
})

document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

})