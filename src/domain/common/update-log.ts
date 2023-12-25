export interface UpdateLog {
  Field: UpdateLogField
  UpdatedAt: Date
}

export enum UpdateLogField {
  Username = 'Username',
  Email = 'Email',
  Password = 'Password',
  IsActive = 'IsActive'
}
