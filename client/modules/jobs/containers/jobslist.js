import JobsList from '../components/jobslist';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('jobs.list').ready()) {
    const jobs = Collections.Jobs.find().fetch();
    onData(null, {jobs});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(JobsList);
