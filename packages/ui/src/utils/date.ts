import { format } from 'date-fns';

export const formatUIDate = (date: Date | string) => format(date, 'dd/MM/yyyy');
