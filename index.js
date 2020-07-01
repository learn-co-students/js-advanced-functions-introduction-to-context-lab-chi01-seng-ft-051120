// Your code here
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

function createEmployeeRecords(arrays) {
    return arrays.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, stamp) {
    employee.timeInEvents.push( {
        type: "TimeIn",
        hour: parseInt((stamp.substr(11, 4))),
        date: stamp.substr(0, 10)
    })
    return employee
}

function createTimeOutEvent(employee, stamp) {
    employee.timeOutEvents.push( {
        type: "TimeOut",
        hour: parseInt((stamp.substr(11, 4))),
        date: stamp.substr(0, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
    return (hoursWorkedOnDate(employee, date) * employee.payPerHour)
}

function allWagesFor(employee) {
    const datesArray = employee.timeInEvents.map(event => event.date)
    const wagesArray = datesArray.map(date => {
        return wagesEarnedOnDate(employee, date)
    })
    return wagesArray.reduce(function(total, element) {return total + element}, 0) 
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(array) {
    return array.reduce(function(total, element) {return total + allWagesFor(element)}, 0)
}
