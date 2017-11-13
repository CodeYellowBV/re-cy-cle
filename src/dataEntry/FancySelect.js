import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import { tint } from 'polished';
import { readableColor } from '../config';
import IconArrowDropDown from '../general/icon/IconArrowDropDown';
import IconArrowDropUp from '../general/icon/IconArrowDropUp';
import IconClose from '../general/icon/IconClose';
import { StyledInput } from './TextInput';
import { Button } from '../general/Button';
import { ValuePropType, OptionsPropType } from '../PropTypes';

export const DropdownContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const Dropdown = styled.div`
    width: 100%;
    border: 1px solid ${props => props.theme.primaryColor};
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    position: absolute;
    z-index: ${props => props.theme.zIndexFancySelectDropdown};
`;

export const DropdownToggle = styled.div`
    position: absolute;
    top: -1px;
    right: 0;
`;

export const DropdownItem = styled.div`
    ${props => {
        const background = props.highlighted
            ? tint(0.2, props.theme.primaryColor)
            : props.theme.componentBackground;
        return `
            background: ${background};
            color: ${readableColor(background)};
        `;
    }};
    font-weight: ${props => (props.selected ? 'bold' : 'normal')};
    padding: 4px;
    cursor: default;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// Poor man's filtering.
export function fuzzySearch(options, inputValue) {
    return options.filter(o =>
        o.label.toLowerCase().includes((inputValue || '').toLowerCase())
    );
}

export default class FancySelect extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string,
        value: ValuePropType,
        options: OptionsPropType,
        disabled: PropTypes.bool,
        hasError: PropTypes.bool,
    };

    handleChange = option => {
        this.props.onChange(this.props.name, option.value);
    };

    handleClear = () => {
        this.props.onChange(this.props.name, '');
    };

    renderDropdown = ({
        isOpen,
        getItemProps,
        inputValue,
        highlightedIndex,
        selectedItem,
        options,
    }) => {
        return (
            <Dropdown>
                {options.map((item, index) => (
                    <DropdownItem
                        {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            highlighted: highlightedIndex === index,
                            selected: selectedItem === item.value,
                        })}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </Dropdown>
        );
    };

    itemToString(item) {
        if (item == null) {
            return '';
        }
        return item.label;
    }

    renderDownshift = ({
        getRootProps,
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        openMenu,
        toggleMenu,
        clearItems,
        ...rest
    }) => {
        const options = fuzzySearch(this.props.options, inputValue);
        const actuallyOpen = isOpen && options.length > 0;

        // When `props.value` is set to an empty string, `getInputProps()` will return `value: undefined`.
        // This leads to a React warning about an controlled component set to uncontrolled.
        // Is this a bug in Downshift or a feature??
        const inputProps = getInputProps();

        return (
            <DropdownContainer {...getRootProps({ refKey: 'innerRef' })}>
                <StyledInput
                    {...inputProps}
                    value={inputProps.value || ''}
                    hasDropdown={actuallyOpen}
                    disabled={this.props.disabled}
                    hasError={this.props.hasError}
                    onClick={openMenu}
                />
                <DropdownToggle>
                    {!!this.props.value && (
                        <Button
                            icon
                            onClick={() => {
                                clearItems();
                                this.handleClear();
                            }}
                            tabIndex={-1}
                        >
                            <IconClose width="16" height="16" />
                        </Button>
                    )}
                    <Button icon onClick={toggleMenu} tabIndex={-1}>
                        {actuallyOpen ? (
                            <IconArrowDropUp />
                        ) : (
                            <IconArrowDropDown />
                        )}
                    </Button>
                </DropdownToggle>

                {actuallyOpen &&
                    this.renderDropdown({
                        getItemProps,
                        inputValue,
                        highlightedIndex,
                        selectedItem,
                        options,
                    })}
            </DropdownContainer>
        );
    };

    render() {
        const value = this.props.value || '';

        return (
            <Downshift
                selectedItem={
                    this.props.options.find(o => o.value === value) || value
                }
                onChange={this.handleChange}
                itemToString={this.itemToString}
                defaultHighlightedIndex={0}
            >
                {this.renderDownshift}
            </Downshift>
        );
    }
}
