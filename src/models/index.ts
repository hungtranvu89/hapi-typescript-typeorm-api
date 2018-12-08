export interface IBaseIdModel {
  id: number
}

export interface IBaseRecordModel extends IBaseIdModel {
  createdAt: Date
  updatedAt: Date
}

export interface IUser extends IBaseRecordModel {
  name: string
  email: string
  password: string
  // tasks: ITask[]

  validatePassword(requestPassword: string): boolean
}

export enum ETaskStatus {
  TODO = 'todo',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export const taskStatusArray = [
  ETaskStatus.TODO,
  ETaskStatus.ONGOING,
  ETaskStatus.COMPLETED,
  ETaskStatus.CANCELLED
]

export interface ITask extends IBaseRecordModel {
  userId: number
  name: string
  description: string
  status: ETaskStatus
  // user: IUser
}

export interface IPagingOptions {
  skip: number
  top: number
}

export interface IPageOf<T> {
  data: T[]
  total: number
}
