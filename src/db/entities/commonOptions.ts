import { getTime } from 'date-fns'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  ValueTransformer
} from 'typeorm'
import { IBaseRecordModel } from '../../models'

const dateTransformer: ValueTransformer = {
  from(value: number) {
    return value && new Date(value)
  },
  to(value: Date) {
    return getTime(value)
  }
}

class BaseRecordEntity implements IBaseRecordModel {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number

  // @CreateDateColumn({ type: 'timestamp' })
  @Column({ type: 'unsigned big int', transformer: dateTransformer }) // support multi db type but perf because new date by js
  public createdAt: Date

  // @UpdateDateColumn({ type: 'timestamp' })
  @Column({ type: 'unsigned big int', transformer: dateTransformer }) // support multi db type but perf because new date by js
  public updatedAt: Date

  @BeforeUpdate()
  private updateDate(): void {
    this.updatedAt = new Date()
  }

  @BeforeInsert()
  private initDate(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { BaseRecordEntity }
