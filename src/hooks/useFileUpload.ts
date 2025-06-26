
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FileUploadOptions {
  allowedTypes: string[];
  maxSize: number;
}

export const useFileUpload = ({ allowedTypes, maxSize }: FileUploadOptions) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (
    file: File, 
    entityType?: string, 
    entityId?: string, 
    metadata?: { alt_text?: string; description?: string; is_featured?: boolean }
  ) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erro",
        description: "Tipo de arquivo não permitido",
        variant: "destructive"
      });
      return null;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast({
        title: "Erro",
        description: "Arquivo muito grande",
        variant: "destructive"
      });
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const filePath = `uploads/${filename}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setProgress(50);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setProgress(75);

      // Save file metadata to database
      const fileRecord = {
        filename,
        original_filename: file.name,
        file_path: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type,
        entity_type: entityType,
        entity_id: entityId,
        alt_text: metadata?.alt_text,
        description: metadata?.description,
        is_featured: metadata?.is_featured || false,
        category: 'upload'
      };

      const { data: dbData, error: dbError } = await supabase
        .from('media_files')
        .insert([fileRecord])
        .select()
        .single();

      if (dbError) throw dbError;

      setProgress(100);

      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso!"
      });

      return dbData;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Erro",
        description: `Erro no upload: ${error.message}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    uploadFile,
    uploading,
    progress
  };
};
