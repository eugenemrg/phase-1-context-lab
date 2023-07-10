/* Your Code Here */

function createEmployeeRecord(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this
}

function createTimeOutEvent( dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this
}

function hoursWorkedOnDate(dateStamp) {
    let dates = this.timeInEvents.map( e => e.date)
    let index = dates.indexOf(dateStamp)
    return ((this.timeOutEvents[index].hour - this.timeInEvents[index].hour) / 100)
}

function wagesEarnedOnDate(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

function calculatePayroll(formattedEmployeeRecords) {
    let totalPay = 0
    formattedEmployeeRecords.forEach(employeeRecord => {
        totalPay += allWagesFor.call(employeeRecord)
    })
    return totalPay
}

function findEmployeeByFirstName(employeeRecords, firstNameString) {
    let matches = employeeRecords.filter( e => e.firstName === firstNameString)
    return (matches.length > 0) ? matches[0] : undefined
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

