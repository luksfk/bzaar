import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { AppNavigator } from '../components/navigation';
import { RECEIVE_LOGIN } from '../actionTypes/login';
import { RECEIVE_REGISTER } from '../actionTypes/register';
import { USER_REGISTER, CREDITCARD_REGISTER, BACK } from '../actionTypes/navigation';
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginPage'));

export default function nav(state = initialState, action) {
  switch(action.type){
    case 'Login':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'LoginPage' }), state);
    case RECEIVE_LOGIN:
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'HomePage' }), state);
    case USER_REGISTER:
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'RegisterPage' }), state);
    case CREDITCARD_REGISTER:
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CreditCardPage' }), state);
    case BACK:
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'Logout':
    case RECEIVE_REGISTER:
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'LoginPage' }), state);
    default:
      return state;
  }
};