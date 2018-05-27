const JOB_ACTIONS = {
  GET_ALL: 'getAll',
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove',
};

const JOB_CATEGORY_ACTIONS = {
  GET_ALL: 'getAll',
  ADD: 'add',
  REMOVE: 'remove',
};

const JOB_COMPONENT_ACTIONS = {
  GET_ALL: 'getAll',
  ADD: 'add',
  REMOVE: 'remove',
};

const TASK_ACTIONS = {
  GET_ALL: 'getAll',
  GET_ASSIGNED: 'getAssigned',
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove',
  ADMIN_COMPLETE: 'adminComplete',
};

const TASK_ASSIGNMENT_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  PROMOTE: 'promote',
  ACTIVITY: 'activity',
};

const mapActions = (property, actionNamesToActions) => {
  const actionNames = Object.keys(actionNamesToActions);
  const propertyWithActions = {};
  let actionName;

  for (let i = 0; i < actionNames.length; i += 1) {
    actionName = actionNames[i];

    propertyWithActions[
      `${property.toUpperCase()}_${actionName}`
    ] = `${property}.${actionNamesToActions[actionName]}`;
  }

  return propertyWithActions;
};

const jobWithActions = {
  ...mapActions('job', JOB_ACTIONS),
  ...mapActions('job', mapActions('category', JOB_CATEGORY_ACTIONS)),
  ...mapActions('job', mapActions('component', JOB_COMPONENT_ACTIONS)),
};

const taskWithActions = {
  ...mapActions('task', TASK_ACTIONS),
  ...mapActions('task', mapActions('assignment', TASK_ASSIGNMENT_ACTIONS)),
};

const extraActions = {
  JOB_DETAILS_VIEW: 'job.details.view',
  JOB_DETAILS_UNVIEW: 'job.details.unview',
  TASK_DETAILS_VIEW: 'task.details.view',
  TASK_DETAILS_UNVIEW: 'task.details.unview',
};

export default {
  ...jobWithActions,
  ...taskWithActions,
  ...extraActions,
};

