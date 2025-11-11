import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import {
  handleKeyPress,
  handlePaste,
  removeEmojis,
  containsEmoji,
} from "@/lib/emoji-utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  allowEmoji?: boolean; // Prop untuk mengizinkan emoji jika diperlukan
}

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      allowEmoji = false,
      onKeyDown,
      onPaste,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleEmojiKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowEmoji) {
        handleKeyPress(e);
      }
      onKeyDown?.(e);
    };

    const handleEmojiPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!allowEmoji) {
        const cleanedText = handlePaste(e);
        const target = e.target as HTMLInputElement;

        // Update value dengan text yang sudah dibersihkan
        const syntheticEvent = {
          target: { ...target, value: cleanedText },
          currentTarget: target,
        } as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
      } else {
        onPaste?.(e);
      }
    };

    const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!allowEmoji) {
        const originalValue = e.target.value;
        const cleanedValue = removeEmojis(originalValue);

        // Hanya intercept jika benar-benar ada emoji yang dihapus
        if (cleanedValue !== originalValue && containsEmoji(originalValue)) {
          // Update input value secara langsung
          e.target.value = cleanedValue;

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
      <div className="relative w-80">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
            className
          )}
          ref={ref}
          onKeyDown={handleEmojiKeyPress}
          onPaste={handleEmojiPaste}
          onChange={handleEmojiChange}
          {...props}
        />
        <SearchIcon className="text-muted-foreground absolute top-2 left-2" />
      </div>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
