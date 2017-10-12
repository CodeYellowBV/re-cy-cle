import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DatePickerWrapper from './DatePickerWrapper';
import moment from 'moment';
import { StyledInput } from './TextInput';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { withTheme } from 'styled-components';
import { theme } from '../config';

const StyledMaskedInput = StyledInput.withComponent(
    ({ hasError, _ref, ...props }) => <MaskedInput {...props} ref={_ref} />
);

// This is not a hack, it is a documented workaround (in react-day-picker)!
class MaskedDateInput extends PureComponent {
    // Okay specifically this is a horrible hack.
    static contextTypes = {
        inputDateFormat: PropTypes.string,
    };

    focus = () => {
        this.input.inputElement.focus();
    };

    setRef = el => {
        this.input = el;
    };

    // In our config we have a date format like "dd-mm-yyyy". We need to translate this to an input mask like this;
    // [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    getMaskBasedOnDateFormat(dateFormat) {
        return dateFormat.split('').map(char => {
            if (/[a-z]/i.test(char)) {
                return /\d/;
            }
            return char;
        });
    }

    render() {
        const dateFormat = this.context.inputDateFormat.toLowerCase();
        return (
            <StyledMaskedInput
                _ref={this.setRef}
                {...this.props}
                mask={this.getMaskBasedOnDateFormat(dateFormat)}
                pipe={createAutoCorrectedDatePipe(dateFormat)}
                keepCharPositions
            />
        );
    }
}

@withTheme
export default class SingleDatePicker extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.instanceOf(moment),
        disabled: PropTypes.bool,
        hasError: PropTypes.bool,
        disabledDays: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    };

    static defaultProps = {
        placeholder: '',
        value: null,
    };

    // The context hack is a hack we have to pull because making <MaskedDateInput /> have a @withTheme decorator
    // makes react-day-picker break. So instead of using the `theme` prop, we pass the relevant theme config as `context`.
    static childContextTypes = {
        inputDateFormat: PropTypes.string,
    };

    getChildContext() {
        return {
            inputDateFormat: theme(this.props, 'dateFormat'),
        };
    }

    handleChange = (selectedDay, { disabled }) => {
        if (!this.props.onChange) return;

        if (!disabled) {
            this.props.onChange(this.props.name, selectedDay);
        }
    };

    render() {
        const dateFormat = theme(this.props, 'dateFormat');
        const value = this.props.value
            ? this.props.value.format(dateFormat)
            : '';
        // TODO: currently you cannot use most props you might need from the react-day-picker component
        const dayPickerProps = {
            disabledDays: this.props.disabledDays,
        };
        return (
            <DatePickerWrapper>
                <DayPickerInput
                    component={MaskedDateInput}
                    onDayChange={this.handleChange}
                    value={value}
                    disabled={this.props.disabled}
                    hasError={this.props.hasError}
                    placeholder={this.props.placeholder}
                    format={dateFormat}
                    dayPickerProps={dayPickerProps}
                />
            </DatePickerWrapper>
        );
    }
}
