import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_ERROR,
  GET_CAMPAIGNS_SUCCESS
} from '../actions';

const initialState = {
  error: '',
  pending: {
    login: false,
    logout: false,
    getUser: false
  },
  currentUser: {
    id: 1,
    role: 'conservationist',
    profile: {
      campaigns: []
    }
  },
  selectedProfile: {
    campaigns: []
  },
  allCampaigns: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        pending: { ...state.pending, login: true },
        error: ''
      };
    case LOGIN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: action.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        orgName: action.organization.name,
        accesToken: action.organization.accessToken,
        error: ''
      };
    case LOGOUT_START:
      return {
        ...state,
        pending: { ...state.pending, logout: true },
        error: ''
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case GET_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, getProfile: true },
        error: ''
      };
    case GET_PROFILE_SUCCESS:
      if (action.payload.myProfile) {
        console.log('MY PROFILE', action.payload.user.id);
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          currentUser: {
            ...state.currentUser,
            profile: action.payload.user
          }
        };
      } else {
        console.log('NOT MY PROFILE', action.payload.user.id);
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          selectedProfile: action.payload.user
        };
      }
    case GET_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getProfile: false },
        error: action.payload
      };
    case GET_CAMPAIGNS_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: true },
        error: ''
      };
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        allCampaigns: action.payload
      };
    case GET_CAMPAIGNS_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
