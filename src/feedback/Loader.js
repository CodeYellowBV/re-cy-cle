import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const sweep = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    animation: ${sweep} 0.7s infinite linear;
    margin: 5px;
    transition: 200ms all linear;

    ${props => {
        const height = props.height ? props.height : 18;
        if (props.show) {
            return `
                width: ${height}px;
                height: ${height}px;
                border-radius: ${height / 2}px;
                box-shadow: 4px 0 0px -3px black;
                transition-duration: 1s;
            `;
        }
        return 'box-shadow: 10px 0 0px -10px black;';
    }};
`;

Loader.displayName = 'Loader';
Loader.propTypes = {
    show: PropTypes.bool,
};

export default Loader;
