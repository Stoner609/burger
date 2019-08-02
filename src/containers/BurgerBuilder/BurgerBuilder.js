import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  }

  componentDidMount() {
    axios.get('https://react-my-burger-75bb7.firebaseio.com/ingredients.json')
        .then(res => {
          this.setState({ingredients: res.data});
        })
        .catch(error => {
          this.setState({error: true});
        });
  }

  // 顯示菜單按鈕的 disable 屬性
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

  // 新增菜色
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

  // 移除菜色
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

  // 顯示 點菜清單
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  // 隱藏 點菜清單
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState((prevState) => ({
      loading: true,
    }));

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Stoner Hsu",
        addredd: {
          street: 'test Street',
          zipCode: '12345',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );

      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContunued={this.purchaseContinueHandler}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);