import React from 'react';
import {mount} from 'react-mounter';

// components
import MainLayout from '../core/components/main_layout.jsx';

// containers
import JobsList from './containers/jobslist';
import Job from './containers/job';
import NewJob from './containers/newjob';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/jobs', {
    name: 'jobs.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<JobsList />)
      });
    }
  });

  FlowRouter.route('/job/:jobId', {
    name: 'jobs.single',
    action({jobId}) {
      mount(MainLayoutCtx, {
        content: () => (<Job jobId={jobId}/>)
      });
    }
  });

  FlowRouter.route('/jobs/new', {
    name: 'jobs.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewJob/>)
      });
    }
  });
}
