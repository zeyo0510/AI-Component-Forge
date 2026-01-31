
import React from 'react';
import Card from './Card';
import Text from './Text';
import Status from './Status';

interface DashboardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardContainer: React.FC<DashboardProps> = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
    {children}
  </div>
);

interface DashboardMetricProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({ label, value, trend, icon, status = 'info' }) => {
  const statusColors = {
    success: 'text-emerald-500 bg-emerald-50',
    warning: 'text-amber-500 bg-amber-50',
    error: 'text-rose-500 bg-rose-50',
    info: 'text-indigo-500 bg-indigo-50',
  };

  return (
    <Card padding="sm" hoverable className="border-none shadow-sm ring-1 ring-slate-100">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-xl ${statusColors[status]}`}>
          {icon || <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${trend.isUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <Text variant="caption" className="text-slate-400 font-bold mb-1 block">{label}</Text>
        <div className="flex items-baseline gap-2">
          <Text variant="h2" className="text-2xl font-black text-slate-800">{value}</Text>
        </div>
      </div>
    </Card>
  );
};

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, subtitle, children, headerAction, className = '', span = 1 }) => {
  const spanClasses = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
  };

  return (
    <Card 
      title={title} 
      subtitle={subtitle} 
      headerAction={headerAction}
      className={`${spanClasses[span]} ${className}`}
    >
      {children}
    </Card>
  );
};

// Exporting as a composite component
export const Dashboard = {
  Container: DashboardContainer,
  Metric: DashboardMetric,
  Widget: DashboardWidget,
};

export default Dashboard;
