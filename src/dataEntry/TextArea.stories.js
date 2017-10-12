import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import TextArea from './TextArea';
import CenterDecorator from '../../storybook/CenterDecorator';

storiesOf('Data Entry / TextArea', module)
    .addDecorator(CenterDecorator)
    .add(
        'standard',
        withInfo()(() => {
            return (
                <div>
                    <TextArea onChange={action('change')} name="myname" />
                </div>
            );
        })
    )
    .add(
        'with error',
        withInfo()(() => {
            return (
                <TextArea onChange={action('change')} name="myname" hasError />
            );
        })
    )
    .add(
        'disabled',
        withInfo()(() => {
            return (
                <TextArea onChange={action('change')} name="myname" disabled />
            );
        })
    );
