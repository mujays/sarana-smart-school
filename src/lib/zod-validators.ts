import { z } from "zod";
import { containsEmoji } from "./emoji-utils";
import { validateIndonesianPhone, validatePhoneInput } from "./phone-utils";

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

/**
 * Custom Zod validator untuk nomor telepon Indonesia (format lama)
 */
export const indonesianPhoneString = (
  minMessage = "Nomor telepon harus diisi"
) =>
  z
    .string()
    .min(1, minMessage)
    .refine((val) => !containsEmoji(val), {
      message: "Nomor telepon tidak boleh mengandung emoticon atau emoji",
    })
    .refine(
      (val) => {
        const validation = validateIndonesianPhone(val);
        return validation.isValid;
      },
      {
        message: "Nomor telepon harus dimulai dengan 08 atau 8",
      }
    );

/**
 * Custom Zod validator untuk PhoneInput component
 */
export const phoneInputString = (minMessage = "Nomor telepon harus diisi") =>
  z
    .string()
    .min(1, minMessage)
    .refine((val) => !containsEmoji(val), {
      message: "Nomor telepon tidak boleh mengandung emoticon atau emoji",
    })
    .refine(
      (val) => {
        const validation = validatePhoneInput(val);
        return validation.isValid;
      },
      {
        message:
          "Nomor telepon harus dimulai dengan angka 8 (contoh: 8123456789)",
      }
    );
