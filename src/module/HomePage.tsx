import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BringOnCharlies from 'src/assets/bring-on-charlies.svg?react';
import { PRODUCTS_DATA } from 'src/constants/productsData';
import { CursorButton } from 'src/shared/CursorButton';

export const HomePage = () => {
	const products = Object.values(PRODUCTS_DATA);
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentProduct = products[currentIndex];

	const handleNextProduct = () => {
		setCurrentIndex((prev) => (prev + 1) % products.length);
	};

	return (
		<section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4'>
			{/* Mouse Following Button */}
			<CursorButton onClick={handleNextProduct} text='TAP' />

			<div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] p-6'>
				{/* Background Layer with Popup Effect */}
				<AnimatePresence mode='popLayout'>
					<motion.div
						key={currentProduct.id}
						//  initial: 组件第一次被放入 DOM 时所呈现的状态。
						//  CSS clip-path: circle(...): 裁切出一个圆形区域。
						//  0%: 圆的半径。半径为 0%，意味着这个 div 是完全不可见的，被缩成了一个点。
						//  at 50% 50%: 圆心位置。在元素的正中心。
						initial={{ clipPath: 'circle(0% at 50% 50%)' }}
						// animate: 组件挂载后，Framer Motion 会自动将 clipPath 从 initial 值过渡到这个目标值。
						// 150%: 最终的圆半径。
						// 为什么是 150% 而不是 100%？ 半径为 100% 只能保证圆的上下或左右边缘到达矩形边界。当矩形较宽或较高时，100% 的圆半径可能无法完全覆盖矩形的四个角。使用 150% 的半径可以确保圆即使在长条形容器中也能完美覆盖其所有四个角落，从而完全“揭示”出 div。
						animate={{ clipPath: 'circle(150% at 50% 50%)' }}
						// 如果这段代码外层包裹了 <AnimatePresence>（这是必须的），当旧的产品组件因为 key 改变要离开屏幕时，就会触发这个动画。
						exit={{ opacity: 0 }}
						// transition: 统一定义 initial 到 animate 过程的属性。
						// duration: 0.8: 动画持续时间为 0.8 秒。这是一个比较舒缓的速度。
						// ease: [0.4, 0, 0.2, 1]: 这是一个自定义的三次贝塞尔曲线（Cubic Bézier curve）。它定义了动画的速度变化：
						// - 动画开始阶段：速度稍微慢一点。
						// - 中间阶段：迅速加速，感觉非常顺滑。
						// - 结束阶段：缓慢减速，优雅地停下来。
						// - 这种曲线（通常称为 ease-in-out 的自定义版本）常用于 Google Material Design，能给用户带来自然、舒适且有质感的体验。
						transition={{ duration: 0.8, ease: 'easeInOut' }}
						className={`absolute inset-0 ${currentProduct.bgColor}`}
					/>
				</AnimatePresence>

				{/* Home Deco Img */}
				<img
					src='/images/home-page-deco.png'
					alt='deco'
					className='absolute right-0 scale-[300%] sm:bottom-0 sm:scale-150 lg:scale-100'
				/>

				<BringOnCharlies className='max-w-155' />

				{/* Video element with smooth transition */}
				<div className='absolute h-full w-full lg:max-w-165'>
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
				</div>

				<div className='text-text-primary z-10 mt-8 flex w-full items-start px-10'>
					<p className='text-2xl font-medium uppercase'>Taste</p>
					<p className='mr-3 text-2xl font-medium uppercase'>:</p>
					<div className='border-text-primary min-w-30 border-b-2 border-solid'>
						{/* <AnimatePresence mode='wait'>
							<motion.p
								key={currentProduct.id}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -20, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className='text-lg'
							> */}
						{currentProduct.displayName}
						{/* </motion.p>
						</AnimatePresence> */}
					</div>
				</div>
			</div>
		</section>
	);
};
