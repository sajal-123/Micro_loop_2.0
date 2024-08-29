'use client';

import Logo from '@/app/_comoponents/Logo';
import { db } from '@/config/firebaseConfig';
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      saveUserData();
    }
  }, [user]); // Added 'user' as a dependency

  const saveUserData = async () => {
    if (!user) return;

    const docId = user.id || Date.now().toString(); // Use user ID if available, fallback to timestamp

    try {
      await setDoc(doc(db, 'LoopUsers', docId), {
        name: user.fullName,
        avatar: user.imageUrl,
        email: user.primaryEmailAddress?.emailAddress
      });
      console.log("User data saved successfully.");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className='flex items-center justify-between p-3 shadow-sm'>
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={'/dashboard'}
        afterCreateOrganizationUrl={'/dashboard'}
      />
      <UserButton />
    </div>
  );
}

export default Header;
