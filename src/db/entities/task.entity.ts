import { Column, Entity } from 'typeorm'

import { ETaskStatus, ITask, taskStatusArray } from '../../models'

import { BaseRecordEntity } from './commonOptions'

@Entity()
export class TaskEntity extends BaseRecordEntity implements ITask {
  @Column()
  public userId: number

  @Column()
  public name: string

  @Column()
  public description: string

  @Column({ enum: taskStatusArray, type: 'varchar' })
  public status: ETaskStatus
}

export default TaskEntity
