import React from 'react';

import classes from './NavigationItem.scss';

const navigetionItem = (props) => (
  <li className={classes.NavigationItem}>
    <a 
      href={props.link} 
      className={props.active ? classes.active : null}
    >
      {props.children}
    </a>
  </li>
);

export default navigetionItem;