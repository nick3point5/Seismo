import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import PostDetails from '../pages/PostDetails/PostDetails';
import UserSettingsPage from '../pages/UserSettingsPage/UserSettingsPage';
import UserPage from '../pages/UserPage/UserPage';

const routes = (
  <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route path='/post/:id' component={PostDetails}/>
    <Route exact path='/user/settings' component={UserSettingsPage}/>
    <Route path='/user/:id' component={UserPage}/>
  </Switch>
)

export default routes;