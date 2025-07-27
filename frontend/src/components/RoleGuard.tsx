import React from 'react';
import { loadAuth } from '../auth';

export function RoleGuard({ role, children }: { role: string, children: React.ReactNode }) {
  const { user } = loadAuth();
  if (!user || !user.roles.includes(role)) {
    return <div>Access denied</div>;
  }
  return <>{children}</>;
}