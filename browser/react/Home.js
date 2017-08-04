import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Home = ()=>{
	return (
		<div>
			<h4>Welcome!</h4>
			<Link to='/submit-receipt'><input type="button" id="go_button" value="Submit a Receipt"/></Link>
			<Link to='/faq'><input type="button" id="go_button" value="How Does This Work"/></Link>
		</div>
	)
}

export default Home;