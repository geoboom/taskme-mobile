import { jobTaskActionTypes as actionTypes } from '../constants';

export function viewTaskDetails(taskId) {
  return {
    type: actionTypes.TASK_DETAILS_VIEW,
    taskId,
  };
}

export function unviewTaskDetails() {
  return {
    type: actionTypes.TASK_DETAILS_UNVIEW,
  };
}

export function getAllTasks() {
  return {
    type: actionTypes.TASK_GET_ALL,
  };
}

export function addTask(jobId, title, description, type, dueOn) {
  return {
    type: actionTypes.TASK_ADD,
    payload: {
      jobId,
      title,
      description,
      type,
      dueOn,
    },
  };
}

export function editTask(_id, title, description) {
  return {
    type: actionTypes.TASK_EDIT,
    payload: {
      _id,
      title,
      description,
    },
  };
}

export function removeTask(_id) {
  return {
    type: actionTypes.TASK_REMOVE,
    payload: _id,
  };
}

export function adminCompleteTask(_id) {
  return {
    type: actionTypes.TASK_ADMIN_COMPLETE,
    payload: _id,
  };
}

export function addAssignment(taskId, userId) {
  return {
    type: actionTypes.TASK_ASSIGNMENT_ADD,
    payload: {
      taskId,
      userId,
    },
  };
}

export function removeAssignment(taskId, userId) {
  return {
    type: actionTypes.TASK_ASSIGNMENT_REMOVE,
    payload: {
      taskId,
      userId,
    },
  };
}

export function promoteAssignment(taskId, userId) {
  return {
    type: actionTypes.TASK_ASSIGNMENT_PROMOTE,
    payload: {
      taskId,
      userId,
    },
  };
}

export function assignmentActivity(taskId, activity) {
  return {
    type: actionTypes.TASK_ASSIGNMENT_ACTIVITY,
    payload: {
      taskId,
      activity,
    },
  };
}
