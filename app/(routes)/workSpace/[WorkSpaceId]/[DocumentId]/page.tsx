'use client';
import React, { useEffect } from 'react';
import SideNav from '../../_components/SideNav';
import { useRouter } from 'next/navigation';
import { DocumentEditor } from '../../_components/DocumentEditor';
// Define a type for params if you know the specific properties
interface Params {
  [key: string]: any; // Replace 'any' with specific types if known
}

interface WorkSpaceDocumentProps {
  params: Params;
}

const WorkSpaceDocument: React.FC<WorkSpaceDocumentProps> = ({ params }) => {
   const router=useRouter();
  return (
    <div className='flex'>
      {/* Side Nav */}
      <div className='fixed'>
        <SideNav  params={params}/>
      </div>
      {/* Document */}
      <div className='md:ml-[20vw]'>
        <DocumentEditor params={params}/>
      </div>
    </div>
  );
};

export default WorkSpaceDocument;
