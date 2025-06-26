
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  bucket?: string;
}

export interface UploadedFile {
  url: string;
  path: string;
  name: string;
  size: number;
  type: string;
}

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/*', 'application/pdf', 'video/*'],
    bucket = 'gallery'
  } = options;

  const uploadFile = async (file: File, path?: string): Promise<UploadedFile | null> => {
    try {
      setUploading(true);
      setProgress(0);

      // Validate file size
      if (file.size > maxSize) {
        toast({
          title: 'Arquivo muito grande',
          description: `O arquivo deve ter no máximo ${(maxSize / 1024 / 1024).toFixed(1)}MB`,
          variant: 'destructive'
        });
        return null;
      }

      // Validate file type
      const isValidType = allowedTypes.some(type => {
        if (type.endsWith('/*')) {
          const category = type.replace('/*', '');
          return file.type.startsWith(category);
        }
        return file.type === type;
      });

      if (!isValidType) {
        toast({
          title: 'Tipo de arquivo não permitido',
          description: `Tipos permitidos: ${allowedTypes.join(', ')}`,
          variant: 'destructive'
        });
        return null;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = path ? `${path}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      setProgress(100);

      const uploadedFile: UploadedFile = {
        url: urlData.publicUrl,
        path: data.path,
        name: file.name,
        size: file.size,
        type: file.type
      };

      toast({
        title: 'Upload concluído',
        description: 'Arquivo enviado com sucesso!'
      });

      return uploadedFile;

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Erro no upload',
        description: error.message || 'Erro ao enviar arquivo',
        variant: 'destructive'
      });
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadMultipleFiles = async (files: File[], path?: string): Promise<UploadedFile[]> => {
    const results = await Promise.all(
      files.map(file => uploadFile(file, path))
    );
    
    return results.filter((result): result is UploadedFile => result !== null);
  };

  const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Arquivo excluído',
        description: 'Arquivo removido com sucesso!'
      });

      return true;
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Erro ao excluir',
        description: error.message || 'Erro ao remover arquivo',
        variant: 'destructive'
      });
      return false;
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    progress
  };
};
