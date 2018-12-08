import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'

import { compareToHash, createHash } from '../../utils'

import { IUser } from '../../models'

import { BaseRecordEntity } from './commonOptions'

@Entity()
export class UserEntity extends BaseRecordEntity implements IUser {
  @Column()
  public name: string

  @Column({ unique: true })
  public email: string

  @Column()
  public password: string

  private tempPassword: string

  public validatePassword(requestPassword) {
    return compareToHash(requestPassword, this.password)
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeUpdate()
  @BeforeInsert()
  private encryptPassword(): void {
    if (this.tempPassword !== this.password) {
      this.password = createHash(this.password)
    }
  }
}

export default UserEntity
