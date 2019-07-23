import React from "react";

import Aux from "../../../hoc/Aux";
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
            {props.ingredients[igKey]}
          </li>);
      })

  return (
    <Aux>
      <h3>你的訂單</h3>
      <p>一種美味的漢堡包，含了以下成分</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>總共價錢：{props.price}</strong></p>
      <p>繼續結帳?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>取消</Button>
      <Button btnType='Success' clicked={props.purchaseContunued}>繼續</Button>
    </Aux>
  );
};

export default orderSummary;
