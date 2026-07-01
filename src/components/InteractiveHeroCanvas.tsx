/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  color: string;
  intensity: number;
}

interface InteractiveHeroCanvasProps {
  simulationMode: 'ai' | 'creative' | 'pulse';
}

export default function InteractiveHeroCanvas({ simulationMode }: InteractiveHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Node Labels based on company positioning
  const nodeLabels = [
    { label: 'AI Agent', color: '#3b82f6' },
    { label: '算法研发', color: '#60a5fa' },
    { label: '云原生外包', color: '#2563eb' },
    { label: '数字内容制作', color: '#f43f5e' },
    { label: '数据仓库', color: '#10b981' },
    { label: '网络安全', color: '#f59e0b' },
    { label: 'IT战略咨询', color: '#8b5cf6' },
    { label: '交互设计', color: '#ec4899' },
    { label: '创与惟科技', color: '#38bdf8' },
  ];

  // Handles responsive canvas resizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      // Debounce slightly or run directly
      setDimensions({
        width: Math.max(width, 300),
        height: Math.max(height, 400),
      });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes
    const nodes: Node[] = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
      const predefined = nodeLabels[i % nodeLabels.length];
      const isCore = predefined.label === '创与惟科技';
      
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseX: x,
        baseY: y,
        radius: isCore ? 6 : Math.random() * 2 + 2,
        label: i < nodeLabels.length ? predefined.label : '',
        color: predefined.color,
        intensity: isCore ? 1.0 : Math.random() * 0.5 + 0.3,
      });
    }

    let animationFrameId: number;
    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      pulseTime += 0.015;

      // Draw background space grids or ambient glow
      ctx.fillStyle = 'rgba(3, 3, 2, 0.02)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Mouse interactive physics parameters
      const mouse = mouseRef.current;
      const forceRadius = 150;

      // Update Node positions & physics
      nodes.forEach((node) => {
        // Mode specific behaviors
        if (simulationMode === 'ai') {
          // AI Neural Flow: more focused, gravitating toward center with tiny orbit
          const centerX = dimensions.width / 2;
          const centerY = dimensions.height / 2;
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            node.vx += (dx / dist) * 0.01;
            node.vy += (dy / dist) * 0.01;
          }
          // Friction
          node.vx *= 0.98;
          node.vy *= 0.98;
        } else if (simulationMode === 'creative') {
          // Creative Cluster: sinusoidal waves, dynamic float
          node.vx += Math.sin(pulseTime + node.x * 0.01) * 0.005;
          node.vy += Math.cos(pulseTime + node.y * 0.01) * 0.005;
          node.vx *= 0.99;
          node.vy *= 0.99;
        } else {
          // Standard System Pulse: slow regular drift
          node.vx *= 0.995;
          node.vy *= 0.995;
        }

        // Apply velocities
        node.x += node.vx;
        node.y += node.vy;

        // Boundary constraints
        if (node.x < 10 || node.x > dimensions.width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > dimensions.height - 10) node.vy *= -1;

        // Mouse gravity pull or push
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            // Pull in standard and AI, push in Creative
            const multiplier = simulationMode === 'creative' ? -0.5 : 0.8;
            node.vx += (dx / dist) * force * multiplier * 0.15;
            node.vy += (dy / dist) * force * multiplier * 0.15;
          }
        }

        // Draw connections
        nodes.forEach((otherNode) => {
          if (node === otherNode) return;
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection range
          const maxDist = 120;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12 * (node.intensity + otherNode.intensity) / 2;
            
            // Draw neat clean lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();

            // Draw glowing data pulse along the connection in AI Mode
            if (simulationMode === 'ai' && Math.random() < 0.002) {
              const pulsePos = (Math.sin(pulseTime * 2 + dist) + 1) / 2;
              const px = node.x + dx * pulsePos;
              const py = node.y + dy * pulsePos;
              ctx.fillStyle = node.color;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

        // Draw individual nodes
        const finalRadius = node.radius + (simulationMode === 'pulse' ? Math.sin(pulseTime * 3 + node.x) * 1 : 0);
        
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, finalRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle ambient glow ring around nodes
        const glowOpacity = 0.15 + (Math.sin(pulseTime * 2 + node.x) * 0.05);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, finalRadius + 4, 0, Math.PI * 2);
        ctx.stroke();

        // Draw text label for primary nodes
        if (node.label && dimensions.width > 450) {
          ctx.fillStyle = 'rgba(230, 230, 230, 0.85)';
          ctx.font = '10px var(--font-mono)';
          ctx.textAlign = 'left';
          ctx.fillText(` ${node.label}`, node.x + finalRadius + 6, node.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, simulationMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden bg-radial from-neutral-950/20 to-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero-canvas-container"
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none block z-0"
      />
      {/* Visual background decorations - Subtle Tech Overlays */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent z-10" />

      {/* Futuristic Floating Glass Panel in Hero Graphic */}
      <div className="relative glass-panel p-6 rounded-2xl max-w-sm w-11/12 mx-auto shadow-2xl border border-white/5 backdrop-blur-md z-10 select-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">System Core Status</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">v1.2.0</span>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
            <span className="text-xs text-neutral-400 block mb-1">潘惟 & 团队创研主题</span>
            <span className="text-sm font-semibold text-white">以人工智能赋能商业</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 bg-white/[0.01] border border-white/5 rounded">
              <span className="text-neutral-500 block">AI 引擎</span>
              <span className="text-blue-400">Deep Learning</span>
            </div>
            <div className="p-2 bg-white/[0.01] border border-white/5 rounded">
              <span className="text-neutral-500 block">数字化速率</span>
              <span className="text-emerald-400">60 FPS Fluid</span>
            </div>
          </div>

          {/* Mini simulation indicator */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-[10px] text-neutral-400">
              当前仿真状态: 
              <span className="text-white ml-1 font-mono uppercase">
                {simulationMode === 'ai' ? '神经网络 (AI)' : simulationMode === 'creative' ? '创意漂浮 (Creative)' : '系统脉冲 (Pulse)'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
