import React from 'react'
import { Navbar } from '@/shared/navbar';
import { getMe } from '@/service/getMe';

const AuthLayout =async ({children}:{children:React.ReactNode}) => {
    const user=await getMe();
  return (
    <div>
      <Navbar user={user}/>
      {children}
    </div>
  )
}

export default AuthLayout
