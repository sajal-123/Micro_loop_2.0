import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerProps {
    children: React.ReactNode;
    setEmojiIcon: (emoji: string) => void;
    className?: string;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({ children, setEmojiIcon, className }) => {
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    
    return (
        <div className={className}>
            <div onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
                {children}
            </div>
            {
                isEmojiPickerOpen && (
                    <div className='absolute z-[10]'>
                        <EmojiPicker 
                            mojiStyle='facebook'
                            onEmojiClick={(event, emojiObject) => {
                                setEmojiIcon(event.emoji);
                                setIsEmojiPickerOpen(false);
                            }}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default EmojiPickerComponent;
