import React, { useCallback, useRef, useContext } from 'react';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';
import Select from '../../components/Select';

interface ISignData {
  email: string;
  password: string;
  office: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);

  const options = [
    { value: 'MKT', label: 'Marketing' },
    { value: 'realtor', label: 'Corretor' },
    { value: 'Dono', label: 'Dono' },
  ];

  const handleSubmit = useCallback(
    async (data: ISignData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
          office: Yup.string().required('Cargo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn();
      } catch (err) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
    },
    [signIn],
  );
  return (
    <Container>
      <Content>
        <Logo />
        <h1>Login</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type="email" name="email" icon={FaUser} placeholder="E-mail" />
          <Input
            type="password"
            name="password"
            icon={RiLockPasswordFill}
            placeholder="Senha"
          />

          <Select name="office" options={options} icon={IoMdArrowDropdown} />
          <Button type="submit">ENTRAR</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
