// User interface
export interface TUser {
  id: number; // UUID	Primary Key, Unique	Unique user identifier
  name: string; // VARCHAR(50)	NOT NULL	User's full name
  email: string; // VARCHAR(50)	NOT NULL, Unique	User's email address
  password: string; // VARCHAR(255)	NOT NULL	User's password
  avatarUrl?: string; // TEXT	NULLABLE	User's avatar URL
  role: string; // ENUM	Default: 'user'	User role: student, admin
  createdAat: Date; // TIMESTAMP	Default: CURRENT_TIMESTAMP	User creation time
  updatedAt: Date; // TIMESTAMP	Default: CURRENT_TIMESTAMP	User update time
}
