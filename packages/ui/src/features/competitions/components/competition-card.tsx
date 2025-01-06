import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GenderEnum } from '@/generated/server';
import { FC } from 'react';
import { getGenderCaption, getGenderIcon } from '../helpers';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatUIDate } from '@/utils/date';
import { Separator } from '@/components/ui/separator';
import { ClockIcon, UsersRound, ZapIcon } from 'lucide-react';
import { msg } from '@lingui/macro';
import { Chip } from '@/components/ui/chip';
import { Link } from 'react-router-dom';
import { pathnames } from '@/app/pathnames';
import { useLingui } from '@lingui/react';

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
                  <GenderIcon className="size-5 text-primary" />
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
          <div className="flex gap-2 flex-wrap">
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
