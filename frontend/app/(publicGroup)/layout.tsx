import React from 'react'
import { getMe } from '@/service/getMe'
import { Navbar } from '@/shared/navbar';

const PublicGroupLayout =async ({
    children
}:{
    children:React.ReactNode
}) => {
    const user=await getMe();
  return (
    <div>
      <Navbar user={user}/>

    {children}
    </div>
  )
}

export default PublicGroupLayout
