// RewardHistory interface
export interface TRewardHistory {
  reward_id: number;
  user_id: number;
  badge_id: number;
  awarded_at: Date;
  description?: string;
}
