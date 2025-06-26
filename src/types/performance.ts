
export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
}

export interface PerformanceAlert {
  type: 'warning' | 'error';
  message: string;
  timestamp: number;
}
