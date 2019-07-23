import React from "react";

import Aux from "../../../hoc/Aux";

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
      <p>Hello</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>是否要結帳?</p>
    </Aux>
  );
};

export default orderSummary;
