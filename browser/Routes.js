import React, {Component} from 'react'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import history from './history'
import {Main, Home, SubmitReceipt, Splitting, FAQ, Split} from './react';

/**
 * COMPONENT
 */
/**
STATE: 
splitItems : {9pizza: [1, 2, 3], 6soda: [1,3, 2], 3candy: [3], 4gum: [2,1 ,3]} 
dividedTotal : { '1': 6.333333333333333, '2': 6.333333333333333, '3': 9.333333333333332 }
**/

 class Routes extends Component {
  constructor(){
    super();
    this.state = {
      receipt: ['4.5 pizza', '9.0 soda', '1 hamburger'],
      participants : [],
      splitItems : {},
      dividedTotal : {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.divideTotal = this.divideTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.on = !e.target.on;
  }

  handleClick(e){
    console.log('clicked!');
    console.log('event', e);
    console.log('target', e.target);
  }

  handleSubmit(){
    console.log('submitted');
    divideTotal(this.state.splitItems);
  }

  divideTotal(items){
  let divided = {};
  for (let i of Object.keys(items)){
    for (let j of items[i]){
      if (!divided[j]){
        divided[j] = 0;
      }
      divided[j]+= Number(i)/parseFloat(items[i].length);
    }
  }
  this.state.dividedTotal = divided;
};

  render(){
    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/submit-receipt" component={SubmitReceipt}/>
            <Route path="/submit-form" render={()=> <Splitting receipt={this.state.receipt} participants={this.state.participants} handleChange={this.handleChange} handleClick={this.handleClick} handleSubmit={this.handleSubmit} />} />
            <Route path='/home' component={Home} />
            <Route path='/faq' component={FAQ} />
            <Route path='/split' render={()=><Split participants={this.state.participants} dividedTotal={this.state.dividedTotal}/>} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

export default Routes;