import { ErrMsg } from './errors'
import { UserInfo } from './modules/database/schema/user'

export type ApiResponse = {
  err:
    | {
        [K in keyof UserInfo]?: ErrMsg
      }
    | null
}
