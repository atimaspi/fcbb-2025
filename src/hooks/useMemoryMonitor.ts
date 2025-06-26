
import { useCallback } from 'react';
import { PerformanceAlert } from '@/types/performance';
import { createAlert, getMemoryUsage, shouldShowMemoryAlert } from '@/utils/performanceUtils';

export const useMemoryMonitor = (
  setMetrics: React.Dispatch<React.SetStateAction<{ fps: number; memoryUsage: number; renderTime: number }>>,
  setAlerts: React.Dispatch<React.SetStateAction<PerformanceAlert[]>>
) => {
  const measureMemory = useCallback(() => {
    const usedMB = getMemoryUsage();
    setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
    
    if (shouldShowMemoryAlert(usedMB)) {
      setAlerts(prev => [...prev, createAlert('error', `Uso de memória alto: ${usedMB}MB`)]);
    }
  }, [setMetrics, setAlerts]);

  return { measureMemory };
};
