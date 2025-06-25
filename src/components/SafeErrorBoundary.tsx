
import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
}

class SafeErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    console.error('SafeErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log detailed error information
    console.error('SafeErrorBoundary detailed error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount
    });

    // Try to identify DOM manipulation errors
    if (error.message.includes("Cannot read properties of undefined (reading 'add')")) {
      console.error('DOM classList error detected - likely caused by accessing classList on null/undefined element');
    }
  }

  handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    
    if (newRetryCount <= this.maxRetries) {
      console.log(`Retrying... attempt ${newRetryCount}/${this.maxRetries}`);
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        retryCount: newRetryCount
      });
    } else {
      console.log('Max retries reached, showing permanent error state');
    }
  };

  handleGoHome = () => {
    // Clear any cached data that might be causing issues
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
    } catch (e) {
      console.warn('Error clearing storage:', e);
    }
    
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.retryCount < this.maxRetries;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Erro na Aplicação - Sistema de Recuperação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erro Detectado</AlertTitle>
                <AlertDescription>
                  A aplicação encontrou um erro inesperado. 
                  {canRetry && ' O sistema tentará recuperar automaticamente.'}
                  {!canRetry && ' Limite de tentativas excedido.'}
                </AlertDescription>
              </Alert>

              {this.state.retryCount > 0 && (
                <div className="text-sm text-gray-600">
                  Tentativa {this.state.retryCount} de {this.maxRetries}
                </div>
              )}
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-32">
                  <div className="font-bold text-red-600">Erro Técnico:</div>
                  <div>{this.state.error.message}</div>
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold text-red-600 mt-2">Stack:</div>
                      <pre className="whitespace-pre-wrap text-xs">
                        {this.state.errorInfo.componentStack.substring(0, 500)}...
                      </pre>
                    </>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                {canRetry && (
                  <Button 
                    onClick={this.handleRetry} 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Tentar Novamente ({this.maxRetries - this.state.retryCount})
                  </Button>
                )}
                <Button 
                  onClick={this.handleGoHome} 
                  className="flex items-center gap-2"
                  variant={canRetry ? "secondary" : "default"}
                >
                  <Home className="h-4 w-4" />
                  Recarregar Aplicação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SafeErrorBoundary;
