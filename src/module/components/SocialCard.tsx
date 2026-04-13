/* eslint-disable @typescript-eslint/no-unused-vars */
import { useScroll, useSpring, useTransform, motion } from 'motion/react';
import { useRef } from 'react';
import type { SOCIALS_DATA } from 'src/constants/socialsData';

export const SocialCard = ({
	item,
	containerRef,
	parentRef,
}: {
	item: (typeof SOCIALS_DATA)[0];
	containerRef: React.RefObject<HTMLDivElement>;
	parentRef: React.RefObject<HTMLDivElement>;
}) => {
	const cardRef = useRef<HTMLDivElement>(null);

	// const { scrollXProgress } = useScroll({
	// 	container: containerRef,
	// 	target: cardRef,
	// 	offset: ['start end', 'center center'],
	// });

	const { scrollYProgress: scrollProgress } = useScroll({
		target: parentRef,
		offset: ['start end', 'center center'],
	});

  // 用这个的话 scrollX 图片会放大
	// const smoothProgress = useSpring(scrollXProgress, {
	// 	stiffness: 80,
	// 	damping: 20,
	// 	restDelta: 0.001,
	// });

	const scale = useTransform(scrollProgress, [0, 1], [1.2, 1]);

	const x = useTransform(scrollProgress, [0.2, 1], ['0%', '-40%']);

	return (
		<motion.div
			ref={cardRef}
			className='h-170 w-130 shrink-0 overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%]'
			style={{ x }}
		>
			<motion.img
				src={item.img}
				alt={item.name}
				className='h-full w-full object-cover'
				style={{ scale }}
			/>
		</motion.div>
	);
};
