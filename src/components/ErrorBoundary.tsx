import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-background">
          <div className="max-w-2xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Error Icon */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
                  <AlertTriangle 
                    size={80} 
                    className="text-destructive relative z-10"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-3xl sm:text-4xl mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Oops! Something went wrong
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-muted-foreground mb-8 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                We're sorry for the inconvenience. The error has been logged and we'll look into it.
              </motion.p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details
                  className="mb-8 text-left bg-muted/50 rounded-lg p-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <summary className="cursor-pointer mb-2 font-medium">
                    Error Details (Dev Mode)
                  </summary>
                  <pre className="text-xs overflow-auto p-2 bg-background rounded">
                    <code>{this.state.error.toString()}</code>
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-xs overflow-auto p-2 bg-background rounded mt-2">
                      <code>{this.state.errorInfo.componentStack}</code>
                    </pre>
                  )}
                </motion.details>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all hover:scale-105"
                >
                  <RefreshCw size={20} />
                  Reload Page
                </button>
                
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-current/20 rounded-lg hover:bg-accent transition-all hover:scale-105"
                >
                  <Home size={20} />
                  Back to Home
                </a>
              </motion.div>

              {/* Support Link */}
              <motion.p
                className="mt-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Need help?{' '}
                <a 
                  href="mailto:info@strict-dev.com" 
                  className="text-primary hover:underline"
                >
                  Contact Support
                </a>
              </motion.p>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}