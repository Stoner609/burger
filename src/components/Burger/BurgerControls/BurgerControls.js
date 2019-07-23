import React from 'react'

import classes from './BurgerControls.scss';
import BuildControl from './BurgerControl/BurgerControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>目前價錢: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button 
      className={classes.OrderButton} 
      disabled={!props.purchasable}
      onClick={props.ordered}
    >現在下單</button>
  </div>
);

export default buildControls;