import NewJob from '../components/newjob';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SAVING_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.jobs.create,
  clearErrors: actions.jobs.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewJob);
