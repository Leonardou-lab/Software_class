/*
 * Functions to determine the next day after a given date
 *
 * Leonardo Flores
 */

function isLeap(year) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return true;
    }
    else {
        return false;
    }
}

function monthDays(month, year) {
    if (month === 2) {
        return isLeap(year) ? 29 : 28;
    }

    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31;
    }
    return 30;
}

function nextDay(day, month, year) {
    if (day < monthDays(month, year)) {
        return [day + 1, month, year];
    }
    else if (month < 12) {
        return [1, month + 1, year];
    }
    return [1, 1, year + 1]; 
}

export { isLeap, monthDays, nextDay };
