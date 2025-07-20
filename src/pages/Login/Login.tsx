import React, { useState, useCallback } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './Login.module.scss';
import users from '../../utils/users.json';
import type { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (values: User): void => {
    const found = users.find(
      (user: User) => user.email === values.email && user.password === values.password
    );

    if (found) {
      const expiresAt = Date.now() + 5 * 60 * 1000; 
      localStorage.setItem('token', 'logged-in');
      localStorage.setItem('expiresAt', expiresAt.toString());
      message.success('Login successful!');
      navigate('/dashboard');
    } else {
      message.error('Invalid email or password');
    }
  };

  const validateForm = useCallback((): void => {
    const values = form.getFieldsValue();
    const hasEmail = values.email && values.email.trim() !== '';
    const hasPassword = values.password && values.password.trim() !== '';
    const isEmailValid = values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
        
    setIsFormValid(hasEmail && hasPassword && isEmailValid);
  }, [form]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onFieldsChange={validateForm}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email format' }
            ]}
          >
            <Input 
              className={styles.input}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' }
            ]}
          >
            <Input.Password 
              className={styles.input}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              disabled={!isFormValid} 
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;