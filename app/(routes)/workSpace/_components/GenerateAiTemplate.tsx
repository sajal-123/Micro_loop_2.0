import { Button } from '@/components/ui/button';
import { LayoutGridIcon, Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { chatSession } from '@/config/GoogleAiModel';

type GenerateAiTemplateProps = {
    setGenerateAIOutput: (output: any) => void;
};

function GenerateAiTemplate({ setGenerateAIOutput }: GenerateAiTemplateProps) {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const GenerateFromAI = async () => {
        if (!userInput) return;

        setLoading(true);
        try {
            const PROMPT = `Generate template from editor.js in JSON for ${userInput}`;
            const result = await chatSession.sendMessage(PROMPT);
            const output = await result.response.text();
            const parsedOutput = JSON.parse(output);

            setGenerateAIOutput(parsedOutput);

        } catch (error) {
            console.error('Error generating AI template:', error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)} className='flex gap-2' variant='outline'>
                <LayoutGridIcon className='h-4 w-4' /> Generate AI
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate AI Template</DialogTitle>
                        <DialogDescription className='gap-2 flex flex-col'>
                            <h2 className='mt-2'>What do you want to write in the document?</h2>
                            <Input 
                                placeholder='Ex: Project Idea' 
                                onChange={(e) => setUserInput(e.target.value)} 
                                value={userInput}
                            />
                            <div className='flex gap-5 mt-5 justify-end'>
                                <Button onClick={() => setOpen(false)} variant={"ghost"}>Cancel</Button>
                                <Button 
                                    disabled={!userInput || loading} 
                                    onClick={GenerateFromAI}
                                >
                                    {loading ? <Loader2Icon className='animate-spin' /> : 'Generate'}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GenerateAiTemplate;
