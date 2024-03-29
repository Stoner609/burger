import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      }
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
      
    }
    
    componentDidMount() {
      // this.reqInterceptor = axios.interceptors.request.use(req => {
      //   this.setState({error: null});
      //   return req;
      // });

      // this.resInterceptor = axios.interceptors.response.use(res => res, error => {
      //   this.setState({error: error});
      // });
    }

    componentWillUnmount() {
      console.log('will Unmount', this.reqInterceptor, this.resInterceptor, );
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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
