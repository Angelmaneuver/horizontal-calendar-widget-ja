import { styled } from 'uebersicht';

// const days    = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
// const months  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days    = ['日', '月', '火', '水', '木', '金', '土'];
const months  = ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神奈月', '霜月', '師走'];
const offdays = [0, 6];

export const className = `
    bottom:      9em;
    left:        8em;
    font-family: Helvetica Neue;
    font-size:   11px;
    font-weight: 500;
    color:       #fff;

    table {
        border-collapse: collapse;
    }

    td {
        padding-left:  4px;
        padding-right: 4px;
        text-align:    center;
    }

    .weekday td {
        padding-top: 3px;
    }

    .date td {
        padding-bottom: 3px;
    }

    .today,
    .off-today {
        background: rgba(255,255,255,.2);
    }

    .weekday .today,             
    .weekday .off-today {
        border-radius: 3px 3px 0 0;
    }

    .date .today,                
    .date .off-today {
        border-radius: 0 0 3px 3px;
    }

    .midline {
        height: 3px;
        background: rgba(255,255,255,.5);
    }

    .midline .today {
        background: rgba(0,187,255,.8);
    }

    .midline .offday {
        background: rgba(255,119,119,.5);
    }

    .midline .off-today {
        background: rgba(255,204,51,.8);
    }
    .offday, .off-today {
        color: rgba(255,119,119,1);
    }
`;

const Container = styled('div')(props => ({
    background:   'rgba(0,0,0,.3)',
    padding:      '10px',
    borderRadius: '10px',
}));

const Title = styled('div')(props => ({
    color:         'rgba(255,255,255,.8)',
    fontSize:      '14px',
    fontWeight:    500,
    paddingBottom: '5px',
    textTransform: 'uppercase',
}));

let executed = false;

export let refreshFrequency = (() => {
    const now     = new Date();
    const seconds = 60 - now.getSeconds();
    const minutes = 60 - now.getMinutes() - (0 !== seconds ? 1 : 0);
    const hours   = 24 - now.getHours() - (0 !== minutes ? 1 : 0);

    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
})();

export const command = () => {
    if (executed) {
        refreshFrequency = 24 * 60 * 60 * 1000;
    } else {
        executed = true;
    }
}

export const render = () => {
    const data     = getData();
    const headline = [];
    const midline  = [];
    const daysline = [];

    Object.keys(data['days']).forEach(
        (day) => {
            const toDay      = data['days'][day];
            const className  = toDay['className'];
            const dayPerWeek = toDay['dayPerWeek'];

            headline.push(<td key = {day} className = {className}>{days[dayPerWeek]}</td>);
            midline.push(<td key = {day} className = {className}/>);
            daysline.push(<td key = {day} className = {className}>{day}</td>);
        }
    );

    return (
        <Container>
            <Title>{data['year']}年 {months[data['month']]}</Title>
            <table>
                <tbody>
                    <tr className = 'weekday'>{headline}</tr>
                    <tr className = 'midline'>{midline}</tr>
                    <tr className = 'date'>{daysline}</tr>
                </tbody>
            </table>
        </Container>
    );
}

const getData = () => {
    const now                  = new Date();
    const [year, month, toDay] = [now.getFullYear(), now.getMonth(), now.getDate()];
    const firstWeekDay         = new Date(year, month, 1).getDay();
    const lastDay              = new Date(year, month + 1, 0).getDate();
    const data                 = {};

    data['year']               = year;
    data['month']              = month;
    data['days']               = {};

    for (let day = 1, dayPerWeek = firstWeekDay; day <= lastDay; day++, dayPerWeek++) {
        dayPerWeek      = dayPerWeek % 7;
        const isToday   = toDay === day;
        const isOff     = offdays.includes(dayPerWeek);
        let   className = 'ordinary';

        if (isToday && isOff) {
            className = 'off-today';
        } else if (isToday) {
            className = 'today';
        } else if (isOff) {
            className = 'offday';
        }

        data['days'][day] = {
            className:  className,
            dayPerWeek: dayPerWeek,
        };
    }

    return data;
}