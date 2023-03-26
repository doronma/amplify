const getUuid = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array
}

const getCurrentTime = () => {
    let current = new Date();
    let cDate = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    return dateTime;
}

// courtesy of Bing chat
function parseDate(string) {
    const [date, time] = string.split(' ');
    const [day, month, year] = date.split('-');
    const [hours, minutes, seconds] = time.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

export { getUuid, getCurrentTime,parseDate }