/**
 * Utility functions untuk formatting nomor telepon Indonesia
 */

/**
 * Memformat nomor telepon untuk input (menampilkan format 8xxx tanpa +62)
 * @param phoneNumber - Nomor telepon input
 * @returns Formatted phone number untuk display
 */
export function formatPhoneForInput(phoneNumber: string): string {
  // Hapus semua karakter non-digit
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Jika dimulai dengan +62, hapus dan ganti dengan 0
  if (digitsOnly.startsWith("62")) {
    return "0" + digitsOnly.substring(2);
  }

  // Jika dimulai dengan 62, hapus dan ganti dengan 0
  if (digitsOnly.startsWith("62") && digitsOnly.length > 2) {
    return "0" + digitsOnly.substring(2);
  }

  return digitsOnly;
}

/**
 * Memformat nomor telepon untuk payload API (+628xxx)
 * @param phoneNumber - Nomor telepon dari form (08xxx atau 8xxx)
 * @returns Formatted phone number dengan +62 prefix
 */
export function formatPhoneForPayload(phoneNumber: string): string {
  // Hapus semua karakter non-digit
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Jika kosong, return kosong
  if (!digitsOnly) {
    return "";
  }

  // Jika dimulai dengan 0, ganti dengan +62
  if (digitsOnly.startsWith("0")) {
    return "+62" + digitsOnly.substring(1);
  }

  // Jika dimulai dengan 8, tambahkan +62
  if (digitsOnly.startsWith("8")) {
    return "+62" + digitsOnly;
  }

  // Jika sudah dimulai dengan 62, tambahkan +
  if (digitsOnly.startsWith("62")) {
    return "+" + digitsOnly;
  }

  // Default: anggap sudah benar atau tambahkan +62
  return "+62" + digitsOnly;
}

/**
 * Memformat nomor telepon dari PhoneInput component (+62 prefix sudah ada di UI)
 * @param phoneNumber - Nomor telepon dari PhoneInput (8xxx tanpa prefix)
 * @returns Formatted phone number dengan +62 prefix untuk payload
 */
export function formatPhoneFromPhoneInput(phoneNumber: string): string {
  // Hapus semua karakter non-digit
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Jika kosong, return kosong
  if (!digitsOnly) {
    return "";
  }

  // Langsung tambahkan +62 karena PhoneInput sudah handle format
  return "+62" + digitsOnly;
}

/**
 * Validasi nomor telepon Indonesia
 * @param phoneNumber - Nomor telepon yang akan divalidasi
 * @returns Object dengan isValid dan message
 */
export function validateIndonesianPhone(phoneNumber: string): {
  isValid: boolean;
  message?: string;
} {
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Cek panjang minimal (biasanya 10-13 digit)
  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      message: "Nomor telepon minimal 10 digit",
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      message: "Nomor telepon maksimal 15 digit",
    };
  }

  // Cek apakah dimulai dengan format yang valid (08xxx atau 8xxx)
  if (!digitsOnly.startsWith("08") && !digitsOnly.startsWith("8")) {
    return {
      isValid: false,
      message: "Nomor telepon harus dimulai dengan 08 atau 8",
    };
  }

  return { isValid: true };
}

/**
 * Validasi nomor telepon Indonesia untuk PhoneInput component
 * @param phoneNumber - Nomor telepon dari PhoneInput (8xxx tanpa +62)
 * @returns Object dengan isValid dan message
 */
export function validatePhoneInput(phoneNumber: string): {
  isValid: boolean;
  message?: string;
} {
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Jika kosong, return valid (untuk optional fields)
  if (!digitsOnly) {
    return { isValid: true };
  }

  // Cek panjang minimal (9-13 digit setelah +62)
  if (digitsOnly.length < 9) {
    return {
      isValid: false,
      message: "Nomor telepon minimal 9 digit",
    };
  }

  if (digitsOnly.length > 13) {
    return {
      isValid: false,
      message: "Nomor telepon maksimal 13 digit",
    };
  }

  // Untuk PhoneInput: harus dimulai dengan 8 (karena +62 sudah ada di UI)
  if (!digitsOnly.startsWith("8")) {
    return {
      isValid: false,
      message: "Nomor telepon harus dimulai dengan angka 8",
    };
  }

  return { isValid: true };
}

/**
 * Custom Zod validator untuk nomor telepon Indonesia
 */
export const indonesianPhoneValidator =
  (message = "Format nomor telepon tidak valid") =>
  (phoneNumber: string) => {
    const validation = validateIndonesianPhone(phoneNumber);
    return validation.isValid;
  };
