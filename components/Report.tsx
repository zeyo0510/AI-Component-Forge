
import React from 'react';
import Text from './Text';
import Status from './Status';
import Table from './Table';
import Button from './Button';

interface ReportProps {
  title: string;
  subtitle?: string;
  data: any[];
  metrics: { label: string; value: string; trend?: 'up' | 'down'; status: any }[];
}

const Report: React.FC<ReportProps> = ({ title, subtitle, data, metrics }) => {
  return (
    <div className="bg-white border border-slate-200 shadow-2xl rounded-sm p-8 max-w-4xl mx-auto my-4 font-serif min-h-[800px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
        <div>
          <Text variant="caption" className="text-indigo-600 mb-1">Confidential Internal Document</Text>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{title}</h1>
          <p className="text-slate-500 font-sans text-sm mt-1">{subtitle}</p>
        </div>
        <div className="text-right font-sans">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report Ref</div>
          <div className="text-sm font-bold text-slate-800">#CF-2025-0892</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Date Issued</div>
          <div className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-sans">
        {metrics.map((m, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">{m.value}</span>
              {m.trend && (
                <span className={`text-[10px] font-bold ${m.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {m.trend === 'up' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div className="mt-2">
              <Status type={m.status} label={m.status.toUpperCase()} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 font-sans">
        <Text variant="h4" className="mb-4 border-l-4 border-indigo-600 pl-3">Executive Summary</Text>
        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          This comprehensive analysis outlines the quarterly performance metrics across all integrated systems. 
          The data suggests a significant optimization in processing latency following the deployment of the 
          Gemini 3 models. Security protocols remain within the green-zone threshold, and resource allocation 
          has been re-balanced to favor high-priority inference tasks.
        </p>

        <Text variant="h4" className="mb-4 border-l-4 border-indigo-600 pl-3">Data Breakdown</Text>
        <Table 
          headers={['ID', 'Service', 'Uptime', 'Load']} 
          data={data}
        />
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center font-sans">
        <div className="flex gap-4">
          <Button size="sm" variant="outline">Print to PDF</Button>
          <Button size="sm">Export CSV</Button>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Component Forge Automation © 2025
        </div>
      </div>
    </div>
  );
};

export default Report;
