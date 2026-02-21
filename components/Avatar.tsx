
import React from 'react';
import { StatusType } from '../types';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: StatusType | 'online' | 'offline' | 'away' | 'busy';
  shape?: 'circle' | 'square';
  border?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
  shape = 'circle',
  border = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusColors = {
    success: 'bg-emerald-500',
    online: 'bg-emerald-500',
    warning: 'bg-amber-500',
    away: 'bg-amber-500',
    error: 'bg-rose-500',
    busy: 'bg-rose-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400',
    offline: 'bg-slate-400',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const getInitials = (n?: string) => {
    if (!n) return '?';
    const parts = n.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n[0].toUpperCase();
  };

  const initials = getInitials(name);
  const borderRadius = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      <div className={`
        w-full h-full flex items-center justify-center overflow-hidden
        ${borderRadius}
        ${border ? 'ring-2 ring-white shadow-sm' : ''}
        ${!src ? 'bg-slate-100 text-slate-600 font-bold' : 'bg-slate-200'}
      `}>
        {src ? (
          <img 
            src={src} 
            alt={name || 'Avatar'} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      
      {status && (
        <span className={`
          absolute bottom-0 right-0 border-2 border-white
          ${borderRadius}
          ${statusColors[status as keyof typeof statusColors] || statusColors.neutral}
          ${statusSize[size]}
        `} />
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = 'md',
  className = '',
}) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex -space-x-3 ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative z-10">
          {React.cloneElement(avatar as React.ReactElement, { size, border: true })}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={`
          relative z-0 flex items-center justify-center bg-slate-100 text-slate-600 font-bold border-2 border-white shadow-sm
          ${size === 'xs' ? 'w-6 h-6 text-[8px]' : ''}
          ${size === 'sm' ? 'w-8 h-8 text-[10px]' : ''}
          ${size === 'md' ? 'w-10 h-10 text-xs' : ''}
          ${size === 'lg' ? 'w-12 h-12 text-sm' : ''}
          ${size === 'xl' ? 'w-16 h-16 text-base' : ''}
          rounded-full
        `}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Avatar;
