import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FormHandles } from '@unform/core';
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
  const options = [
    { value: 'MKT', label: 'Marketing' },
    { value: 'realtor', label: 'Corretor' },
    { value: 'Dono', label: 'Dono' },
  ];

  const handleSubmit = useCallback((data: ISignData) => {
    console.log(data);
  }, []);
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
