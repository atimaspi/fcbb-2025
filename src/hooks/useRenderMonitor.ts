
import { useCallback, useRef } from 'react';
import { PerformanceAlert } from '@/types/performance';
import { createAlert, shouldShowRenderAlert } from '@/utils/performanceUtils';

export const useRenderMonitor = (
  setMetrics: React.Dispatch<React.SetStateAction<{ fps: number; memoryUsage: number; renderTime: number }>>,
  setAlerts: React.Dispatch<React.SetStateAction<PerformanceAlert[]>>
) => {
  const renderStart = useRef<number>(0);

  const startRenderMeasure = useCallback(() => {
    renderStart.current = performance.now();
  }, []);

  const endRenderMeasure = useCallback(() => {
    const renderTime = performance.now() - renderStart.current;
    setMetrics(prev => ({ ...prev, renderTime }));
    
    if (shouldShowRenderAlert(renderTime)) {
      setAlerts(prev => [...prev, createAlert('warning', `Renderização lenta: ${renderTime.toFixed(2)}ms`)]);
    }
  }, [setMetrics, setAlerts]);

  return { startRenderMeasure, endRenderMeasure };
};
