import { useRef, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotionPreference";
import ProfilePhoto from "./ProfilePhoto";

const NODE_COLORS = ["#5B8CFF", "#9B6BFF", "#3BD8F0", "#E65BFF", "#10B981"];

interface Node {
  x: number; y: number;
  color: string;
  angle: number; radius: number; speed: number; size: number;
}

export default function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const SIZE = 380;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const CX = SIZE / 2;
    const CY = SIZE / 2;

    const nodes: Node[] = [
      { x:0,y:0, color: NODE_COLORS[0], angle:0,   radius:140, speed:0.007,  size:7 },
      { x:0,y:0, color: NODE_COLORS[1], angle:120,  radius:140, speed:0.005,  size:6 },
      { x:0,y:0, color: NODE_COLORS[2], angle:240,  radius:140, speed:0.009,  size:5 },
      { x:0,y:0, color: NODE_COLORS[3], angle:60,   radius:95,  speed:-0.011, size:5 },
      { x:0,y:0, color: NODE_COLORS[4], angle:180,  radius:95,  speed:-0.008, size:4 },
      { x:0,y:0, color: NODE_COLORS[0], angle:300,  radius:95,  speed:0.013,  size:4 },
    ];

    const hexToRgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const draw = () => {
      ctx.clearRect(0,0,SIZE,SIZE);

      // Outer ambient glow rings
      [170,155,140].forEach((r, i) => {
        const grad = ctx.createRadialGradient(CX,CY,r-8,CX,CY,r+8);
        grad.addColorStop(0, hexToRgba(NODE_COLORS[i % NODE_COLORS.length], 0.04 + Math.sin(t+i)*0.02));
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(CX,CY,r,0,Math.PI*2);
        ctx.strokeStyle = hexToRgba(["#5B8CFF","#9B6BFF","#3BD8F0"][i], 0.12 + Math.sin(t*1.5+i)*0.04);
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5,10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Inner orbit
      ctx.beginPath();
      ctx.arc(CX,CY,95,0,Math.PI*2);
      ctx.strokeStyle = hexToRgba("#9B6BFF", 0.15);
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3,7]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating hex shape
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(t * 0.3);
      const hexR = 72;
      ctx.beginPath();
      for (let i=0;i<6;i++) {
        const a = (i*Math.PI)/3;
        if(i===0) ctx.moveTo(hexR*Math.cos(a), hexR*Math.sin(a));
        else ctx.lineTo(hexR*Math.cos(a), hexR*Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = hexToRgba("#5B8CFF", 0.15);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Update nodes
      nodes.forEach(n => {
        if (!reducedMotion) n.angle += n.speed;
        const rad = (n.angle * Math.PI)/180;
        n.x = CX + n.radius * Math.cos(rad);
        n.y = CY + n.radius * Math.sin(rad);
      });

      // Draw connection lines
      for (let i=0;i<nodes.length;i++) {
        for (let j=i+1;j<nodes.length;j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 210) {
            const a = Math.max(0, 0.18 - dist/1300);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const lg = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            lg.addColorStop(0, hexToRgba(nodes[i].color, a));
            lg.addColorStop(1, hexToRgba(nodes[j].color, a));
            ctx.strokeStyle = lg;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw node glows + cores
      nodes.forEach(n => {
        const grad = ctx.createRadialGradient(n.x,n.y,0, n.x,n.y,n.size*4);
        grad.addColorStop(0, hexToRgba(n.color, 0.55));
        grad.addColorStop(1, hexToRgba(n.color, 0));
        ctx.beginPath();
        ctx.arc(n.x,n.y, n.size*4, 0, Math.PI*2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x,n.y, n.size, 0, Math.PI*2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Animated gradient border around profile circle
      const ba = t * 0.7;
      const bgrad = ctx.createLinearGradient(
        CX + 65*Math.cos(ba), CY + 65*Math.sin(ba),
        CX - 65*Math.cos(ba), CY - 65*Math.sin(ba)
      );
      bgrad.addColorStop(0,    "#5B8CFF");
      bgrad.addColorStop(0.25, "#9B6BFF");
      bgrad.addColorStop(0.5,  "#3BD8F0");
      bgrad.addColorStop(0.75, "#E65BFF");
      bgrad.addColorStop(1,    "#5B8CFF");

      ctx.beginPath();
      ctx.arc(CX,CY,66,0,Math.PI*2);
      ctx.strokeStyle = bgrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      if (!reducedMotion) t += 0.018;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  const badges = [
    { label: "Solidity",  top:"6%",   right:"4%",  left:undefined, bottom:undefined, color:"var(--accent-violet)", cls:"badge-f1" },
    { label: "React",     top:"44%",  right:"-3%", left:undefined, bottom:undefined, color:"var(--accent-cyan)",   cls:"badge-f2" },
    { label: "Python",    top:undefined,right:undefined, left:"4%", bottom:"8%",     color:"var(--accent-blue)",   cls:"badge-f3" },
    { label: "Web3",      top:"44%",  right:undefined, left:"-3%", bottom:undefined, color:"var(--accent-violet)", cls:"badge-f4" },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width:380, height:380, maxWidth:"100%" }}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width:380, height:380 }} aria-hidden="true" />

      {/* Central profile */}
      <div className="relative z-10 rounded-full overflow-hidden" style={{ width:122, height:122 }}>
        <ProfilePhoto />
      </div>

      {/* Floating tech badges */}
      {badges.map(b => (
        <span
          key={b.label}
          className={`absolute z-20 text-xs font-bold px-3.5 py-1.5 rounded-full glass-card border border-[var(--border)] shadow-md ${b.cls}`}
          style={{
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            color: b.color,
          }}
          aria-hidden="true"
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}
