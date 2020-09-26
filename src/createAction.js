export const createAction = () => {
  const action = params => action.cbs?.forEach(fn => fn(params))

  return action
}
