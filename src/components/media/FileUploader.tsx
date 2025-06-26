
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Upload, X, File, Image } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: any) => void;
  entityType?: string;
  entityId?: string;
  allowedTypes?: string[];
  maxFiles?: number;
}

const FileUploader = ({ 
  onFileUpload, 
  entityType, 
  entityId, 
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles = 10
}: FileUploaderProps) => {
  const { uploadFile, uploading, progress } = useFileUpload({
    allowedTypes,
    maxSize: 50 * 1024 * 1024
  });
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files].slice(0, maxFiles));
  };

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      try {
        const path = entityType && entityId ? `${entityType}/${entityId}` : entityType;
        const result = await uploadFile(file, path);
        if (result && onFileUpload) {
          onFileUpload(result);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    setSelectedFiles([]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <input
            type="file"
            multiple
            accept={allowedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cv-blue hover:bg-blue-700"
          >
            Selecionar Arquivos
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                {file.type.startsWith('image/') ? (
                  <Image className="h-4 w-4" />
                ) : (
                  <File className="h-4 w-4" />
                )}
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? `Enviando... ${progress}%` : 'Enviar Arquivos'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
