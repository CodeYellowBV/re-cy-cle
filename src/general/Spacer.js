import styled from 'styled-components';

export const Spacer = styled.span`
    padding-left: 20px;

    ${props => props.small ? `padding-left: 10px;` : null}
    ${props => props.large ? `padding-left: 40px;` : null}
    ${props => props.width ? `padding-left: ${props.width}` : null}
`;
