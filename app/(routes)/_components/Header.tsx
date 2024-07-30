'use client'

import Logo from '@/app/_comoponents/Logo'
import { OrganizationSwitcher, useAuth, UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const {orgId}=useAuth();
  return (
    <div className='flex items-center justify-between p-3 shadow-sm'>
      <Logo/>
      <OrganizationSwitcher
      afterLeaveOrganizationUrl={'/dashboard'}
      afterCreateOrganizationUrl={'/dashboard'}
      />
      <UserButton/>
    </div>
  )
}

export default Header
