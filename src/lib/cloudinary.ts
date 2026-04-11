const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  gravity?: 'auto' | 'face' | 'center';
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const parts: string[] = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    `g_${gravity}`,
  ];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${parts.join(',')}/${publicId}`;
}

export function getCloudinaryVideoUrl(
  publicId: string,
  options: { width?: number; quality?: number | 'auto'; format?: 'auto' | 'mp4' | 'webm' } = {}
): string {
  const { width, quality = 'auto', format = 'auto' } = options;

  const parts: string[] = [`f_${format}`, `q_${quality}`];
  if (width) parts.push(`w_${width}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${parts.join(',')}/${publicId}`;
}

export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.includes('res.cloudinary.com')) {
    const [base, path] = src.split('/upload/');
    return `${base}/upload/w_${width},q_${quality ?? 'auto'},f_auto/${path}`;
  }
  return src;
}
