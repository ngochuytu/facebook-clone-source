export const convertTimeStamp = timeStamp => {
    // const postDate = new Date(postTimeStampSeconds * 1000);
    const postDate = timeStamp.toDate();
    const today = new Date().getTime();

    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const dateDiff = (today - postDate) / millisecondsInOneDay;
    const dayDiff = Math.floor(dateDiff);
    const hourDiff = (dateDiff - dayDiff) * 24;
    const minuteDiff = Math.floor(hourDiff * 60);

    if (minuteDiff < 1 && dayDiff <= 0)
        return "Just now";
    else if (hourDiff <= 1 && dayDiff <= 0)
        return `${minuteDiff}m`;
    else if (hourDiff <= 24 && dayDiff <= 0)
        return `${Math.floor(hourDiff)}h`;
    else if (dayDiff <= 7)
        return `${dayDiff}d`;
    else if (dayDiff <= 30)
        return `${Math.floor(dayDiff / 7)}w`;
    else if (dayDiff < 365) {
        const date = new Date(postDate).toString().split(" "); //ex: Tue Jun 01 2021 00:00:00 GMT+0700 (Indochina Time) 
        const [dayOfWeek, month, dateOfMonth, , time] = date;
        const [hours, minutes] = time.split(":");
        return `${dayOfWeek}, ${dateOfMonth} ${month} at ${hours}:${minutes}`;
    }
    else if (dayDiff >= 365)
        return `${Math.floor(dayDiff / 365)}y`;
}