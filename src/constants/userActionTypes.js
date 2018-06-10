const userActionsMap = {
  USER_AUTH: 'user.auth',
  USER_LOGIN: 'user.login',
  USER_SIGNUP: 'user.signup',
  USER_DATA_GET: 'user.data.get',
  USER_ACCESS_TOKEN_GET: 'user.access.token.get',
};

const reqSucFai = (actionsMap) => {
  const actionNames = Object.keys(actionsMap);
  let actionName;
  const actionReqSucFaiMap = {};

  for (let i = 0; i < actionNames.length; i += 1) {
    actionName = actionNames[i];
    actionReqSucFaiMap[`${actionName}_REQUEST`] = `${actionsMap[actionName]}.request`;
    actionReqSucFaiMap[`${actionName}_SUCCESS`] = `${actionsMap[actionName]}.success`;
    actionReqSucFaiMap[`${actionName}_FAILURE`] = `${actionsMap[actionName]}.failure`;
  }

  return actionReqSucFaiMap;
};

const extraUserActions = {
  USER_LOGOUT: 'user.logout',
  USER_GET_ALL: 'user.getAll',
  USER_GET_ALL_ERROR: 'user.getAll.error',
};

export default {
  ...reqSucFai(userActionsMap),
  ...extraUserActions,
};
