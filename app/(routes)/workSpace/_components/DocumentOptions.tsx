import React, { FunctionComponent } from 'react'
import { Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DocumentData } from 'firebase/firestore'
const DocumentOptions = ({document,deletedDocument}:{document:DocumentData,deletedDocument:(id: string) => Promise<void> })=> {
    return (
        <div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className='h-4 w-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className=' flex gap-2'><Link2Icon className='w-4 h-4' /> share</DropdownMenuItem>
                    <DropdownMenuItem className=' flex gap-2'><PenBox className='w-4 h-4'/> Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>deletedDocument(document?.id)} className=' flex gap-2 text-red-500 hover:text-red-700'><Trash2 className='w-4 h-4 '/> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default DocumentOptions
