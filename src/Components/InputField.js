// src/components/InputField.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import COLORS from '../styles/colors';

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 8px;
  border: 1px solid ${COLORS.grisBorde};
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Seravek', sans-serif;
`;
const InputError = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
`;

/**
 * InputField Component
 * --------------------
 * Reusable input field for text or password, with styled appearance.
 *
 * Props:
 * - placeholder: string displayed inside the input.
 * - type: input type ('text' or 'password').
 * - value: current value of the input field.
 * - onChange: callback function triggered on value change.
 *
 * Features:
 * - Password type shows an eye icon to toggle visibility.
 * - Handles styling and layout for form consistency.
 */
const InputField = ({ placeholder, type = 'text', value, onChange }) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === 'password';

    return (
        <InputWrapper>
            <InputContainer>
                <Input
                    placeholder={placeholder}
                    type={isPassword && !visible ? 'password' : 'text'}
                    value={value}
                    onChange={onChange}
                />
                {isPassword && (
                    <ToggleIcon onClick={() => setVisible(!visible)}>
                        {visible ? <FaEyeSlash /> : <FaEye />}
                    </ToggleIcon>
                )}
            </InputContainer>
        </InputWrapper>
    );
};

export default InputField;
