const questionList = document.querySelector('#question-list');
const form = document.querySelector('#add-search-form');
var d = new Date();
let today = d.getTime();

const day = 8.64 * Math.pow(10, 7);
const week = 8.64 * Math.pow(10, 7) * 7;
const month = 8.64 * Math.pow(10, 7) * daysInMonth(d.getMonth(), d.getFullYear());
const year = 8.64 * Math.pow(10, 7) * 365;

//give numbers of days in a specific month and year, a bit excessive
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
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

// filters based on date alone
setupSubmissionList = (data, time) => {
    if (data.length) {
        data.forEach(doc => {
            var ms = today - Date.parse(doc.data().Date)
            if (time == 'day' && ms < day) {
                renderSubmission(doc);
                console.log("day");
            }
            else if (time == 'week' && ms < week) {
                renderSubmission(doc);
                console.log("week");
            }
            else if (time == 'month' && ms < month) {
                renderSubmission(doc);
                console.log("month");
            }
            else if (time == 'year' && ms < year) {
                renderSubmission(doc);
                console.log("year");
            }
            else if (time == 'all') {
                renderSubmission(doc);
                console.log("all");
            }
        })
    } else {
        questionList.innerHTML = '';
    }
}

// filters based on search
searchSubmissionList = (data, time) => {
    var searchinput = document.getElementById("searchbar").value;
    var companyinput = document.getElementById("companyfilter").value;
    var timevalue = document.getElementById("timefilter").value;
    var searchkeywords = searchinput.split(" ");
    var companykeywords = companyinput.split(" ");

    var x = 0;
    var y = 0;
    if (data.length) {
        data.forEach(doc => {
            searchkeywords.forEach(i => {
                if(doc.data().Question.toLowerCase().match(i.toLowerCase()) || doc.data().Company.toLowerCase().match(i.toLowerCase())){
                x = 1;
                console.log(i);
            }})
            companykeywords.forEach(i => {
                y = doc.data().Company.toLowerCase().match(i.toLowerCase());
                console.log(i);
            })
            if (searchinput.length && companyinput.length) { // search if both have input
                console.log(x);
                console.log(y);
                console.log("both")
                if (x && y) {
                    var ms = today - Date.parse(doc.data().Date)
                    if (time == 'day' && ms < day) {
                        renderSubmission(doc);
                        console.log("day");
                    }
                    else if (time == 'week' && ms < week) {
                        renderSubmission(doc);
                        console.log("week");
                    }
                    else if (time == 'month' && ms < month) {
                        renderSubmission(doc);
                        console.log("month");
                    }
                    else if (time == 'year' && ms < year) {
                        renderSubmission(doc);
                        console.log("year");
                    }
                    else if (time == 'all') {
                        renderSubmission(doc);
                        console.log("all");
                    }

                } else {
                }
                x = 0;
                y = 0;
            }else if (companyinput.length) { // search if both we only have company input
                console.log(x);
                console.log(y);
                console.log("company")
                if (y) {
                    var ms = today - Date.parse(doc.data().Date)
                    if (time == 'day' && ms < day) {
                        renderSubmission(doc);
                        console.log("day");
                    }
                    else if (time == 'week' && ms < week) {
                        renderSubmission(doc);
                        console.log("week");
                    }
                    else if (time == 'month' && ms < month) {
                        renderSubmission(doc);
                        console.log("month");
                    }
                    else if (time == 'year' && ms < year) {
                        renderSubmission(doc);
                        console.log("year");
                    }
                    else if (time == 'all') {
                        renderSubmission(doc);
                        console.log("all");
                    }

                } else {
                }
                x = 0;
                y = 0;
            }else if (searchinput.length) { // search if both we only have search input
                console.log(x);
                console.log(y);
                console.log("search")
                if (x) {
                    var ms = today - Date.parse(doc.data().Date)
                    if (time == 'day' && ms < day) {
                        renderSubmission(doc);
                        console.log("day");
                    }
                    else if (time == 'week' && ms < week) {
                        renderSubmission(doc);
                        console.log("week");
                    }
                    else if (time == 'month' && ms < month) {
                        renderSubmission(doc);
                        console.log("month");
                    }
                    else if (time == 'year' && ms < year) {
                        renderSubmission(doc);
                        console.log("year");
                    }
                    else if (time == 'all') {
                        renderSubmission(doc);
                        console.log("all");
                    }

                } else {
                }
                x = 0;
                y = 0;
            } else { //if search and company are empty
                db.collection('Submissions').get().then((snapshot) => {
                    renderSubmission(doc);
                })
            }
        })
    } else { //no data is input
        questionList.innerHTML = '';
    }
}


function filterfunction() {
    var timevalue = document.getElementById("timefilter").value;
    console.log(timevalue);
    setupSubmissionList([]);
    db.collection('Submissions').get().then((snapshot) => {
        searchSubmissionList(snapshot.docs, timevalue);
    })
}

//listening for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //getting data
        db.collection('Submissions').get().then((snapshot) => {
            setupSubmissionList(snapshot.docs, 'all');
        })
    }
    else {
        console.log('user logged out');
        setupSubmissionList([]);
        questionList.innerHTML = '<h3> Login to view interview questions <h3>';
    }
})