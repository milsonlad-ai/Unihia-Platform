import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Smartphone, Globe, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const AuditPanel: React.FC = () => {
  const { auditLogs } = useSecurity();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-unihia-accent" />
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">Painel de Auditoria</h3>
        </div>
        <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">
          {auditLogs.length} Eventos
        </span>
      </div>

      <div className="space-y-3">
        {auditLogs.length > 0 ? auditLogs.map((log) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] px-2 py-0.5 rounded-full border font-black uppercase tracking-widest ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                  <span className="text-white font-bold text-xs">{log.event}</span>
                </div>
                <p className="text-zinc-500 text-[10px] leading-relaxed">{log.details}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-700 text-[8px] font-black uppercase tracking-widest">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-zinc-800 text-[8px] font-medium">
                  {new Date(log.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-white/[0.03]">
              <div className="flex items-center gap-1.5">
                <Smartphone size={10} className="text-zinc-600" />
                <span className="text-[8px] text-zinc-500 font-medium truncate max-w-[80px]">{log.device}</span>
              </div>
              {log.ip && (
                <div className="flex items-center gap-1.5">
                  <Globe size={10} className="text-zinc-600" />
                  <span className="text-[8px] text-zinc-500 font-medium">{log.ip}</span>
                </div>
              )}
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-12 space-y-3 opacity-30">
            <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
            <p className="text-[10px] uppercase font-black tracking-widest">Nenhum incidente detectado</p>
          </div>
        )}
      </div>
    </div>
  );
};
