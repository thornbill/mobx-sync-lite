import { observer } from 'mobx-react';
import * as React from 'react';
import { store } from './store';

@observer
export class App extends React.Component {
  render() {
    return (
      <div>
        {store.storeLoaded ? 'Persisted store is loaded' : 'Loading stores...'}
      </div>
    );
  }
}
