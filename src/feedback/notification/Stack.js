import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Item from './Item';
import { theme } from '../../config';

export default class NotificationStack extends Component {
    static propTypes = {
        notifications: PropTypes.array.isRequired,
        onDismiss: PropTypes.func.isRequired,
    };

    renderNotification = notification => {
        return (
            <Item
                key={notification.key}
                type={notification.type}
                message={notification.message}
                dismissAfter={notification.dismissAfter}
                onDismiss={() => this.props.onDismiss(notification)}
            />
        );
    };

    render() {
        return (
            <StackWrapper>
                {this.props.notifications.map(this.renderNotification)}
            </StackWrapper>
        );
    }
}

const StackWrapper = styled.div`
    position: fixed;
    top: 20px;
    z-index: ${props => theme(props, 'zIndexDropdownMenu')};
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    pointer-events: none;
`;
