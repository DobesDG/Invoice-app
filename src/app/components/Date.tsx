import { parseISO, format, add } from 'date-fns';

interface DateProp {
    dateString : string;
    days: number
}

export default function Date ({ dateString, days }: DateProp): JSX.Element {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(add(date,{days: days + 1}), 'd MMM yyyy')}</time>;
}