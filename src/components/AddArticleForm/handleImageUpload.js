import { toast } from 'react-toastify';
import { fileToBase64 } from './fileToBase64';

export const handleImageUpload = async (event, maxSizeMB = 2) => {
  const file = event?.target?.files?.[0];

  if (!file) return { error: 'No file selected' };

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    toast.warning(`File is too large. Max size is ${maxSizeMB}MB.`);
    return { error: 'File too large' };
  }

  try {
    const base64 = await fileToBase64(file);
    return { file, base64 };
  } catch {
    toast.error('Failed to process image.');
    return { error: 'Base64 conversion failed' };
  }
};
