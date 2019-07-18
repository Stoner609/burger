import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  }

  updatePurchaseState () {
    let sum = Object.keys(this.state.ingredients)
        .map(igKey => this.state.ingredients[igKey])
        .reduce((total, el) => {
          return total + el
        }, 0);

    this.setState((prev) => ({
      purchasable: sum > 0
    }));
  }

  addIngredientHandler = (type) => {
    const priceAddition = INGREDIENT_PRICES[type];
    
    this.setState((prev) => ({
        ingredients: {
          ...prev.ingredients,
          [type]: prev.ingredients[type] + 1
        },
        totalPrice: prev.totalPrice + priceAddition
    }), this.updatePurchaseState);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return;

    const priceAddition = INGREDIENT_PRICES[type];
    this.setState((prev) => ({
        ingredients: {
          ...prev.ingredients,
          [type]: prev.ingredients[type] - 1
        },
        totalPrice: prev.totalPrice - priceAddition
    }), this.updatePurchaseState);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;