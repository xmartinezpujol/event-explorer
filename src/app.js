import React from 'react';

import EventsView from './containers/EventsView';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EventsView />
    );
  }
}

export default App;
