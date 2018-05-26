import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import { Scrollbars } from 'react-custom-scrollbars';

const StyledScrollbars = styled(({ tone, ...props }) => (
    <Scrollbars {...props} />
))`
    flex: 1;
    background: ${props =>
        props.tone === 'primary'
            ? tint(0.07, props.theme.primaryColor)
            : props.theme.componentBackground};
`;

const Main = styled.main`
    margin: 0 auto;
    max-width: 1500px;
    padding: 25px;
    ${props =>
        props.blur
            ? `
        filter: blur(2px) grayscale(40%);
        pointer-events: none;
        opacity: 0.6;
    `
            : null};
    transition: 200ms filter ease;

    ${props =>
        props.center
            ? `
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `
            : null};
`;

class Content extends Component {
    static propTypes = {
        children: PropTypes.node,
        center: PropTypes.bool,
        blur: PropTypes.bool,
        tone: PropTypes.oneOf(['primary']),
    }

    render() {
        const { center, blur, children, ...scrollbarProps} = this.props;

        return (
            <StyledScrollbars {...scrollbarProps}>
                <Main center={center} blur={blur}>
                    {children}
                </Main>
            </StyledScrollbars>
        );
    }
}

export default Content;
