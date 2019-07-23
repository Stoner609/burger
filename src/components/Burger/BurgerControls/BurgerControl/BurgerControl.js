import React from "react";

import classes from "./BurgerControl.scss";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>減少</button>
    <button 
      className={classes.More} 
      onClick={props.added}>更多</button>
  </div>
);

export default buildControl;
