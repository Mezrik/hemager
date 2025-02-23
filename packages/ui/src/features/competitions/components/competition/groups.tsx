import { APIError } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { pathnames } from '@/app/pathnames';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, Input, InputBase, Label } from '@/components/ui/form';
import { useToast } from '@/hooks/ui/use-toast';

import { useCompetition } from '../../api/get-competition';
import { useCompetitionsGroups } from '../../api/get-groups';
import { initializeGroupsInputSchema, useInitializeGroups } from '../../api/initialize-groups';

type GroupsProps = {
  competitionId: UUID;
};

const LOWEST_GROUP_SIZE = 4;

export const Groups: FC<GroupsProps> = ({ competitionId }) => {
  const { _ } = useLingui();
  const { toast } = useToast();
  const groupsQuery = useCompetitionsGroups({ competitionId });
  const competitionQuery = useCompetition({
    competitionId,
  });

  const initializeGroups = useInitializeGroups({
    mutationConfig: {
      onSettled: (data) => {
        data?.unwrapOrElse((error) =>
          toast({
            description: error.cause,
            variant: 'destructive',
          }),
        );
      },
    },
  });

  const groups = groupsQuery.data?.unwrapOrElse<APIError>((error) => error);
  const competition = competitionQuery.data?.unwrapOrElse<APIError>((error) => error);

  if ((groups && 'cause' in groups) || (competition && 'cause' in competition)) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  console.log(groups);

  if (groupsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!competition?.groupsCanBeCreated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Trans>The competition does not have any parameters set</Trans>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Trans>
            You need to set the parameters for the competition before you can create groups.
          </Trans>
        </CardContent>
      </Card>
    );
  }

  if (groups?.length === 0 && competition?.groupsCanBeCreated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Trans>No groups found</Trans>
          </CardTitle>

          <CardDescription>
            <Trans>
              No groups found for this competition. You can initialize new groups by clicking the
              button below.
            </Trans>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Form
            schema={initializeGroupsInputSchema}
            onSubmit={(data) => {
              console.log(data);
              initializeGroups.mutate({ data });
            }}
            options={{
              defaultValues: {
                contestId: competitionId,
                maxParticipantsPerGroup: LOWEST_GROUP_SIZE,
              },
            }}
          >
            {({ formState, register }) => (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Input
                    label={_(msg`Ideal number participants per group`)}
                    error={formState.errors['maxParticipantsPerGroup']}
                    registration={register('maxParticipantsPerGroup')}
                    type="number"
                    className="max-w-60"
                  />
                </div>
                <input type="hidden" {...register('contestId')} />
                <Button type="submit">
                  <Trans>Initialize groups</Trans>
                </Button>
              </div>
            )}
          </Form>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {groups?.map((group) => (
        <Link to={pathnames.buildCompetitionGroupPath(group.id, competitionId)} key={group.id}>
          <Card className="col-span-4 transition-colors hover:bg-gray-50 sm:col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>
                <Trans>Piste: --</Trans>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="divide-y divide-gray-200">
                {group.participants?.map((participant) => (
                  <li className="py-1" key={participant?.contestant?.id}>
                    {participant.contestant.firstname} {participant.contestant.surname}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
