import React from 'react';
import Navigation from './navigation';

const Layout = ({content = () => null }) => (
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
    <header>
      <h1>i18n - Monitor</h1>
      <Navigation />
    </header>
    <div>
      {content()}
    </div>
    <footer>
      <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> &amp; Meteor.</small>
    </footer>
  </div>
);

export default Layout;
