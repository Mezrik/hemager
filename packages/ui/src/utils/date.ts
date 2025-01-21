import { format } from 'date-fns';

export const formatUIDate = (date: Date | string) => format(date, 'dd/MM/yyyy');

export const formatUIDateWithTime = (date: Date | string) => format(date, 'dd/MM/yyyy HH:mm:ss');
