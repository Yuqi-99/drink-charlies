import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';
import { useMediaQuery } from 'src/utils/useMediaQuery';

interface CursorButtonProps {
	onClick: () => void;
	text?: string;
	containerRef: RefObject<HTMLElement | null>;
}

export const CursorButton = ({ onClick, text = 'Next', containerRef }: CursorButtonProps) => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [ready, setReady] = useState(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { damping: 20, stiffness: 200, restDelta: 0.001 });
	const springY = useSpring(mouseY, { damping: 20, stiffness: 200, restDelta: 0.001 });

	useEffect(() => {
		const resetToDefault = (immediate = false) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (rect) {
				// 这里的坐标是相对于视口(Viewport)的，因为按钮是 fixed
				// 这里的 1.4 是你原本代码里的比例逻辑
				const targetX = rect.left + rect.width / 1.4;
				const targetY = rect.top + rect.height / 1.4;

				if (immediate) {
					// 如果需要“瞬间”归位，可以直接 jump
					mouseX.jump(targetX);
					mouseY.jump(targetY);
				} else {
					mouseX.set(targetX);
					mouseY.set(targetY);
				}
				// mouseX.set(rect.left + rect.width / 1.4);
				// mouseY.set(rect.top + rect.height / 1.4);
			}
		};

		resetToDefault(true);
		setTimeout(() => setReady(true), 500);

		const handleMouseMove = (e: MouseEvent) => {
			if (isMobile) return;
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;

			const padding = 100;
			// 判断鼠标是否在当前可见的 section 范围内
			const inSection =
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top + padding &&
				e.clientY <= rect.bottom - padding;

			if (inSection) {
				mouseX.set(e.clientX);
				mouseY.set(e.clientY);
			} else {
				resetToDefault();
			}
		};

		const handleResize = () => resetToDefault(true);
		const handleScroll = () => resetToDefault(true);

		// 关键：监听 scroll，保证不跟随鼠标时，它也锚定在 section 的相对位置
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll); // 新增滚动监听

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isMobile, mouseX, mouseY, containerRef]);

	return (
		<motion.button
			onClick={onClick}
			style={{
				x: springX,
				y: springY,
				translateX: '-50%',
				translateY: '-50%',
				// 初始化完成前隐藏，避免闪烁到左上角
				opacity: ready ? 1 : 0,
			}}
			className='fixed top-0 left-0 z-40 flex size-32 min-w-32 cursor-pointer items-center justify-center rounded-full bg-yellow-200 shadow-lg'
			whileTap={{ scale: 0.9 }}
		>
			<p className='text-text-primary -mb-4 text-4xl font-bold uppercase'>{text}</p>
		</motion.button>
	);
};
