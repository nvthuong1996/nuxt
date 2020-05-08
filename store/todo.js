import { SET_TODO, UPDATE_TODO } from '@/constants/mutations/todo.mutations'
import { set, update } from '@/utils/vuex'

export const state = () => ({
  todos: []
})

export const mutations = {
  [SET_TODO]: set('todos'),
  [UPDATE_TODO]: update('todos')
}

export const actions = {}
