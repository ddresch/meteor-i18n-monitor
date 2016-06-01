import Job from '../components/job';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, jobId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('jobs.single', jobId).ready()) {
    const job = Collections.Jobs.findOne(jobId);
    onData(null, {job});
  } else {
    const job = Collections.Jobs.findOne(jobId);
    if (job) {
      onData(null, {job});
    } else {
      onData();
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Job);
