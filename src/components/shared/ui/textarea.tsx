import * as React from "react";

import { cn } from "@/lib/utils";
import { handleKeyPress, handlePaste, removeEmojis } from "@/lib/emoji-utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  allowEmoji?: boolean; // Prop untuk mengizinkan emoji jika diperlukan
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, allowEmoji = false, onKeyDown, onPaste, onChange, ...props },
    ref
  ) => {
    const handleEmojiKeyPress = (
      e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (!allowEmoji) {
        handleKeyPress(e);
      }
      onKeyDown?.(e);
    };

    const handleEmojiPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      if (!allowEmoji) {
        const cleanedText = handlePaste(e);
        const target = e.target as HTMLTextAreaElement;

        // Update value dengan text yang sudah dibersihkan
        const syntheticEvent = {
          target: { ...target, value: cleanedText },
          currentTarget: target,
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange?.(syntheticEvent);
      } else {
        onPaste?.(e);
      }
    };

    const handleEmojiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!allowEmoji) {
        const cleanedValue = removeEmojis(e.target.value);
        if (cleanedValue !== e.target.value) {
          const syntheticEvent = {
            ...e,
            target: { ...e.target, value: cleanedValue },
          };
          onChange?.(syntheticEvent);
          return;
        }
      }
      onChange?.(e);
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onKeyDown={handleEmojiKeyPress}
        onPaste={handleEmojiPaste}
        onChange={handleEmojiChange}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
