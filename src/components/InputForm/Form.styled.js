import styled from 'styled-components';
import { Field, Form } from 'formik';
export const Input = styled(Field)`
  display: block;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 95%;
`;
export const FormStyled = styled(Form)`
  margin-bottom: 30px;
`;
export const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;
`;
