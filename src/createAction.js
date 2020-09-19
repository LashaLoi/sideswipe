export const createAction = () => {
  const action = params => action.cbs.forEach(cb => cb(params))

  return action
}
