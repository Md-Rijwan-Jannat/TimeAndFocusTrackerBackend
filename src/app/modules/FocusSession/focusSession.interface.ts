// FocusSession interface
export interface TFocusSession {
  session_id: number;
  user_id: number;
  start_time: Date;
  end_time: Date;
  duration: number;
  session_type: string;
  note: string;
  is_successful: boolean;
}
