import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import TextInput from './TextInput';
import CenterDecorator from '../../storybook/CenterDecorator';

storiesOf('Data Entry / TextInput', module)
    .addDecorator(CenterDecorator)
    .add(
        'standard',
        withInfo()(() => {
            return <TextInput onChange={action('change')} name="myname" />;
        })
    )
    .add(
        'with error',
        withInfo()(() => {
            return (
                <TextInput onChange={action('change')} name="myname" hasError />
            );
        })
    )
    .add(
        'disabled',
        withInfo()(() => {
            return (
                <TextInput onChange={action('change')} name="myname" disabled />
            );
        })
    )
    .add(
        'without browser autoComplete',
        withInfo()(() => {
            return (
                <div>
                    <TextInput
                        onChange={action('change')}
                        name="myname"
                        autoComplete={false}
                    />
                    <p>
                        Make sure you have your browsers auto-fill feature
                        enabled. It should be disabled for this field.
                    </p>
                </div>
            );
        })
    );
