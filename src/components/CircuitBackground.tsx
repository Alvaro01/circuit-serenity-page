import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulsePhase: number;
  connections: number[];
}

export const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);
    const newNodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      };

      // Create connections to nearby nodes
      for (let j = 0; j < newNodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(node.x - newNodes[j].x, 2) + 
          Math.pow(node.y - newNodes[j].y, 2)
        );
        
        if (distance < 150 && Math.random() > 0.7) {
          node.connections.push(j);
          newNodes[j].connections.push(i);
        }
      }

      newNodes.push(node);
    }

    setNodes(newNodes);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.fillStyle = "hsl(8, 8%, 7%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      newNodes.forEach((node, index) => {
        // Update position with subtle movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse phase
        node.pulsePhase += 0.02;

        // Calculate distance to mouse
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mouseRef.current.x, 2) + 
          Math.pow(node.y - mouseRef.current.y, 2)
        );

        // Draw connections
        node.connections.forEach(connectionIndex => {
          if (connectionIndex < newNodes.length) {
            const connected = newNodes[connectionIndex];
            const pulse = (Math.sin(node.pulsePhase) + 1) / 2;
            const mouseEffect = Math.max(0, 1 - mouseDistance / 200);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connected.x, connected.y);
            
            // Base circuit color with mouse interaction
            const alpha = 0.3 + pulse * 0.3 + mouseEffect * 0.4;
            const hue = mouseEffect > 0.1 ? 212 : 0; // Blue when near mouse
            const saturation = mouseEffect > 0.1 ? 100 : 0;
            const lightness = 25 + mouseEffect * 25;
            
            ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
            ctx.lineWidth = 1 + mouseEffect * 2;
            ctx.stroke();
          }
        });

        // Draw node
        const pulse = (Math.sin(node.pulsePhase) + 1) / 2;
        const mouseEffect = Math.max(0, 1 - mouseDistance / 100);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + mouseEffect * 3, 0, Math.PI * 2);
        
        const nodeAlpha = 0.4 + pulse * 0.4 + mouseEffect * 0.6;
        const nodeHue = mouseEffect > 0.1 ? 151 : 212; // Green when very close to mouse
        const nodeSaturation = mouseEffect > 0.1 ? 64 : 100;
        const nodeLightness = 47 + mouseEffect * 25;
        
        ctx.fillStyle = `hsla(${nodeHue}, ${nodeSaturation}%, ${nodeLightness}%, ${nodeAlpha})`;
        ctx.fill();
        
        // Add glow effect for nodes near mouse
        if (mouseEffect > 0.2) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsl(${nodeHue}, ${nodeSaturation}%, ${nodeLightness}%)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};
