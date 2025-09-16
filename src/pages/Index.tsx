import { CircuitBackground } from "@/components/CircuitBackground";

const Index = () => {
  const handleAccessPanel = () => {
    // Add your panel access logic here
    console.log("Accessing DOS Panel...");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Interactive Circuit Background */}
      <CircuitBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Glass container for better readability */}
          <div className="glass rounded-3xl p-12 backdrop-blur-xl">
            {/* Status Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  Sistema en actualización
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-hero mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Estamos realizando mejoras
            </h1>

            {/* Description */}
            <p className="text-body text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
              Disculpa las molestias. Estamos trabajando para mejorar tu experiencia 
              y volveremos en breve con nuevas funcionalidades.
            </p>

            {/* Action Button */}
            <div className="space-y-4">
              <button
                onClick={handleAccessPanel}
                className="btn-primary inline-flex items-center space-x-3 group"
              >
                <span>Acceder a Panel DOS</span>
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>
              
              {/* Secondary action */}
              <div className="mt-6">
                <button className="btn-ghost">
                  Notificarme cuando esté listo
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Tiempo estimado: <span className="text-foreground font-medium">2-4 horas</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle grid overlay for depth */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
};

export default Index;
