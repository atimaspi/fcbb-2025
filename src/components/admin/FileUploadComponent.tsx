
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Upload, File, Image, Video, X, CheckCircle } from 'lucide-react';

interface FileUploadComponentProps {
  entityType?: string;
  entityId?: string;
  onUploadComplete?: (file: any) => void;
  allowedTypes?: string[];
  maxSize?: number;
}

const FileUploadComponent = ({ 
  entityType, 
  entityId, 
  onUploadComplete,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4'],
  maxSize = 50 * 1024 * 1024 // 50MB
}: FileUploadComponentProps) => {
  const { uploadFile, uploading, progress } = useFileUpload({ 
    allowedTypes, 
    maxSize 
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    alt_text: '',
    description: '',
    is_featured: false
  });
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadComplete(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadComplete(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadFile(selectedFile, entityType, entityId, metadata);
      
      if (result) {
        setUploadComplete(true);
        if (onUploadComplete) {
          onUploadComplete(result);
        }
        
        // Reset after 3 seconds
        setTimeout(() => {
          setSelectedFile(null);
          setUploadComplete(false);
          setMetadata({ alt_text: '', description: '', is_featured: false });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (file.type.startsWith('video/')) return <Video className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  const isImage = selectedFile?.type.startsWith('image/');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload de Arquivo
        </CardTitle>
        <CardDescription>
          Envie imagens, vídeos ou documentos. Tamanho máximo: {formatFileSize(maxSize)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        {!selectedFile && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cv-blue transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Clique para selecionar ou arraste um arquivo
            </p>
            <p className="text-sm text-gray-500">
              Tipos suportados: {allowedTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={allowedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Selected File */}
        {selectedFile && !uploadComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile)}
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Preview for images */}
            {isImage && (
              <div className="aspect-video max-w-sm mx-auto">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* Metadata */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="alt_text">Texto Alternativo</Label>
                <Input
                  id="alt_text"
                  value={metadata.alt_text}
                  onChange={(e) => setMetadata({ ...metadata, alt_text: e.target.value })}
                  placeholder="Descrição breve para acessibilidade"
                  disabled={uploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Descrição detalhada do arquivo"
                  disabled={uploading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={metadata.is_featured}
                  onChange={(e) => setMetadata({ ...metadata, is_featured: e.target.checked })}
                  disabled={uploading}
                />
                <Label htmlFor="is_featured">Marcar como destaque</Label>
              </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>A enviar...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-cv-blue hover:bg-cv-blue/90"
            >
              {uploading ? 'A enviar...' : 'Enviar Arquivo'}
            </Button>
          </div>
        )}

        {/* Upload Complete */}
        {uploadComplete && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Upload Concluído!
            </h3>
            <p className="text-gray-600">
              O arquivo foi enviado com sucesso.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadComponent;
