import { MatchChangeEnum, MatchStateItem } from '@/generated/server';

export const processMatchState = (
  state: MatchStateItem[],
  participantOneId: UUID,
  participantTwoId: UUID,
) => {
  let participantOneScore = 0;
  let participantTwoScore = 0;

  state.forEach((item) => {
    if (item.change === MatchChangeEnum.point_added) {
      if (item.pointTo === participantOneId) {
        participantOneScore += 1;
      } else if (item.pointTo === participantTwoId) {
        participantTwoScore += 1;
      }
    }

    if (item.change === MatchChangeEnum.point_subtracted) {
      if (item.pointTo === participantOneId) {
        participantOneScore -= 1;
      } else if (item.pointTo === participantTwoId) {
        participantTwoScore -= 1;
      }
    }
  });

  return {
    participantOneScore,
    participantTwoScore,
  };
};
