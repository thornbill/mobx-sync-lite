import { SMap } from 'monofile-utilities/lib/map';
import * as util from 'util';
import { SyncStorage } from './sync';

export class MemoryStorage implements SyncStorage {
  private data: SMap<string> = {};

  constructor(public debug = false) {}

  getItem(key: string) {
    this.debug &&
      process.stderr.write(
        util.format('storage.get %s: %s\n', key, this.data[key]),
      );
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  }

  removeItem(key: string) {
    this.debug && process.stderr.write(util.format('storage.remove %s\n', key));
    delete this.data[key];
  }

  setItem(key: string, value: string) {
    this.debug &&
      process.stderr.write(util.format('storage.set %s: %s\n', key, value));
    this.data[key] = value + '';
  }
}
