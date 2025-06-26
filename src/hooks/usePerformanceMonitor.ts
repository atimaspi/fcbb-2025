
import { useEffect, useState, useCallback } from 'react';
import { PerformanceMetrics, PerformanceAlert } from '@/types/performance';
import { getOptimizationSuggestions } from '@/utils/performanceUtils';
import { useFPSMonitor } from '@/hooks/useFPSMonitor';
import { useMemoryMonitor } from '@/hooks/useMemoryMonitor';
import { useRenderMonitor } from '@/hooks/useRenderMonitor';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0
  });
  
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);

  const { measureFPS, cleanup: cleanupFPS } = useFPSMonitor(setMetrics, setAlerts);
  const { measureMemory } = useMemoryMonitor(setMetrics, setAlerts);
  const { startRenderMeasure, endRenderMeasure } = useRenderMonitor(setMetrics, setAlerts);

  const getOptimizationSuggestionsCallback = useCallback(() => {
    return getOptimizationSuggestions(metrics.fps, metrics.memoryUsage, metrics.renderTime);
  }, [metrics]);

  // Initialize monitoring
  useEffect(() => {
    measureFPS();
    const memoryInterval = setInterval(measureMemory, 5000);
    
    return () => {
      cleanupFPS();
      clearInterval(memoryInterval);
    };
  }, [measureFPS, measureMemory, cleanupFPS]);

  // Clear old alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => prev.filter(alert => 
        Date.now() - alert.timestamp < 30000
      ));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    alerts,
    getOptimizationSuggestions: getOptimizationSuggestionsCallback,
    startRenderMeasure,
    endRenderMeasure,
    clearAlerts: () => setAlerts([])
  };
};
