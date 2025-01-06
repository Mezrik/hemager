import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC } from 'react';

const referees = [
  { id: 1, firstname: 'Petr', surname: 'Petr', piste: 'Piste 1' },
  { id: 2, firstname: 'Random', surname: 'Petr', piste: 'Piste 2' },
  { id: 3, firstname: 'Referee', surname: 'Petr', piste: 'Piste 3' },
];

export const Referees: FC = () => {
  const { _ } = useLingui();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{_(msg`Referees`)}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{_(msg`Name`)}</TableHead>
              <TableHead>{_(msg`Piste`)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referees?.map((referee) => (
              <TableRow>
                <TableCell>
                  {referee.firstname} {referee.surname}
                </TableCell>
                <TableCell>{referee.piste}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
