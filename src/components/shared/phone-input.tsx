import * as React from "react";
import { cn } from "@/lib/utils";
import { handleKeyPress, handlePaste, removeEmojis } from "@/lib/emoji-utils";

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  allowEmoji?: boolean; // Prop untuk mengizinkan emoji jika diperlukan
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      allowEmoji = false,
      onKeyDown,
      onPaste,
      onChange,
      value,
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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // Hapus emoji jika tidak diizinkan
      if (!allowEmoji) {
        inputValue = removeEmojis(inputValue);
      }

      // Hanya izinkan digit
      inputValue = inputValue.replace(/\D/g, "");

      // Jika user ketik 62 di awal, hapus untuk menghindari +6262
      if (inputValue.startsWith("62")) {
        inputValue = inputValue.substring(2);
      }

      // Batasi panjang maksimal (13 digit setelah +62)
      if (inputValue.length > 13) {
        inputValue = inputValue.substring(0, 13);
      }

      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: inputValue },
      };

      onChange?.(syntheticEvent);
    };

    return (
      <div className="relative w-full">
        {/* Prefix +62 */}
        <div className="absolute left-0 top-0 h-full flex items-center px-3 border-r bg-muted/50 text-muted-foreground text-sm font-medium rounded-l-md">
          +62
        </div>

        {/* Input field */}
        <input
          type="tel"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-16 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          placeholder="8123456789"
          onKeyDown={handleEmojiKeyPress}
          onPaste={handleEmojiPaste}
          onChange={handlePhoneChange}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
