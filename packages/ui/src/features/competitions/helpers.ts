import { ContestTypeEnum, GenderEnum, RoundParticipantDto } from '@hemager/api-types';
import { I18n } from '@lingui/core';
import { msg } from '@lingui/macro';

import { MenGenderIcon, MixedGenderIcon, WomenGenderIcon } from '@/assets/icons';

export const getCompetionTypeCaption = (competitionType: ContestTypeEnum, _: I18n['_']) => {
  switch (competitionType) {
    case ContestTypeEnum.national:
      return _(msg`National`);
    case ContestTypeEnum.international:
      return _(msg`International`);
    default:
      return '???';
  }
};

export const getGenderCaption = (gender: GenderEnum, _: I18n['_'], plural = true) => {
  switch (gender) {
    case GenderEnum.male:
      return plural ? _(msg`Men`) : _(msg`Man`);
    case GenderEnum.female:
      return plural ? _(msg`Women`) : _(msg`Woman`);
    case GenderEnum.mixed:
      return plural ? _(msg`Mixed`) : _(msg`Other`);
    default:
      return '???';
  }
};

export const getGenderIcon = (gender: GenderEnum) => {
  switch (gender) {
    case GenderEnum.male:
      return MenGenderIcon;
    case GenderEnum.female:
      return WomenGenderIcon;
    case GenderEnum.mixed:
      return MixedGenderIcon;
    default:
      return null;
  }
};

export const getGenderAbbrv = (gender: GenderEnum, _: I18n['_']) => {
  switch (gender) {
    case GenderEnum.male:
      return _(msg`M`);
    case GenderEnum.female:
      return _(msg`F`);
    case GenderEnum.mixed:
      return _(msg`-`);
    default:
      return '???';
  }
};

export const mapParticipantsByGroup = (participants: RoundParticipantDto[]) => {
  const participantsByGroup = participants?.reduce<Record<UUID, RoundParticipantDto[]>>(
    (acc, participant) => {
      if (!participant.groupId) return acc;

      if (!acc[participant.groupId]) {
        acc[participant.groupId] = [];
      }

      acc[participant.groupId].push(participant);

      return acc;
    },
    {},
  );

  return participantsByGroup;
};

export const mapParticipantsByCompetitorId = (participants: RoundParticipantDto[]) => {
  return participants.reduce<Record<UUID, RoundParticipantDto>>((acc, participant) => {
    acc[participant.contestant.id] = participant;

    return acc;
  }, {});
};
