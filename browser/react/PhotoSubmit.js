import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

/**
 * COMPONENT
 */
const PhotoSubmit = (props) => {
  return (
    <div>
      <form action="myform.cgi">
        <input type="file" name="fileupload" value="fileupload" id="fileupload">
        <label for="fileupload"> Select a file to upload</label>
        <br><input type="image" src="/wp-content/uploads/sendform.png" alt="Submit" width="100">
      </form>
    </div>
  )
}