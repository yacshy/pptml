import Vue from 'vue'
import Vuex from 'vuex'

import { IPPTState } from './ppt'

Vue.use(Vuex)

export interface IRootState {
  ppt: IPPTState
}

export default new Vuex.Store<IRootState>({})
