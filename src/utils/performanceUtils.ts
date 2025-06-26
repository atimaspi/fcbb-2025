
import { PerformanceAlert } from '@/types/performance';

export const createAlert = (type: 'warning' | 'error', message: string): PerformanceAlert => ({
  type,
  message,
  timestamp: Date.now()
});

export const getMemoryUsage = (): number => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return Math.round(memory.usedJSHeapSize / 1048576);
  }
  return 0;
};

export const shouldShowFPSAlert = (fps: number): boolean => fps < 30;
export const shouldShowMemoryAlert = (memoryUsage: number): boolean => memoryUsage > 100;
export const shouldShowRenderAlert = (renderTime: number): boolean => renderTime > 16.67;

export const getOptimizationSuggestions = (fps: number, memoryUsage: number, renderTime: number): string[] => {
  const suggestions: string[] = [];
  
  if (fps < 30) {
    suggestions.push('Considere reduzir animações complexas');
  }
  
  if (memoryUsage > 50) {
    suggestions.push('Otimize o uso de memória');
  }
  
  if (renderTime > 16) {
    suggestions.push('Simplifique componentes pesados');
  }
  
  return suggestions;
};
