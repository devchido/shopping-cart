import { DAY_TIME } from "../constants/date-time.constant"

export const dateTimeToDateStr = (dateTime: any, valueReturnDefault = null) => { // yyyy-MM-dd
    if (dateTime) {
        const newDate = new Date(dateTime)
        // newDate.setHours(7, 0, 0, 0)
        // return newDate.toISOString().slice(0, 10)
        const year = newDate.getFullYear();
        const month = (1 + newDate.getMonth()).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
    
        // return day  + '/' +  month + '/' + year;

        return `${year}-${month}-${day}`
        
    }
    return valueReturnDefault
}

export const dateDiff = (fromDate: Date, toDate: Date, totalDayOfmonth = 31): { days: number, months: number, years: number } => {
    const diff = Math.floor(toDate.getTime() - fromDate.getTime());
    const days = Math.floor(diff / DAY_TIME);
    const months = Math.floor(days / totalDayOfmonth);
    const years = Math.floor(months / 12);
    return {
        days,
        months,
        years
    }
}