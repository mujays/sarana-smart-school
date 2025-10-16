import { z } from "zod";
import { containsEmoji } from "./emoji-utils";

/**
 * Custom Zod validator untuk mencegah emoji/emoticon
 */
export const noEmojiString = (
  message = "Emoticon dan emoji tidak diperbolehkan"
) =>
  z.string().refine((val) => !containsEmoji(val), {
    message,
  });

/**
 * Custom Zod validator untuk string dengan validasi no emoji dan min length
 */
export const requiredNoEmojiString = (
  minLength: number,
  minMessage: string,
  emojiMessage = "Emoticon dan emoji tidak diperbolehkan"
) =>
  z
    .string()
    .min(minLength, minMessage)
    .refine((val) => !containsEmoji(val), {
      message: emojiMessage,
    });

/**
 * Custom Zod validator untuk optional string tanpa emoji
 */
export const optionalNoEmojiString = (
  message = "Emoticon dan emoji tidak diperbolehkan"
) =>
  z
    .string()
    .optional()
    .refine((val) => !val || !containsEmoji(val), {
      message,
    });
