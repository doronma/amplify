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

const parseDate = (dateToConvert) => {

    let regExpConstructor = new RegExp("\\d*", 'g')
    let day = Number(dateToConvert.match(regExpConstructor)[0])

    regExpConstructor = new RegExp("-\\d*", 'g')
    let result = dateToConvert.match(regExpConstructor);
    let month = Number(result[0].substring(1))-1
    let year = Number(result[1].substring(1))

    regExpConstructor = new RegExp("\\s\\d*", 'g')
    let hour = Number(dateToConvert.match(regExpConstructor)[0])

    regExpConstructor = new RegExp(":\\d*", 'g')
    result = dateToConvert.match(regExpConstructor)
    let minute = Number(result[0].substring(1))
    let seconds = Number(result[1].substring(1))

    return Date.parse(new Date(year, month, day, hour, minute, seconds))
}

export { getUuid, getCurrentTime,parseDate }