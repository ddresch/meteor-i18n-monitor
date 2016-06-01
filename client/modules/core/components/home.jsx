import React from 'react';

const Home = () => (
  <div>
    <h1>i18n-Monitor</h1>
    <p>
      Simple i18n Management via google Spreadsheets.
    </p>
    <strong>Setup Steps</strong>
    <ol>
      <li>
        Create a Gsheet <a target="_blank" href="https://www.google.com/spreadsheets">here</a> or
      </li>
      <li>
        Download example Gsheet <a target="_blank" href="https://www.google.com/spreadsheets">here</a>
      </li>
      <li>
        Google API Console <a target="_blank" href="https://developers.google.com/">here</a>
      </li>
    </ol>
    <strong>Setup monitoring jobs</strong>
    <ul>
      <li>Create <a href="/jobs/new">new</a> job</li>
    </ul>
  </div>
);

export default Home;
