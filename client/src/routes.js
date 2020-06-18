import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated, isAdmin } from './auth';
import NewUserPage from './components/user/NewUserPage';
import LoginPage from './components/login/LoginPage';
import UserList from './components/user/UserList';
import Page from './components/Page';
import FormDesofuscador from './components/desofuscador/FormDesofuscador';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest} render={props => (
        isAuthenticated() ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: "/login", state: {from: props.location} }} />)
    )} />
);
const PrivateAdminRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest} render={props => (
        isAuthenticated() && isAdmin() ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: "/login", state: {from: props.location} }} />)
    )} />
);

const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ?
        (<Redirect to={{ pathname: "/app", state: {from: props.location} }} />) : 
        (<Component {...props} />)
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route 
                exact 
                path="/" 
                component={() => <Redirect to={{ pathname: "/app" }} />} />

            <LoginRoute 
                exact 
                path="/login/" 
                component={() => <LoginPage />} />

            <PrivateRoute 
                path="/app/" 
                component={() => <Page body={<FormDesofuscador />} />} />

            <PrivateAdminRoute 
                path="/admin/" 
                component={() => <Page body={<UserList />} />} />

            <LoginRoute 
                exact 
                path="/createaccount" 
                component={() => <NewUserPage />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;