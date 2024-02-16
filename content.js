/* ideas:
button to goto current week, in time table app
notification when there are new notices

*/
//if (window.location.href.startsWith('https://portal.whs.school.nz/index.php/attendance/*')) {
    const Target = document.querySelector("body > main > div > article > div.clearfix.text-xs-center.print-hide.mb-2 > div");
    if(Target){
        const span = document.createElement('span');
        span.className = 'input-group-btn'
        
        
        console.log(getCurrentWeek());

        const link = document.createElement('a');
        link.href = 'https://portal.whs.school.nz/index.php/attendance/' + getCurrentWeek();
        link.className = 'btn btn-success';
        link.textContent = 'Go to this Week';

        span.appendChild(link);

        Target.appendChild(span)
    }else{
        console.error("you are stinky");
    }
//}

function getCurrentWeek() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Define the start and end dates for each term
    const terms = [
        { name: 'Term One', start: new Date(currentYear, 0, 31), end: new Date(currentYear, 3, 6) },
        { name: 'Term Two', start: new Date(currentYear, 3, 24), end: new Date(currentYear, 5, 30) },
        { name: 'Term Three', start: new Date(currentYear, 6, 17), end: new Date(currentYear, 8, 22) },
        { name: 'Term Four', start: new Date(currentYear, 9, 9), end: new Date(currentYear, 11, 13) }
    ];

    let currentTerm;
    for (const term of terms) {
        if (currentDate >= term.start && currentDate <= term.end) {
            currentTerm = term;
            break;
        }
    }

    if (!currentTerm) {
        return "No current term";
    }

    let elapsedDays;
    if (currentDate > currentTerm.end) {
        // If current date is after the end of the term, calculate days from the start of next term
        elapsedDays = Math.floor((currentDate - currentTerm.end) / (1000 * 60 * 60 * 24));
    } else {
        // Otherwise, calculate days from the start of the current term
        elapsedDays = Math.floor((currentDate - currentTerm.start) / (1000 * 60 * 60 * 24));
    }
    
    // Adjust elapsed days by adding the days of previous terms
    for (let i = 0; i < terms.indexOf(currentTerm); i++) {
        elapsedDays += (terms[i].end - terms[i].start) / (1000 * 60 * 60 * 24);
    }

    const currentWeek = Math.ceil(elapsedDays / 7);
    return currentWeek;
}



