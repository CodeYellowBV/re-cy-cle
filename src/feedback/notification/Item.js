import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from '../../general/Button';

const TRANSITION_TIME = 500;

@observer
export default class NotificationItem extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        onDismiss: PropTypes.func.isRequired,
        dismissAfter: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        type: PropTypes.oneOf(['info', 'error']),
    };

    static defaultProps = {
        dismissAfter: 3100,
        type: 'info',
    };

    componentDidMount() {
        this.animateInTimeout = setTimeout(this.animateIn.bind(this));

        if (this.props.dismissAfter !== false) {
            this.expireTimeout = setTimeout(
                this.expire.bind(this),
                this.props.dismissAfter
            );
        }
    }

    componentWillUnmount() {
        if (this.animateInTimeout) clearTimeout(this.animateInTimeout);
        if (this.expireTimeout) clearTimeout(this.expireTimeout);
        if (this.transitionTimeout) clearTimeout(this.transitionTimeout);
    }

    onDismiss = () => {
        this.props.onDismiss();
    };

    @observable active = false;

    animateIn() {
        this.active = true;
    }

    forceDismiss = e => {
        if (e) e.preventDefault();
        this.expire();
    };

    expire() {
        this.active = false;
        this.transitionTimeout = setTimeout(this.onDismiss, TRANSITION_TIME);
    }

    render() {
        return (
            <StyledItem active={this.active} type={this.props.type}>
                {this.props.message}
                <CloseButton icon onClick={this.onDismiss}>
                    ✕
                </CloseButton>
            </StyledItem>
        );
    }
}

const CloseButton = styled(Button)`
    margin-left: 11px;
    position: absolute;
    top: 13px;
    right: 13px;
    font-size: 15px;
`;

const StyledItem = styled.div`
    width: 250px;
    padding: 10px 40px 10px 14px;
    color: #000;
    margin-bottom: 15px;
    border-radius: 4px;
    position: relative;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
    pointer-events: all;
    transition: ${TRANSITION_TIME}ms cubic-bezier(0.89, 0.01, 0.5, 1.1);
    word-wrap: break-word;
    ${props =>
        !props.active
            ? `
        visibility: hidden;
        opacity: 0;
    `
            : ''} background: ${props => {
            switch (props.type) {
                case 'info':
                    return '#fbf2c4';
                case 'error':
                    return '#f1a1a8';
                default:
                    break;
            }
        }};
`;
