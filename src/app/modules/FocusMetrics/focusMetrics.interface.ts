// FocusMetric interface
export interface TFocusMetric {
  metric_id: number;
  user_id: number;
  date: Date;
  total_focus_time: number;
  sessions_completed: number;
  streak_count: number;
  longest_streak: number;
  badge_awarded?: string;
}
