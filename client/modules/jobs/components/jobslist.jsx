import React from 'react';

const JobsList = ({jobs}) => (
  <div className='jobsList'>
    <a href='/jobs/new' className='btn btn-success'>New Job</a>
    <ul>
      {jobs.map(job => (
        <li key={job._id}>
          <a href={`/job/${job._id}`}>{job.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default JobsList;
