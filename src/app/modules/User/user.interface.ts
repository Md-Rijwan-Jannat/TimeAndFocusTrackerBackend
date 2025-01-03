// User interface
export interface TUser {
  user_id: number;
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}
