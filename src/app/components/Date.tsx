import { parseISO, format } from 'date-fns';

interface DateProp {
    dateString : string;
}

export default function Date ({ dateString }: DateProp): JSX.Element {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'd MMM yyyy')}</time>;
}