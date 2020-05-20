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
  ADD_ASSIGNMENT: 'addAssignment',
  REMOVE_ASSIGNMENT: 'removeAssignment',
  PROMOTE_ASSIGNMENT: 'promoteAssignment',
  ASSIGNMENT_ACTIVITY: 'assignmentActivity',
};

const mapActions = (property, actionNamesToActions) => {
  const actionNames = Object.keys(actionNamesToActions);
  const propertyWithActions = {};
  let actionName;

  propertyWithActions[
    property.toUpperCase()
  ] = property; // e.g. { JOB: 'job' }

  for (let i = 0; i < actionNames.length; i += 1) {
    actionName = actionNames[i];

    propertyWithActions[
      `${property.toUpperCase()}_${actionName}`
    ] = `${property}.${actionNamesToActions[actionName]}`;
    // e.g. { JOB_ADD: 'job.add' }
    propertyWithActions[
      `${property.toUpperCase()}_${actionName}_ERROR`
    ] = `${property}.${actionNamesToActions[actionName]}.error`;
    // e.g. { JOB_ADD_ERROR: 'job.add.error' }
  }

  return propertyWithActions;
};

const jobWithActions = {
  ...mapActions('job', JOB_ACTIONS),
  ...mapActions('job', mapActions('category', JOB_CATEGORY_ACTIONS)),
  ...mapActions('job', mapActions('component', JOB_COMPONENT_ACTIONS)),
};

const taskWithActions = mapActions('task', TASK_ACTIONS);

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

