import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
            {this.props.ingredients[igKey]}
          </li>);
      });

    return (
      <Aux>
        <h3>你的訂單</h3>
        <p>一種美味的漢堡包，含了以下成分</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>總共價錢：{this.props.price}</strong></p>
        <p>繼續結帳?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>取消</Button>
        <Button btnType='Success' clicked={this.props.purchaseContunued}>繼續</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
