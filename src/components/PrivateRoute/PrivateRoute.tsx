import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');

  useEffect(() => {
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      message.warning('Sesión expirada. Inicia sesión nuevamente.');
      navigate('/');
    }
  }, [expiresAt, navigate]);

  if (!token) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
