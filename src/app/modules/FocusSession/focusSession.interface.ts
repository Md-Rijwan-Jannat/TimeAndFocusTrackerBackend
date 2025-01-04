// FocusSession interface
export interface TFocusSession {
  id: number; //Primary Key, Unique	Unique session identifier
  userId: number; // Foreign Key (Users)	User who started the session
  focusDuration: number; // NT	NOT NULL	Focus duration in minutes
  breakDuration: number; // INT	NOT NULL	Break duration in minutes
  startedAt: Date; // TIMESTAMP	NOT NULL	Session start time
  pausedAt: Date; // TIMESTAMP	NULLABLE	Timestamp when the session was paused
  resumedAt: Date; // TIMESTAMP	NULLABLE	Timestamp when the session was resumed
  endedAt: Date; // TIMESTAMP	NULLABLE	Session end time
  status: string; // ENUM	Default: 'active'	Session status: active, paused, completed
  isComplete: boolean; // BOOLEAN	Default: FALSE	Whether the session was completed
}
