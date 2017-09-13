import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import SelectInput from './SelectInput';
import CenterDecorator from '../../storybook/CenterDecorator';

const SOME_OPTIONS = [
    {
        id: 'zebra',
        name: 'Zebra',
    },
    {
        id: 'lion',
        name: 'Lion',
    },
];

storiesOf('SelectInput', module)
    .addDecorator(CenterDecorator)
    .add(
        'standard',
        withInfo()(() => {
            return (
                <SelectInput
                    onChange={action('change')}
                    name="myname"
                    options={SOME_OPTIONS}
                    value="zebra"
                />
            );
        })
    )
    .add(
        'disabled',
        withInfo()(() => {
            return (
                <SelectInput
                    disabled
                    onChange={action('change')}
                    name="myname"
                    options={SOME_OPTIONS}
                    value="zebra"
                />
            );
        })
    );
