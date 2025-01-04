// RewardHistory interface
export interface TRewardHistory {
  id: number; // UUID	Primary Key, Unique	Unique reward identifier
  userId: number; // UUID	Foreign Key (Users)	Associated user ID
  rewardType: Date; // VARCHAR(50)	NOT NULL	Type of reward (e.g., streak, badge)
  details?: string; // TEXT	NULLABLE	Additional reward details
  createdAt: Date; // TIMESTAMP	Default: CURRENT_TIMESTAMP	Reward creation time
}
