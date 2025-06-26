
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Eye } from 'lucide-react';

interface MediaGalleryProps {
  files: any[];
  onFileRemove?: (fileId: string) => void;
  editable?: boolean;
}

const MediaGallery = ({ files, onFileRemove, editable = false }: MediaGalleryProps) => {
  const handleDownload = (file: any) => {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = (file: any) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  const handleRemove = (file: any) => {
    if (onFileRemove && file.id) {
      onFileRemove(file.id);
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum arquivo encontrado
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <div key={file.id || index} className="relative group">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {file.type?.startsWith('image/') || file.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={file.url}
                alt={file.name || file.alt_text || 'Imagem'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="text-xs text-gray-600 px-2">
                    {file.name || 'Documento'}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleView(file)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleDownload(file)}
              className="h-8 w-8 p-0"
            >
              <Download className="h-4 w-4" />
            </Button>
            {editable && onFileRemove && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleRemove(file)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* File info */}
          {file.description && (
            <div className="mt-2 text-xs text-gray-600 text-center">
              {file.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;
