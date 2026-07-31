import { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CampusOS ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6">
          <Card glass className="max-w-md w-full border-rose-500/30 bg-[#18181B]">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Something went wrong
                </h3>
                <p className="text-xs text-zinc-400">
                  CampusOS encountered an unexpected error. Please reload the page.
                </p>
              </div>

              {this.state.error && (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 text-left">
                  <p className="font-mono text-[11px] text-rose-300 truncate">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <Button
                variant="default"
                onClick={this.handleReload}
                className="w-full text-xs font-semibold"
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" /> Reload Application
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
