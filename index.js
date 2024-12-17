/* Your Code Here */
//Here we go again, create employee record. 
function createEmployeeRecord(array) {
   return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
   }
}

//Create a function createEmployeeRecords 
function createEmployeeRecords(array) {
    debugger
    return array.map(employee => {
    return createEmployeeRecord.call(this, employee);
  });
}

// Create a timeInEvent
function createTimeInEvent(dateTime) {
    let date = dateTime.slice(0, 10);
    let hour = parseInt(dateTime.slice(11), 10);

    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: hour
    };

    this.timeInEvents.push(timeInEvent);
    return this;
}

//Create a timeOutEvent
function createTimeOutEvent(dateTime) {
    let date = dateTime.slice(0, 10);
    let hour = parseInt(dateTime.slice(11), 10);

    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: hour
    };

    this.timeOutEvents.push(timeOutEvent);
    return this;
}

// Create hoursWorkedOnDate
function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    } else {
        return 0;
    }
}    

//Create wagesEarnedOnDate
function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)
    let wagesOwed = hoursWorked * this.payPerHour
    console.log(wagesOwed)
    return wagesOwed
}    

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}


// Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (total, employee) {
        return total + allWagesFor.call(employee);
    }, 0);
}