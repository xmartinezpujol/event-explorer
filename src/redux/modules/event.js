const SELECT = 'nightgraph/event/SELECT';
const UNSELECT = 'nightgraph/event/UNSELECT';

const initialState = null;

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UNSELECT:
      return initialState;
    case SELECT:
      return action.eventId;
    default: return state;
  }
}

// Action Creators
export const selectEvent = eventId => ({
  type: SELECT,
  eventId,
});

export const unselectEvent = () => ({
  type: UNSELECT,
});