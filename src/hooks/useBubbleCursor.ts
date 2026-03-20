import { useEffect } from 'react';

interface BubbleOptions {
	maxSize?: number; // 最大气泡尺寸，默认 12
	density?: number; // 密度 1-10，默认 4
	rise?: number; // 上升距离px，默认 80
	colors?: string[]; // 气泡颜色数组
}

export function useBubbleCursor(options: BubbleOptions = {}) {
	const {
		maxSize = 12,
		density = 6,
		rise = 80,
		colors = [
			'rgba(85, 170, 255, 0.6)',
			'rgba(120, 190, 255, 0.45)',
			'rgba(60, 140, 230, 0.5)',
			'rgba(150, 210, 255, 0.35)',
		],
	} = options;

	useEffect(() => {
		let frameCount = 0;

		// 注入 keyframes（只注入一次）
		const styleId = 'bubble-cursor-style';
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style');
			style.id = styleId;
			style.textContent = `
        @keyframes bubbleRise {
          0%   { transform: translate(-50%, -50%) scale(0);  opacity: 0.9; }
          15%  { transform: translate(-50%, -50%) scale(1);  opacity: 0.85; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% - var(--rise))) scale(var(--shrink)); opacity: 0; }
        }
        .bubble-particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%) scale(0);
        }
      `;
			document.head.appendChild(style);
		}

		function spawnBubble(x: number, y: number) {
			const el = document.createElement('div');
			el.className = 'bubble-particle';

			const size = (maxSize * 0.4 + Math.random() * maxSize * 0.8) | 0;
			const dx = (Math.random() - 0.5) * 28;
			const riseAmt = rise * (0.6 + Math.random() * 0.8);
			const shrink = 0.2 + Math.random() * 0.4;
			const dur = 0.8 + Math.random() * 0.8;
			const isHollow = Math.random() > 0;
			const color = colors[Math.floor(Math.random() * colors.length)];

			el.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        --dx: ${dx}px;
        --rise: ${riseAmt}px;
        --shrink: ${shrink};
        animation: bubbleRise ${dur}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        ${
					isHollow
						? `background: transparent; border: 2px solid ${color};`
						: `background: ${color};`
				}
      `;

			document.body.appendChild(el);
			setTimeout(() => el.remove(), dur * 1000 + 100);
		}

		function onMouseMove(e: MouseEvent) {
			frameCount++;
			const interval = Math.max(1, 12 - density);

			if (frameCount % interval === 0) {
				const count = Math.ceil(density / 4);
				for (let i = 0; i < count; i++) {
					// 原来：只在鼠标周围 ±5px 随机
					// const ox = (Math.random() - 0.5) * 10

					// 改成：在鼠标周围半径 40px 的圆形区域内随机散布
					const radius = 40; // ← 调这个控制扩散范围
					const angle = Math.random() * Math.PI * 2;
					const r = Math.sqrt(Math.random()) * radius; // sqrt 让分布更均匀
					const ox = Math.cos(angle) * r;
					const oy = Math.sin(angle) * r;

					spawnBubble(e.clientX + ox, e.clientY + oy);
				}
			}
		}

		window.addEventListener('mousemove', onMouseMove);
		return () => window.removeEventListener('mousemove', onMouseMove);
	}, [maxSize, density, rise, colors]);
}
