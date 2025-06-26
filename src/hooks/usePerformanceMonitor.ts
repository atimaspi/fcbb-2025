
import { useEffect, useRef, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
}

interface PerformanceAlert {
  type: 'warning' | 'error';
  message: string;
  timestamp: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0
  });
  
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const frameRef = useRef<number>();
  const lastFrameTime = useRef<number>(performance.now());
  const frameCount = useRef<number>(0);
  const renderStart = useRef<number>(0);

  // FPS Monitoring
  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastFrameTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastFrameTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      
      if (fps < 30) {
        setAlerts(prev => [...prev, {
          type: 'warning',
          message: `FPS baixo: ${fps}fps`,
          timestamp: Date.now()
        }]);
      }
      
      frameCount.current = 0;
      lastFrameTime.current = now;
    }
    
    frameRef.current = requestAnimationFrame(measureFPS);
  }, []);

  // Memory Usage Monitoring
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
      
      if (usedMB > 100) {
        setAlerts(prev => [...prev, {
          type: 'error',
          message: `Uso de memória alto: ${usedMB}MB`,
          timestamp: Date.now()
        }]);
      }
    }
  }, []);

  // Render Time Monitoring
  const startRenderMeasure = useCallback(() => {
    renderStart.current = performance.now();
  }, []);

  const endRenderMeasure = useCallback(() => {
    const renderTime = performance.now() - renderStart.current;
    setMetrics(prev => ({ ...prev, renderTime }));
    
    if (renderTime > 16.67) {
      setAlerts(prev => [...prev, {
        type: 'warning',
        message: `Renderização lenta: ${renderTime.toFixed(2)}ms`,
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Initialize monitoring
  useEffect(() => {
    measureFPS();
    const memoryInterval = setInterval(measureMemory, 5000);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearInterval(memoryInterval);
    };
  }, [measureFPS, measureMemory]);

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
    startRenderMeasure,
    endRenderMeasure,
    clearAlerts: () => setAlerts([])
  };
};
