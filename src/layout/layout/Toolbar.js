import styled from 'styled-components';
import { tint } from 'polished';

export default styled.section`
    height: 40px;
    background-color: ${props => props.theme.primaryColor ? tint(0.15, props.theme.primaryColor) : 'red'};
    display: flex;
    align-items: center;
    padding: 0 25px 0 25px;
`;
