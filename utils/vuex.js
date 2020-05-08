export const set = (key, defaultValue) => (state, value) =>
  (state[key] = value || defaultValue)

export const toggle = (key) => (state) => (state[key] = !state[key])

export const add = (property) => (
  state,
  { newEl, toTopOfList = true, perPage = 50 }
) => {
  if (toTopOfList) state[property].unshift(newEl)
  else state[property].push(newEl)
  if (state[property].length > perPage) state[property].splice(perPage, 1)
}

export const remove = (property) => (state, { id, index }) => {
  if (index !== 0 && !index)
    index = state[property].findIndex((_e) => _e.id === id)
  if (index > -1) state[property].splice(index, 1)
}

export const update = (key) => (state, { value, index }) => {
  if (!Array.isArray(state[key])) {
    return Object.assign(state[key], value)
  }
  if (!index) {
    index = state[key].findIndex((_e) => {
      return _e.id === value.id
    })
  }
  if (index >= 0) {
    state[key].splice(index, 1, value)
  }
}

export const setProperty = (keyState) => (
  state,
  { key, value, index = -1 }
) => {
  try {
    if (index >= 0) state[keyState][index][key] = value
    else state[keyState][key] = value
  } catch (error) {
    return new Error(error)
  }
}

export const setPropertyNestedObject = () => (state, { obj, property }) => {
  const { key, value } = property
  obj[key] = value
}

export const removeByIds = (property) => (state, ids) => {
  state[property] = state[property].filter((_e) => !ids.includes(_e.id))
}
