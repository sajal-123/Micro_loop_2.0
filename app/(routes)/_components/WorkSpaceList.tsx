'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WorkSpaceList: React.FC = () => {
  const { user } = useUser();
  const [workSpacelist, setworkSpacelist] = useState([])
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

        </div>)
      }
    </div>
  );
};

export default WorkSpaceList;
