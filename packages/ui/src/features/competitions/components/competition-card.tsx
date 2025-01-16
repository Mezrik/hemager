import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ClockIcon, UsersRound, ZapIcon } from 'lucide-react';
import { FC } from 'react';
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
import { Chip } from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GenderEnum } from '@/generated/server';
import { formatUIDate } from '@/utils/date';

import { getGenderCaption, getGenderIcon } from '../helpers';

type CompetitionCard = {
  competitionId: UUID;
  name: string;
  gender?: GenderEnum;
  date?: Date | string;
  weapon?: string;
};

export const CompetitionCard: FC<CompetitionCard> = ({
  name,
  gender,
  date,
  weapon,
  competitionId,
}) => {
  const { _ } = useLingui();

  const GenderIcon = gender ? getGenderIcon(gender) : null;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {name}
            {GenderIcon && gender && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <GenderIcon className="text-primary size-5" />
                </TooltipTrigger>
                <TooltipContent>{getGenderCaption(gender, _)}</TooltipContent>
              </Tooltip>
            )}
          </CardTitle>
          <CardDescription className="flex h-5 items-center space-x-2">
            {date && <span>{formatUIDate(date)}</span>}
            {date && weapon && <Separator orientation="vertical" />}
            {weapon && <span>{weapon}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Show dynamic competition statistics */}
          <div className="flex flex-wrap gap-2">
            <Chip Icon={ZapIcon} label={_(msg`Matches`)} text="1/40" />
            <Chip Icon={ClockIcon} label={_(msg`Average match time`)} text="1:32" />
            <Chip Icon={UsersRound} label={_(msg`Participants`)} text="3" />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" asChild>
            <Link to={pathnames.buildCompetitionPath(competitionId)}>View</Link>
          </Button>
          <Button variant="ghost">Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
