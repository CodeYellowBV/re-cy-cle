import React from 'react';
import SvgIcon from '../Icon';

let IconDragHandle = props => (
    <SvgIcon {...props}>
        <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
    </SvgIcon>
);

export default IconDragHandle;
