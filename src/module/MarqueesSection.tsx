import { MARQUEES_DATA } from 'src/constants/marqueesData';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const MarqueesSection = () => {
	const marqueesData = Object.values(MARQUEES_DATA);
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'], // 从进入视口到离开视口
	});

	// 滚动时向左移动，制造 parallax 跑马灯感
	const x = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

	return (
		<div ref={ref} className='my-24 flex h-28 w-full -rotate-4 overflow-hidden bg-white'>
			<motion.div style={{ x }} className='flex min-w-max items-center gap-x-16'>
				{/* 重复两份内容，避免移动时露出空白 */}
				{[...marqueesData, ...marqueesData].map((item, index) => (
					<div key={`${item.id}-${index}`} className='flex items-center justify-center gap-x-4'>
						<img src={item.img} alt={item.displayName} className='w-12' />
						<p className='text-text-primary mt-3 text-5xl font-medium tracking-wide text-nowrap uppercase'>
							{item.displayName}
						</p>
					</div>
				))}
			</motion.div>
		</div>
	);
};
