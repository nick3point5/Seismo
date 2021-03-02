import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const routes = (
  <Switch>
    <Route exact path='/' component={HomePage}/>
    {/* <Route exact path='/new' component={NewPostPage}/> */}
  </Switch>
)

export default routes;