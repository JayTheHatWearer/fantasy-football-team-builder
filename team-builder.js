const fs = require('fs');
const data = require('./draftkings.json'); // update this file with csv data from draftkings website
const draftkings = [...data]; // clone to manipulate later
const bench = []; // remove these players from predictions
const predictions = []; // list of players sorted by value to build a team from
const allowedSalary = 50000; // manually change if draftkings salary is different
const salaryBuffer = -100;
const replacements = [ // order of player replacements when rebuilding
    'DST',
    'DST',
    'DST',
    'DST',
    'TE',
    'TE',
    'QB',
    'QB',
    'WR',
    'WR',
    'WR',
    'RB',
    'RB',
    'TE',
    'RB',
    'RB',
    'DST',
    'DST',
    'DST',
    'DST',
    'DST',
    'WR',
    'TE',
    'QB'
];

let replacement = 0; // increments on each replacement

function predict() {

    // ---------------------------------------------------------------------------------
    // loop over draftkings data for qb data
    // ---------------------------------------------------------------------------------
    console.log('+------------------------+');
    console.log('| training quarterbacks  |');
    console.log('+------------------------+');
    for (i = 0; i < draftkings.length; i++) {
        if (draftkings[i].Position === 'QB') {
            if (draftkings[i].AvgPointsPerGame > 0) {
                this.prediction = {
                    name: draftkings[i].Name,
                    points: 0,
                    salary: draftkings[i].Salary,
                    position: draftkings[i].Position,
                    team: draftkings[i].TeamAbbrev,
                    avgpoints: draftkings[i].AvgPointsPerGame,
                    value: draftkings[i].Salary / draftkings[i].AvgPointsPerGame
                };
                predictions.push(this.prediction);
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // loop over draftkings data for rb data
    // ---------------------------------------------------------------------------------
    console.log('+------------------------+');
    console.log('| training runningbacks  |');
    console.log('+------------------------+');
    for (i = 0; i < draftkings.length; i++) {
        if (draftkings[i].Position === 'RB') {
            if (draftkings[i].AvgPointsPerGame > 0) {
                this.prediction = {
                    name: draftkings[i].Name,
                    points: 0,
                    salary: draftkings[i].Salary,
                    position: draftkings[i].Position,
                    team: draftkings[i].TeamAbbrev,
                    avgpoints: draftkings[i].AvgPointsPerGame,
                    value: draftkings[i].Salary / draftkings[i].AvgPointsPerGame
                };
                predictions.push(this.prediction);
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // loop over draftkings data for wr data
    // ---------------------------------------------------------------------------------
    console.log('+------------------------+');
    console.log('| training widereceivers |');
    console.log('+------------------------+');
    for (i = 0; i < draftkings.length; i++) {
        if (draftkings[i].Position === 'WR') {
            if (draftkings[i].AvgPointsPerGame > 0) {
                this.prediction = {
                    name: draftkings[i].Name,
                    points: 0,
                    salary: draftkings[i].Salary,
                    position: draftkings[i].Position,
                    team: draftkings[i].TeamAbbrev,
                    avgpoints: draftkings[i].AvgPointsPerGame,
                    value: draftkings[i].Salary / draftkings[i].AvgPointsPerGame
                };
                predictions.push(this.prediction);
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // loop over draftkings data for te data
    // ---------------------------------------------------------------------------------
    console.log('+------------------------+');
    console.log('| training tightends     |');
    console.log('+------------------------+');
    for (i = 0; i < draftkings.length; i++) {
        if (draftkings[i].Position === 'TE') {
            if (draftkings[i].AvgPointsPerGame > 0) {
                this.prediction = {
                    name: draftkings[i].Name,
                    points: 0,
                    salary: draftkings[i].Salary,
                    position: draftkings[i].Position,
                    team: draftkings[i].TeamAbbrev,
                    avgpoints: draftkings[i].AvgPointsPerGame,
                    value: draftkings[i].Salary / draftkings[i].AvgPointsPerGame
                };
                predictions.push(this.prediction);
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // loop over draftkings data for dst data
    // ---------------------------------------------------------------------------------
    console.log('+------------------------+');
    console.log('| training defenses      |');
    console.log('+------------------------+');
    for (i = 0; i < draftkings.length; i++) {
        if (draftkings[i].Position === 'DST') {
            if (draftkings[i].AvgPointsPerGame > 0) {
                this.prediction = {
                    name: draftkings[i].Name,
                    points: 0,
                    salary: draftkings[i].Salary,
                    position: draftkings[i].Position,
                    team: draftkings[i].TeamAbbrev,
                    avgpoints: draftkings[i].AvgPointsPerGame,
                    value: draftkings[i].Salary / draftkings[i].AvgPointsPerGame
                };
                predictions.push(this.prediction);
            }
        }
    }

    console.log('+------------------------+');
    console.log('| building team          |');
    console.log('+------------------------+');
    createTeam(predictions);
}

// ---------------------------------------------------------------------------------
// remove bench players before analyzing full player lists
// ---------------------------------------------------------------------------------
if (bench.length) {
    console.log('+------------------------+');
    console.log('| removing bench players |');
    console.log('+------------------------+');
    for (let i = draftkings.length - 1; i >= 0; i--) {
        for (let j = 0; j < bench.length; j++) {
            if (draftkings[i] && (draftkings[i].Name === bench[j])) {
                draftkings.splice(i, 1);
            }
        }
    }

    predict();

} else {

    predict();

}

// ---------------------------------------------------------------------------------
// build a team
// ---------------------------------------------------------------------------------
function createTeam(array) {

    // sort predictions array by value (salary / avgpoints)
    array.sort((a, b) => (a.value > b.value) ? 1 : -1);

    // ---------------------------------------------------------------------------------
    // blank team template
    // ---------------------------------------------------------------------------------
    const team = {
        qb1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        rb1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        rb2: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        wr1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        wr2: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        wr3: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        te1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        fx1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        },
        dst1: {
            name: '',
            salary: 0,
            position: '',
            team: '',
            points: 0,
            avgpoints: 0,
            value: 1000
        }
    };

    // ---------------------------------------------------------------------------------
    // assign players to team
    // ---------------------------------------------------------------------------------
    for (i = 0; i < array.length; i++) {

        // assign best value rb1 ////////////////////////////
        if (array[i].position === 'RB') {
            if (array[i].value < team.rb1.value) {
                team.rb1.name = array[i].name;
                team.rb1.salary = array[i].salary;
                team.rb1.position = array[i].position;
                team.rb1.points = array[i].points;
                team.rb1.team = array[i].team;
                team.rb1.avgpoints = array[i].avgpoints;
                team.rb1.value = array[i].value;
            }
        }

        // assign best value rb2 ///////////////////////////
        if (array[i].position === 'RB') {
            if (array[i].value < team.rb2.value) {
                if (array[i].name != team.rb1.name) {
                    team.rb2.name = array[i].name;
                    team.rb2.salary = array[i].salary;
                    team.rb2.position = array[i].position;
                    team.rb2.points = array[i].points;
                    team.rb2.team = array[i].team;
                    team.rb2.avgpoints = array[i].avgpoints;
                    team.rb2.value = array[i].value;
                }
            }
        }

        // assign best value wr1 ///////////////////////////
        if (array[i].position === 'WR') {
            if (array[i].value < team.wr1.value) {
                team.wr1.name = array[i].name;
                team.wr1.salary = array[i].salary;
                team.wr1.position = array[i].position;
                team.wr1.points = array[i].points;
                team.wr1.team = array[i].team;
                team.wr1.avgpoints = array[i].avgpoints;
                team.wr1.value = array[i].value;
            }
        }

        // assign best value wr2 //////////////////////////
        if (array[i].position === 'WR') {
            if (array[i].value < team.wr2.value) {
                if (array[i].name != team.wr1.name) {
                    team.wr2.name = array[i].name;
                    team.wr2.salary = array[i].salary;
                    team.wr2.position = array[i].position;
                    team.wr2.points = array[i].points;
                    team.wr2.team = array[i].team;
                    team.wr2.avgpoints = array[i].avgpoints;
                    team.wr2.value = array[i].value;
                }
            }
        }

        // assign best value qb1 ////////////////////////////
        if (array[i].position === 'QB') {
            if (array[i].value < team.qb1.value) {
                team.qb1.name = array[i].name;
                team.qb1.salary = array[i].salary;
                team.qb1.position = array[i].position;
                team.qb1.points = array[i].points;
                team.qb1.team = array[i].team;
                team.qb1.avgpoints = array[i].avgpoints;
                team.qb1.value = array[i].value;
            }
        }

        // assign best value wr3 //////////////////////////
        if (array[i].position === 'WR') {
            if (array[i].value < team.wr3.value) {
                if (array[i].name != team.wr1.name) {
                    if (array[i].name != team.wr2.name) {
                        team.wr3.name = array[i].name;
                        team.wr3.salary = array[i].salary;
                        team.wr3.position = array[i].position;
                        team.wr3.points = array[i].points;
                        team.wr3.team = array[i].team;
                        team.wr3.avgpoints = array[i].avgpoints;
                        team.wr3.value = array[i].value;
                    }
                }
            }
        }

        // assign best value fx1 //////////////////////////
        if ((array[i].position === 'RB') || (array[i].position === 'WR') || (array[i].position === 'TE')) {
            if (array[i].value < team.fx1.value) {
                if (array[i].name != team.rb1.name) {
                    if (array[i].name != team.rb2.name) {
                        if (array[i].name != team.wr1.name) {
                            if (array[i].name != team.wr2.name) {
                                if (array[i].name != team.wr3.name) {
                                    team.fx1.name = array[i].name;
                                    team.fx1.salary = array[i].salary;
                                    team.fx1.position = array[i].position;
                                    team.fx1.points = array[i].points;
                                    team.fx1.team = array[i].team;
                                    team.fx1.avgpoints = array[i].avgpoints;
                                    team.fx1.value = array[i].value;
                                }
                            }
                        }
                    }
                }
            }
        }

        // assign best value te1 //////////////////////////
        if (array[i].position === 'TE') {
            if (array[i].value < team.te1.value) {
                if (array[i].name != team.fx1.name) {
                    team.te1.name = array[i].name;
                    team.te1.salary = array[i].salary;
                    team.te1.position = array[i].position;
                    team.te1.points = array[i].points;
                    team.te1.team = array[i].team;
                    team.te1.avgpoints = array[i].avgpoints;
                    team.te1.value = array[i].value;
                }
            }
        }

        // assign best value dst1
        if (array[i].position === 'DST') {
            if (array[i].value < team.dst1.value) {
                team.dst1.name = array[i].name;
                team.dst1.salary = array[i].salary;
                team.dst1.position = array[i].position;
                team.dst1.points = array[i].points;
                team.dst1.team = array[i].team;
                team.dst1.avgpoints = array[i].avgpoints;
                team.dst1.value = array[i].value;
            }
        }

    }

    const totalSalary = team.qb1.salary + team.rb1.salary + team.rb2.salary + team.wr1.salary + team.wr2.salary + team.wr3.salary + team.te1.salary + team.fx1.salary + team.dst1.salary;
    const overSalary = totalSalary - allowedSalary;

    if (overSalary > 0) {

        rebuildTeam();

    } else if (overSalary < salaryBuffer) {

        rebuildTeam();

    } else {

        let finalteam = team;
        // let total = 0;
        let totalavg = 0;
        for (const property in finalteam) {
            // let pointsvalue = finalteam[property].points;
            // total += pointsvalue;
            let avgpointsvalue = finalteam[property].avgpoints;
            totalavg += avgpointsvalue;
        }
        // finalteam.totalpoints = parseInt(total.toFixed(2));
        finalteam.totaldkpoints = parseInt(totalavg.toFixed(2))
        // salary outcome
        finalteam.salary = overSalary;
        let jsondata = JSON.stringify(finalteam);
        fs.writeFile('./team.json', jsondata, function (err) {
            if (err) throw err;
        });
        console.log('+-----------------------------------+');
        console.log('| final team ');
        console.log('+-----------------------------------+');
        console.log('| qb ', finalteam.qb1.name, finalteam.qb1.salary);
        console.log('| rb ', finalteam.rb1.name, finalteam.rb1.salary);
        console.log('| rb ', finalteam.rb2.name, finalteam.rb2.salary);
        console.log('| wr ', finalteam.wr1.name, finalteam.wr1.salary);
        console.log('| wr ', finalteam.wr2.name, finalteam.wr2.salary);
        console.log('| wr ', finalteam.wr3.name, finalteam.wr3.salary);
        console.log('| te ', finalteam.te1.name, finalteam.te1.salary);
        console.log('| flx ', finalteam.fx1.name, finalteam.fx1.salary);
        console.log('| dst ', finalteam.dst1.name, finalteam.dst1.salary);
        console.log('+------------------------+----------+');
        console.log('| draftkings salary      |', allowedSalary);
        console.log('| total salary used      |', totalSalary);
        console.log('| under salary           |', overSalary);
        console.log('| total points predicted |', finalteam.totaldkpoints);
        console.log('+------------------------+----------+');

    }
}

// ---------------------------------------------------------------------------------
// if over salary, begin replacing players
// ---------------------------------------------------------------------------------
function rebuildTeam() {

    if (replacements[replacement] === 'DST') {

        let r = 0;
        for (i = 0; i < predictions.length; i++) {
            if (r === 0) {
                if (predictions[i].position === 'DST') {
                    console.log('removing ', predictions[i].name);
                    predictions.splice(i, 1);
                    r++;
                    replacement++;
                    const updatedPredictions = [...predictions];
                    createTeam(updatedPredictions);
                }
            }
        }

    } else if (replacements[replacement] === 'TE') {

        let r = 0;
        for (i = 0; i < predictions.length; i++) {
            if (r === 0) {
                if (predictions[i].position === 'TE') {
                    console.log('removing ', predictions[i].name);
                    predictions.splice(i, 1);
                    r++;
                    replacement++;
                    const updatedPredictions = [...predictions];
                    createTeam(updatedPredictions);
                }
            }
        }

    } else if (replacements[replacement] === 'QB') {

        let r = 0;
        for (i = 0; i < predictions.length; i++) {
            if (r === 0) {
                if (predictions[i].position === 'QB') {
                    console.log('removing ', predictions[i].name);
                    predictions.splice(i, 1);
                    r++;
                    replacement++;
                    const updatedPredictions = [...predictions];
                    createTeam(updatedPredictions);
                }
            }
        }

    } else if (replacements[replacement] === 'WR') {

        let r = 0;
        for (i = 0; i < predictions.length; i++) {
            if (r === 0) {
                if (predictions[i].position === 'WR') {
                    console.log('removing ', predictions[i].name);
                    predictions.splice(i, 1);
                    r++;
                    replacement++;
                    const updatedPredictions = [...predictions];
                    createTeam(updatedPredictions);
                }
            }
        }

    } else if (replacements[replacement] === 'RB') {

        let r = 0;
        for (i = 0; i < predictions.length; i++) {
            if (r === 0) {
                if (predictions[i].position === 'RB') {
                    console.log('removing ', predictions[i].name);
                    predictions.splice(i, 1);
                    r++;
                    replacement++;
                    const updatedPredictions = [...predictions];
                    createTeam(updatedPredictions);
                }
            }
        }

    } else {

        console.log('+-------------------------');
        console.log('| unable to build team   |');
        console.log('+-------------------------');

    }
}