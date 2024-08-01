import { useEffect, useState } from 'react';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin");
    if(isLoggedIn)sessionStorage.removeItem("admin");
    return () => {
      sessionStorage.removeItem("admin");
    }
  }, [])

  if(isLoggedIn){
    return (
      <div>
        <hr/>
        Admin
      </div>
    );
  } else {
    return (
      <div>
        <hr/>
        LoginForm
      </div>
    );
  }
};

export default AdminPage;