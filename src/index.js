import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Login from './components/Login';
// import Register from './components/Register';

ReactDOM.render(
  <Router>
    <div>
      {/* Pulled in from starter Passport app, need to look to see if needed */}
      {/* <Route exact path='/' component={App} /> */}
      {/* <Route path='/login' component={Login} /> */}
      {/* <Route path='/register' component={Register} /> */}
      <Route exact path="/admin" component={AdminHomepage} />
      <Route exact path="/admin/users" component={UserList} />
      <Route exact path="/admin/partners" component={PartnerList} />
      <Route exact path="/admin/roles" component={RoleList} />
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/create" component={CreateAccountPage} />
      <Route exact path="/request" component={RequestQuote} />
      <Route component={NotFoundPage} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();