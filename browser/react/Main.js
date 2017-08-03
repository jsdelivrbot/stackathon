import React, { Component } from 'react';
import { HashRouter , Route, Switch } from 'react-router-dom';
import {Navbar, Home} from './index';
import {Router} from 'react-router';
import history from '../history';

const Main = (props) => {

  const {children} = props;

  return (
    <div>
      <Navbar />
      <hr />
      {children}
    </div>
  )
}

export default Main;