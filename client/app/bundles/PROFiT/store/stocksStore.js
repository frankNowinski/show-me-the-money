import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  const { stocks, user } = props;
  const { $$stocksState, $$userState } = initialStates;

  const initialState = {
    $$stocksStore: $$stocksState.merge({ stocks }),
    $$userStore: $$userState.merge({ user })
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
