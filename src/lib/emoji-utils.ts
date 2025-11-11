/**
 * Utility functions untuk mendeteksi dan memfilter emoticon/emoji
 */

// Regex pattern untuk mendeteksi emoji dan emoticon
const EMOJI_REGEX =
  /[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]|[\uD83C][\uDF00-\uDFFF]|[\uD83D][\uDC00-\uDE4F]|[\uD83D][\uDE80-\uDEFF]|[\uD83E][\uDD00-\uDDFF]/g;

// Pattern untuk emoticon berbasis teks seperti :), :D, :(, dll
// Lebih spesifik untuk menghindari false positive
const TEXT_EMOTICON_REGEX = /[:;=8][-o*']?[)(\]D\\/|oOpP@#]/g;

/**
 * Mengecek apakah string mengandung emoji atau emoticon
 * @param text - Text yang akan dicek
 * @returns boolean - true jika mengandung emoji/emoticon
 */
export function containsEmoji(text: string): boolean {
  return EMOJI_REGEX.test(text) || TEXT_EMOTICON_REGEX.test(text);
}

/**
 * Menghapus semua emoji dan emoticon dari string
 * @param text - Text yang akan dibersihkan
 * @returns string - Text tanpa emoji/emoticon
 */
export function removeEmojis(text: string): string {
  return text.replace(EMOJI_REGEX, "").replace(TEXT_EMOTICON_REGEX, "");
}

/**
 * Validasi input untuk mencegah emoji/emoticon
 * @param text - Text yang akan divalidasi
 * @returns object dengan isValid dan message
 */
export function validateNoEmoji(text: string): {
  isValid: boolean;
  message?: string;
} {
  if (containsEmoji(text)) {
    return {
      isValid: false,
      message: "Emoticon dan emoji tidak diperbolehkan dalam form ini",
    };
  }

  return { isValid: true };
}

/**
 * Event handler untuk mencegah input emoji/emoticon
 * @param event - Keyboard event
 */
export function handleKeyPress(
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  // Cegah paste emoji melalui keyboard shortcut
  if ((event.ctrlKey || event.metaKey) && event.key === "v") {
    // Akan ditangani oleh onPaste handler
    return;
  }

  // Cegah input emoji langsung dari keyboard
  const char = event.key;
  if (containsEmoji(char)) {
    event.preventDefault();
  }
}

/**
 * Event handler untuk mencegah paste emoji/emoticon
 * @param event - Clipboard event
 * @returns string - Text yang sudah dibersihkan
 */
export function handlePaste(
  event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
): string {
  event.preventDefault();
  const pastedText = event.clipboardData.getData("text");
  const cleanedText = removeEmojis(pastedText);

  return cleanedText;
}
