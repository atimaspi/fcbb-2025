
import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface PermissionGuardProps {
  permission: { resource: string; action: string };
  children: React.ReactNode;
  showError?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  showError = true 
}) => {
  const { hasPermission, loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#002D72]"></div>
      </div>
    );
  }

  if (!hasPermission(permission)) {
    if (!showError) {
      return null;
    }
    
    return (
      <Alert className="border-red-200 bg-red-50">
        <Shield className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-700">
          Não tem permissões para aceder a esta funcionalidade.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default PermissionGuard;
