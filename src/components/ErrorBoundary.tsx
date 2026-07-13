import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
          <h1 className="text-2xl font-black text-[#f97316] mb-2">Algo correu mal</h1>
          <p className="text-sm text-[#525252] mb-6 max-w-md break-words">
            {this.state.error.message}
          </p>
          <button
            onClick={this.reset}
            className="bg-[#f97316] text-black font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-sm"
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
