
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Permission {
  resource: string;
  action: string;
}

export const usePermissions = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setUserRole(null);
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        setUserRole(profile?.role || null);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!userRole) return false;
    
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    // Editor permissions
    if (userRole === 'editor') {
      const editorPermissions = [
        'news:create', 'news:edit', 'news:delete',
        'events:create', 'events:edit', 'events:delete',
        'dashboard:view'
      ];
      
      const permissionKey = `${permission.resource}:${permission.action}`;
      return editorPermissions.includes(permissionKey);
    }
    
    // User permissions (very limited)
    if (userRole === 'user') {
      return permission.resource === 'profile' && permission.action === 'view';
    }
    
    return false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const canAccessAdminArea = (): boolean => {
    return ['admin', 'editor'].includes(userRole || '');
  };

  const canManageUsers = (): boolean => {
    return userRole === 'admin';
  };

  const canPublishContent = (): boolean => {
    return ['admin', 'editor'].includes(userRole || '');
  };

  return {
    userRole,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canPublishContent
  };
};
