import { useState } from 'react';

export const useImageUpload = <T extends { image?: File | string | null }>(initialData: T) => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<T>(initialData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setData({
      ...data,
      image: file,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setData({
      ...data,
      image: file,
    });
    setDragging(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const clearImage = () => {
    setImagePreview('');
    setData({ ...data, image: undefined });
  };

  return {
    data,
    setData,
    imagePreview,
    dragging,
    handleFileChange,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    clearImage,
  };
};
