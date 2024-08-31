'use client'
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WrokSpaceItemList from './WrokSpaceItemList'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const WorkSpaceList: React.FC = () => {
  const { user } = useUser();
  const [workSpacelist, setworkSpacelist] = useState([])
  const orgId = useAuth();

  useEffect(() => {
    if (user) {
      getWorkSpaceList();
    }
  }, [user]);

  const getWorkSpaceList = async () => {
    setworkSpacelist([])
    // console.log("data->",orgId ? orgId.orgId : user?.primaryEmailAddress?.emailAddress)
    try {
      const q = query(
        collection(db, 'WorkSpace'),
        where('orgId', '==', orgId ? orgId.orgId : user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   setworkSpacelist(prev => [...prev, doc.data()]);
      //   console.log(doc.data())
      // });
      const workSpaces = querySnapshot.docs.map((doc) => doc.data());
      console.log(workSpaces)
      setworkSpacelist(workSpaces);
    } catch (error) {
      console.error('Error fetching workspaces: ', error);
    }
  };

  return (
    <div className='p-10 md:px-24 lg:px-36 xl:px-52 my-10'>
      <div className='flex justify-between items-center'>
        <h1 className=' font-bold text-2xl'> Hello, {user?.fullName}</h1>
        <Link href={'/CreateWorkSpace'}>
          <Button >+</Button>
        </Link>
      </div>
      <div className='mt-10 flex items-center justify-around'>
        <div>
          <h1 className="font-medium text-primary">
            WorkSpaces
          </h1>
        </div>
        <div className='flex gap-2'>
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workSpacelist?.length == 0 ?
        (<div className='flex items-center justify-center flex-col'>
          <Image src={'/workspace.png'} alt='Workspace' width={200} height={200} />
          <h2>Create new Workspace</h2>
          <Link href={'/CreateWorkSpace'}>
            <Button className='my-4' variant={'outline'}>+ new workspace</Button>
          </Link>
        </div>) : (<div>
        <WrokSpaceItemList workSpacelist={workSpacelist} />
        </div>)
      }
    </div>
  );
};

export default WorkSpaceList;
