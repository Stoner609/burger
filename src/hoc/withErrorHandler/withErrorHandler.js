import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    componentDidCatch(error, info) {
      console.log(error);
    }

    errorConfirmHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
