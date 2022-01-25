import { observable } from 'mobx';
import { ignore } from 'mobx-sync-lite';
import { user } from './user';
import { article } from './article';

export class RootStore {
  /**
   * @desc ignore node, this node will not be persisted, and its changes
   * will not trigger persist event.
   * @type {boolean}
   */
  @ignore
  @observable
  storeLoaded = false;

  @observable
  article = article;

  @observable
  user = user;
}

export const store = new RootStore();
