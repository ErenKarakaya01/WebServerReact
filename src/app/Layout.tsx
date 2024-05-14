import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../entities/CustomJwtPayload';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/BackendService';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token !== null) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded);
      if (decoded.role === 'ADMIN') {
        navigate('/admin/courses');
      } else {
        navigate('/user/courses');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
