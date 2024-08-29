import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function WorkSpaceItemList({ workSpacelist }: { workSpacelist: any[] }) {
    const router=useRouter();
    const OnClickWorkSpaceitem=(id:string)=>{
           router.push('workSpace/'+id);
    }
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-red-500 mt-12 gap-6'>
      {workSpacelist && workSpacelist.length > 0 ? (
        workSpacelist.map((workspace, index) => (
          <div key={index} className="workspace-item hover:scale-105 duration-200 cursor-pointer transition-all shadow-xl overflow-hidden rounded-xl border items-center justify-center flex flex-col"
           onClick={()=>OnClickWorkSpaceitem(workspace.id)}
          >
            <Image src={workspace?.coverUrl} alt='' width={400} height={200}
            className='h-[150px] object-cover rounded-t-xl '
            ></Image>
            <div className=' rounded-b-xl p-4'>
            <h2 className='flex gap-2'>{workspace?.emoji}  {workspace.name}</h2>
            </div>
            <p>{workspace.description}</p>
            {/* Add more fields as necessary */}
          </div>
        ))
      ) : (
        <p>No workspaces available.</p>
      )}
    </div>
  );
}

export default WorkSpaceItemList;
