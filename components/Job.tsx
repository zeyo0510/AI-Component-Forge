
import React from 'react';
import Text from './Text';
import Status from './Status';
import ProgressBar from './ProgressBar';
import Button from './Button';

interface JobProps {
  job: import('../types').JobState;
}

const Job: React.FC<JobProps> = ({ job }) => {
  const statusConfig = {
    running: { type: 'info' as const, icon: '⚡' },
    queued: { type: 'warning' as const, icon: '⏳' },
    completed: { type: 'success' as const, icon: '✓' },
    failed: { type: 'error' as const, icon: '✕' },
  };

  const { type, icon } = statusConfig[job.status];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        job.status === 'running' ? 'bg-indigo-500' :
        job.status === 'completed' ? 'bg-emerald-500' :
        job.status === 'failed' ? 'bg-rose-500' : 'bg-amber-500'
      }`} />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">
            {icon}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{job.name}</h4>
            <Text variant="small" className="text-[10px] font-mono opacity-60 uppercase">{job.id}</Text>
          </div>
        </div>
        <Status type={type} label={job.status.toUpperCase()} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Processing Duration</span>
          <span className="text-slate-700">{job.runtime}</span>
        </div>
        
        <ProgressBar progress={job.progress} variant={type === 'info' ? 'default' : type} />

        {/* Mini Log Console */}
        <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] h-24 overflow-y-auto custom-scrollbar space-y-1">
          {job.logs.map((log, i) => (
            <div key={i} className="text-slate-400 flex gap-2">
              <span className="text-slate-600">[{i+1}]</span>
              <span className={log.includes('ERROR') ? 'text-rose-400' : log.includes('SUCCESS') ? 'text-emerald-400' : ''}>
                {log}
              </span>
            </div>
          ))}
          {job.status === 'running' && (
            <div className="animate-pulse text-indigo-400">_ waiting for new stream packets...</div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {job.status === 'running' ? (
            <Button size="sm" variant="danger" className="flex-1 py-1">Kill Job</Button>
          ) : (
            <Button size="sm" variant="outline" className="flex-1 py-1">Restart</Button>
          )}
          <Button size="sm" variant="ghost" className="px-3">Logs</Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
