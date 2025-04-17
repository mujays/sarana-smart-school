import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateFile = (
  file: File,
  acceptFiles: string[],
  maxSize = 25
) => {
  if (!acceptFiles.includes(file.type)) {
    throw new Error("file tidak didukung");
  }
  const isValidSize = file.size / 1024 / 1024 < maxSize;
  if (!isValidSize) {
    throw new Error(`File maksimal ${maxSize}MB`);
  }
  return true;
};

export const formatFileSize = (sizeInBytes: number) => {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes < MB) {
    return `${(sizeInBytes / KB).toFixed(2)} KB`;
  } else {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  }
};
