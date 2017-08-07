import React from 'react';
import {Navbar} from './index';

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