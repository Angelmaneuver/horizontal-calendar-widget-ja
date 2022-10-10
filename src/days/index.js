const JapaneseHolidays = require('japanese-holidays');

export function getDays(year, month) {
    const days         = {};
    const firstWeekDay = new Date(year, month, 1).getDay();
    const lastDay      = new Date(year, month + 1, 0).getDate();

    for (let day = 1, dayPerWeek = firstWeekDay; day <= lastDay; day++, dayPerWeek++) {
        dayPerWeek = dayPerWeek % 7;

        days[day]    = {
            dayPerWeek: dayPerWeek,
            holiday:    JapaneseHolidays.isHoliday(new Date(year, month, day)),
        };
    }

    return days;
}
