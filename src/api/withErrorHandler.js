import React, { Component } from 'react';

import Modal from '../utils/Modal';
import ChildHoc from '../hoc/childHoc';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({ error: null });
                axios.interceptors.request.use(
                    (config) => {
                        if (sessionStorage.getItem('authenticatedUser')) {
                            //  config.headers.authorization = token
                            config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                        }
                        return config
                    }
                )
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <ChildHoc>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </ChildHoc>
            );
        }
    }
}

export default withErrorHandler;