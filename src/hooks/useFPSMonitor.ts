
import { useCallback, useRef } from 'react';
import { PerformanceAlert } from '@/types/performance';
import { createAlert, shouldShowFPSAlert } from '@/utils/performanceUtils';

export const useFPSMonitor = (
  setMetrics: React.Dispatch<React.SetStateAction<{ fps: number; memoryUsage: number; renderTime: number }>>,
  setAlerts: React.Dispatch<React.SetStateAction<PerformanceAlert[]>>
) => {
  const frameRef = useRef<number>();
  const lastFrameTime = useRef<number>(performance.now());
  const frameCount = useRef<number>(0);

  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastFrameTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastFrameTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      
      if (shouldShowFPSAlert(fps)) {
        setAlerts(prev => [...prev, createAlert('warning', `FPS baixo: ${fps}fps`)]);
      }
      
      frameCount.current = 0;
      lastFrameTime.current = now;
    }
    
    frameRef.current = requestAnimationFrame(measureFPS);
  }, [setMetrics, setAlerts]);

  const cleanup = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, []);

  return { measureFPS, cleanup };
};
