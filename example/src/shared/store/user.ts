import { observable } from 'mobx';
import { version } from 'mobx-sync-lite';

/**
 * @desc the version control for a node, if the instance of the node
 * persisted is different, it will be ignored.
 */
@version(2)
export class UserStore {
  @observable id = 1;
  @observable name = '';
  @observable avatar = '';
}

export const user = new UserStore();
