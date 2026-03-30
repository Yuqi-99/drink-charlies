// import { useEffect, useState, useRef } from 'react';
// import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import BringOnCharlies from 'src/assets/bring-on-charlies.svg?react';
// import { PRODUCTS_DATA } from 'src/constants/productsData';
// import { CursorButton } from 'src/shared/CursorButton';
// import { useMediaQuery } from 'src/utils/useMediaQuery';

// export const HomeProductsPage = () => {
// 	const sectionRef = useRef<HTMLElement>(null);
// 	const products = Object.values(PRODUCTS_DATA);
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [isAnimating, setIsAnimating] = useState(false);
// 	const currentProduct = products[currentIndex];

// 	const isMobile = useMediaQuery('(max-width: 1023px)');

// 	// Mouse tracking for parallax
// 	const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
// 	const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

// 	const springConfig = { damping: 50, stiffness: 300 };
// 	const springX = useSpring(mouseX, springConfig);
// 	const springY = useSpring(mouseY, springConfig);

// 	// Relative mouse position from center (-0.5 to 0.5)
// 	const centerMouseX = useTransform(
// 		springX,
// 		[0, typeof window !== 'undefined' ? window.innerWidth : 1000],
// 		[-0.5, 0.5]
// 	);
// 	const centerMouseY = useTransform(
// 		springY,
// 		[0, typeof window !== 'undefined' ? window.innerHeight : 1000],
// 		[-0.5, 0.5]
// 	);

// 	// Parallax Depth Offsets
// 	const decoX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [20, -20] : [0, 0]);
// 	const decoY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [20, -20] : [0, 0]);

// 	const bottleX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [-40, 40] : [0, 0]);
// 	const bottleY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [-40, 40] : [0, 0]);

// 	const textX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [15, -15] : [0, 0]);
// 	const textY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [15, -15] : [0, 0]);

// 	const handleNextProduct = () => {
// 		if (isAnimating) return;
// 		setCurrentIndex((prev) => (prev + 1) % products.length);
// 	};

// 	useEffect(() => {
// 		if (isMobile) return;

// 		const handleMouseMove = (e: MouseEvent) => {
// 			mouseX.set(e.clientX);
// 			mouseY.set(e.clientY);
// 		};

// 		window.addEventListener('mousemove', handleMouseMove);
// 		return () => window.removeEventListener('mousemove', handleMouseMove);
// 	}, [isMobile, mouseX, mouseY]);

// 	return (
// 		<section
// 			ref={sectionRef}
// 			id='home'
// 			className='relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6'
// 		>
// 			{/* Mouse Following Button */}
// 			<CursorButton onClick={handleNextProduct} text='TAP' containerRef={sectionRef} />

// 			<div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] p-6'>
// 				{/* Background Layer with Popup Effect */}
// 				<AnimatePresence mode='popLayout'>
// 					<motion.div
// 						key={`product-${currentProduct.id}-${currentIndex}`}
// 						//  initial: 组件第一次被放入 DOM 时所呈现的状态。
// 						//  CSS clip-path: circle(...): 裁切出一个圆形区域。
// 						//  0%: 圆的半径。半径为 0%，意味着这个 div 是完全不可见的，被缩成了一个点。
// 						//  at 50% 50%: 圆心位置。在元素的正中心。
// 						initial={{ clipPath: 'circle(0% at 50% 50%)' }}
// 						// animate: 组件挂载后，Framer Motion 会自动将 clipPath 从 initial 值过渡到这个目标值。
// 						// 150%: 最终的圆半径。
// 						// 为什么是 150% 而不是 100%？ 半径为 100% 只能保证圆的上下或左右边缘到达矩形边界。当矩形较宽或较高时，100% 的圆半径可能无法完全覆盖矩形的四个角。使用 150% 的半径可以确保圆即使在长条形容器中也能完美覆盖其所有四个角落，从而完全“揭示”出 div。
// 						animate={{ clipPath: 'circle(150% at 50% 50%)' }}
// 						// 如果这段代码外层包裹了 <AnimatePresence>（这是必须的），当旧的产品组件因为 key 改变要离开屏幕时，就会触发这个动画。
// 						exit={{ opacity: 0.2 }}
// 						// transition: 统一定义 initial 到 animate 过程的属性。
// 						// duration: 0.8: 动画持续时间为 0.8 秒。这是一个比较舒缓的速度。
// 						// ease: [0.4, 0, 0.2, 1]: 这是一个自定义的三次贝塞尔曲线（Cubic Bézier curve）。它定义了动画的速度变化：
// 						// - 动画开始阶段：速度稍微慢一点。
// 						// - 中间阶段：迅速加速，感觉非常顺滑。
// 						// - 结束阶段：缓慢减速，优雅地停下来。
// 						// - 这种曲线（通常称为 ease-in-out 的自定义版本）常用于 Google Material Design，能给用户带来自然、舒适且有质感的体验。
// 						transition={{ duration: 0.8, ease: 'easeInOut' }}
// 						onAnimationStart={() => setIsAnimating(true)}
// 						onAnimationComplete={() => setIsAnimating(false)}
// 						className={`absolute inset-0 ${currentProduct.bgColor}`}
// 					/>
// 				</AnimatePresence>

// 				{/* Home Deco Img with Parallax */}
// 				<motion.img
// 					style={{ x: decoX, y: decoY }}
// 					src='/images/home-page-deco.png'
// 					alt='deco'
// 					className='absolute right-0 scale-[300%] sm:bottom-0 sm:scale-150 lg:scale-100'
// 				/>

// 				{/* Logo Title with Parallax */}
// 				<motion.div style={{ x: textX, y: textY }}>
// 					<BringOnCharlies className='max-w-155' />
// 				</motion.div>

// 				{/* Video element with Parallax (Inverse of deco for depth) */}
// 				<motion.div
// 					style={{ x: bottleX, y: bottleY }}
// 					className='absolute h-full w-full lg:max-w-165'
// 				>
// 					<AnimatePresence mode='wait'>
// 						<motion.video
// 							key={currentProduct.id}
// 							initial={{ opacity: 1, scale: 1 }}
// 							animate={{ opacity: 1, scale: 1 }}
// 							exit={{ opacity: 1, scale: 1 }}
// 							transition={{ duration: 0.5 }}
// 							className='absolute h-full w-full object-contain'
// 							autoPlay
// 							loop
// 							muted
// 							playsInline
// 						>
// 							<source src={currentProduct.videoUrlMp4} type='video/mp4; codecs="hvc1"' />
// 							<source src={currentProduct.videoUrlWebm} type='video/webm' />
// 							Your browser does not support the video tag.
// 						</motion.video>
// 					</AnimatePresence>
// 				</motion.div>

// 				<div className='text-text-primary absolute bottom-6 z-10 mt-8 flex w-full items-start px-10'>
// 					<p className='text-2xl font-medium uppercase'>Taste</p>
// 					<p className='mr-3 text-2xl font-medium uppercase'>:</p>
// 					<div className='border-text-primary min-w-30 border-b-2 border-solid'>
// 						{currentProduct.displayName}
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

import { useEffect, useState, useRef } from 'react';
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useInView,
} from 'framer-motion';
import BringOnCharlies from 'src/assets/bring-on-charlies.svg?react';
import { PRODUCTS_DATA } from 'src/constants/productsData';
import { CursorButton } from 'src/shared/CursorButton';
import { useMediaQuery } from 'src/utils/useMediaQuery';

export const HomeProductsPage = () => {
	const sectionRef = useRef<HTMLElement>(null);

	// 1. 监测当前 Section 是否在屏幕可见范围内
	// amount: 0.1 表示只要 10% 的内容进入/留在视口，就触发 isInView
	const isInView = useInView(sectionRef, { amount: 0.1 });

	const products = Object.values(PRODUCTS_DATA);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const currentProduct = products[currentIndex];

	const isMobile = useMediaQuery('(max-width: 1023px)');

	// Mouse tracking 初始值设为中心
	const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
	const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

	// 这里的 springConfig 决定了“归位”时的丝滑程度
	const springConfig = { damping: 50, stiffness: 300 };
	const springX = useSpring(mouseX, springConfig);
	const springY = useSpring(mouseY, springConfig);

	const centerMouseX = useTransform(
		springX,
		[0, typeof window !== 'undefined' ? window.innerWidth : 1000],
		[-0.5, 0.5]
	);
	const centerMouseY = useTransform(
		springY,
		[0, typeof window !== 'undefined' ? window.innerHeight : 1000],
		[-0.5, 0.5]
	);

	const decoX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [20, -20] : [0, 0]);
	const decoY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [20, -20] : [0, 0]);

	const bottleX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [-40, 40] : [0, 0]);
	const bottleY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [-40, 40] : [0, 0]);

	const textX = useTransform(centerMouseX, [-0.5, 0.5], !isMobile ? [15, -15] : [0, 0]);
	const textY = useTransform(centerMouseY, [-0.5, 0.5], !isMobile ? [15, -15] : [0, 0]);

	const handleNextProduct = () => {
		if (isAnimating) return;
		setCurrentIndex((prev) => (prev + 1) % products.length);
	};

	useEffect(() => {
		// 2. 如果是移动端，或者【不在视图内】，直接重置并停止监听
		if (isMobile || !isInView) {
			if (typeof window !== 'undefined') {
				// 强制回归中心点，元素会通过 useSpring 平滑地回到原位
				mouseX.set(window.innerWidth / 2);
				mouseY.set(window.innerHeight / 2);
			}
			return;
		}

		// 3. 只有在 isInView 为 true 时才绑定鼠标事件
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [isMobile, isInView, mouseX, mouseY]); // 核心：监听 isInView 的变化

	return (
		<section
			ref={sectionRef}
			id='home'
			className='relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6'
		>
			<CursorButton onClick={handleNextProduct} text='TAP' containerRef={sectionRef} />

			<div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] p-6'>
				<AnimatePresence mode='popLayout'>
					<motion.div
						key={`product-${currentProduct.id}-${currentIndex}`}
						initial={{ clipPath: 'circle(0% at 50% 50%)' }}
						animate={{ clipPath: 'circle(150% at 50% 50%)' }}
						exit={{ opacity: 0.2 }}
						transition={{ duration: 0.8, ease: 'easeInOut' }}
						onAnimationStart={() => setIsAnimating(true)}
						onAnimationComplete={() => setIsAnimating(false)}
						className={`absolute inset-0 ${currentProduct.bgColor}`}
					/>
				</AnimatePresence>

				<motion.img
					style={{ x: decoX, y: decoY }}
					src='/images/home-page-deco.png'
					alt='deco'
					className='absolute right-0 scale-[300%] sm:bottom-0 sm:scale-150 lg:scale-100'
				/>

				<motion.div style={{ x: textX, y: textY }}>
					<BringOnCharlies className='max-w-155' />
				</motion.div>

				<motion.div
					style={{ x: bottleX, y: bottleY }}
					className='absolute h-full w-full lg:max-w-165'
				>
					<AnimatePresence mode='wait'>
						<motion.video
							key={currentProduct.id}
							initial={{ opacity: 1, scale: 1 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className='absolute h-full w-full object-contain'
							autoPlay
							loop
							muted
							playsInline
						>
							<source src={currentProduct.videoUrlMp4} type='video/mp4; codecs="hvc1"' />
							<source src={currentProduct.videoUrlWebm} type='video/webm' />
							Your browser does not support the video tag.
						</motion.video>
					</AnimatePresence>
				</motion.div>

				<div className='text-text-primary absolute bottom-6 z-10 mt-8 flex w-full items-start px-10'>
					<p className='text-2xl font-medium uppercase'>Taste</p>
					<p className='mr-3 text-2xl font-medium uppercase'>:</p>
					<div className='border-text-primary min-w-30 border-b-2 border-solid'>
						{currentProduct.displayName}
					</div>
				</div>
			</div>
		</section>
	);
};
