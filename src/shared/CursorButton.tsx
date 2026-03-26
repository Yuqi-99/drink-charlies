import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'src/utils/useMediaQuery';

interface CursorButtonProps {
	onClick: () => void;
	text?: string;
}

export const CursorButton = ({ onClick, text = 'Next' }: CursorButtonProps) => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [ready, setReady] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Spring configuration for smooth following
	const springConfig = { damping: 25, stiffness: 200 };
	const springX = useSpring(mouseX, springConfig);
	const springY = useSpring(mouseY, springConfig);

	useEffect(() => {
		// const OFFSET = isMobile ? 180 : 240;
		const getInitialPos = () => ({
			x: window.innerWidth / 1.3,
			y: window.innerHeight / 1.3,
		});

		// 在客户端拿到窗口尺寸后，设置初始位置到右下角
		const initial = getInitialPos();
		mouseX.set(initial.x);
		mouseY.set(initial.y);

		setTimeout(() => setReady(true), 500);

		const handleResize = () => {
			const currentInitial = getInitialPos();
			mouseX.set(currentInitial.x);
			mouseY.set(currentInitial.y);
		};

		window.addEventListener('resize', handleResize);

		// 如果是移动端，只监听 resize 保证位置正确，不监听 mousemove
		if (isMobile) {
			return () => window.removeEventListener('resize', handleResize);
		}

		const handleMouseMove = (e: MouseEvent) => {
			const currentInitial = getInitialPos();
			// Define boundaries (e.g., top 100px for header, bottom 100px for footer region)
			const isInHeader = e.clientY < 100;
			const isInFooter = e.clientY > window.innerHeight - 150;

			if (isInHeader || isInFooter) {
				// Reset to initial position if in restricted area
				mouseX.set(currentInitial.x);
				mouseY.set(currentInitial.y);
			} else {
				// Follow mouse normally if in allowed area
				mouseX.set(e.clientX);
				mouseY.set(e.clientY);
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile, mouseX, mouseY]);

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
			className='fixed top-0 left-0 z-10 flex size-32 min-w-32 cursor-pointer items-center justify-center rounded-full bg-yellow-200 shadow-lg'
			whileTap={{ scale: 0.9 }}
		>
			<p className='text-text-primary -mb-4 text-4xl font-bold uppercase'>{text}</p>
		</motion.button>
	);
};
