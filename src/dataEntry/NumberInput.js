import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyledInput } from './TextInput';
import MaskedInput from 'react-text-mask';
import { pick, omit } from 'lodash';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const PROPS_MASK = ['prefix', 'suffix', 'includeThousandsSeparator', 'thousandsSeparatorSymbol', 'allowDecimal', 'allowNegative', 'decimalSymbol', 'decimalLimit'];

const MyInput = StyledInput.withComponent(({ hasError, ...props }) => (
    <MaskedInput {...props} />
));

export default class NumberInput extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        hasError: PropTypes.bool,
        maxLength: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        autoFocus: PropTypes.bool,

        prefix: PropTypes.string,
        suffix: PropTypes.string,
        includeThousandsSeparator: PropTypes.bool,
        thousandsSeparatorSymbol: PropTypes.string,
        allowDecimal: PropTypes.bool,
        allowNegative: PropTypes.bool,
        decimalSymbol: PropTypes.string,
        decimalLimit: PropTypes.number,
        className: PropTypes.string,
    };

    static defaultProps = {
        placeholder: '',
        value: '',
        // text-mask-addons has some default values we don't like; by default we only want to force the field to contain numbers
        prefix: '',
        includeThousandsSeparator: false,
    };

    static contextTypes = {
        formFieldHasError: PropTypes.bool,
    };

    parseValue = e => {
        let value = e.target.value;
        const { prefix, suffix, thousandsSeparatorSymbol } = this.props;
        if (prefix) {
            value = value.replace(prefix, '');
        }
        if (suffix) {
            value = value.replace(suffix, '');
        }
        if (thousandsSeparatorSymbol) {
            // The thousands separator symbol is a visual thingy so should be removed. It can occur multipe times.
            value = value.split(thousandsSeparatorSymbol).join('');
        }

        // TODO: As `value` prop both a string and a number are allowed. However, after a change the value is always a string.
        // Perhaps we can detect that and cast to number?
        return value;
    };

    onChange = e => {
        if (!this.props.onChange) return;

        this.props.onChange(this.props.name, this.parseValue(e));
    };

    onBlur = e => {
        if (!this.props.onBlur) return;

        this.props.onBlur(this.props.name, this.parseValue(e));
    };

    getMask(props) {
        return createNumberMask(pick(props, PROPS_MASK));
    }

    render() {
        const value = this.props.value !== null ? this.props.value : '';

        return (
            <MyInput
                {...omit(this.props, PROPS_MASK)}
                name={this.props.name}
                id={this.props.id}
                disabled={this.props.disabled}
                value={value}
                placeholder={this.props.placeholder}
                maxLength={this.props.maxLength}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.props.onFocus}
                autoFocus={this.props.autoFocus}
                hasError={this.props.hasError || this.context.formFieldHasError}
                guide={false}
                mask={this.getMask(this.props)}
                className={this.props.className}
            />
        );
    }
}
