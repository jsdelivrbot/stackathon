import React, {Component} from 'react'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import history from './history'
import {Main, Home, SubmitReceipt, Splitting, FAQ, Split, HowManyPeople} from './react';

/**
 * COMPONENT
 */

/**
STATE: 
splitItems : {9pizza: [1, 2, 3], 6soda: [1,3, 2], 3candy: [3], 4gum: [2,1 ,3]} 
dividedTotal : { '1': 6.333333333333333, '2': 6.333333333333333, '3': 9.333333333333332 }
receipt: {'4.50' : 'pizza', '9.00': 'soda', '1.00' : 'hamburger'},
**/

 class Routes extends Component {
  constructor(){
    super();
    this.state = {
      receipt: {'4.50' : 'pizza', '9.00': 'soda', '1.00' : 'hamburger'},
      participants : [],
      splitItems : {},
      dividedTotal : {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.divideTotal = this.divideTotal.bind(this);
    this.addParticipants = this.addParticipants.bind(this);
    this.addSplitItems = this.addSplitItems.bind(this);
    this.addReceipt = this.addReceipt.bind(this);
  }

  addReceipt(receipt){
    this.setState({receipt});
  }

  addParticipants(participants){
    this.setState({participants}); 
  }

  addSplitItems(splitItems){
    this.state.splitItems = splitItems;
    this.divideTotal();
  }

  handleChange(e) {
    if (e.target.value === 'off' || !e.target.value){
      e.target.value = 'on';
    } else {
      e.target.value = 'off';
    }
  }

  handleClick(e){
    if (e.target.value === 'off' || !e.target.value){
      e.target.value = 'on';
    } else {
      e.target.value = 'off';
    } 
  }

  divideTotal(){
    let items = this.state.splitItems;
    let divided = {};
    for (let i of Object.keys(items)){
      let price = i.split(' ').filter(item => isPrice(item));
      for (let j of items[i]){
        if (!divided[j]){
          divided[j] = 0;
        }
        divided[j]+= Number(price)/parseFloat(items[i].length);
      }
    }
    this.state.splitItems = divided;
  };

  render(){
    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/submit-receipt" render={()=> <SubmitReceipt addParticipants={this.addParticipants} addReceipt={this.addReceipt}/>} />
            <Route path="/submit-form" render={()=> <Splitting receipt={this.state.receipt} addSplitItems={this.addSplitItems} participants={this.state.participants} handleClick={this.handleClick} />} />
            <Route path='/home' component={Home} />
            <Route path='/faq' component={FAQ} />
            <Route path='/split' render={()=><Split participants={this.state.participants} dividedTotal={this.state.splitItems}/>} />
            <Route path='/test' component={HowManyPeople} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

function isPrice(price){
  let splitP = String(price).split('.');
  return splitP.length === 2 && splitP[1].length === 2 && Number(splitP[0]) && price.indexOf('.') !== -1; 
}

export default Routes;