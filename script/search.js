const questionList = document.querySelector('#question-list');
const form = document.querySelector('#add-search-form');
var d = new Date();
let today = d.getTime();

//sort by date
//function sortByDate(){}

//give numbers of days in a specific month and year, a bit excessive
function daysInMonth (month, year) { 
    return new Date(year, month+1, 0).getDate(); 
} 

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


// filters based on date
const setupSubmissionList = (data, time) => {
    if (data.length) {
        form.innerHTML = '<input type="text" id="searchInput" placeholder="Interview Question Search.."><input type="submit" value="Submit"></input>';
        questionList.innerHTML = '<h1> Results <h1>';
        let day = 8.64*Math.pow(10,7);
        let week = 8.64*Math.pow(10,7)*7;
        let month = 8.64*Math.pow(10,7)*daysInMonth(d.getMonth(),d.getFullYear());
        let year = 8.64*Math.pow(10,7)*365;
        data.forEach(doc => {
            var ms = today - Date.parse(doc.data().Date) 
            if (time == 'day' && ms < day) {
                const submission = doc.data();
                renderSubmission(doc);
            }
            else if (time == 'week' && ms < week) {
                const submission = doc.data();
                renderSubmission(doc);
            }
            else if (time == 'month' && ms < month) {
                const submission = doc.data();
                renderSubmission(doc);
            }
            else if (time == 'year' && ms < year) {
                const submission = doc.data();
                renderSubmission(doc);
            }
            else {
                const submission = doc.data();
                renderSubmission(doc);
            }
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
                setupSubmissionList(snapshot.docs, 'all');
            });
        })
    }
    else {
        console.log('user logged out');
        setupSubmissionList([]);
    }
})