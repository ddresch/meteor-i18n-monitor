import React from 'react';

const Job = ({job}) => (
  <div>
    {job.saving ? <p>Saving...</p> : null}
    <h2>{job.title}</h2>
    <p>
      {job.content}
    </p>
  </div>
);

export default Job;
