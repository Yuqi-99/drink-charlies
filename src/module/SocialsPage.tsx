/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useRef } from 'react';
import TextUnderlineDeco from 'src/assets/socials-text-deco.svg?react';
import { SOCIALS_DATA } from 'src/constants/socialsData';
import { SocialCard } from 'src/module/components/SocialCard';
import { FooterSection } from 'src/module/FooterSection';
import { useSwipeScroll } from 'src/utils/useSwipeScroll';

export const SocialsPage = () => {
	const { containerRef, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
		useSwipeScroll<HTMLDivElement>();
	const parentRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: scrollProgress } = useScroll({
		target: parentRef,
		offset: ['start end', 'end end'],
	});

	const smoothProgress = useSpring(scrollProgress, {
		stiffness: 80,
		damping: 20,
		restDelta: 0.001,
	});

	// "Socials" 文字从下往上升
	const socialsY = useTransform(smoothProgress, [0, 0.3], ['200px', '0px']);
	const socialOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

	return (
		<div ref={parentRef} className='relative flex h-full w-full flex-col overflow-hidden p-6'>
			<div className='flex w-full items-center justify-between py-12'>
				<motion.p
					className='text-text-primary text-6xl font-medium uppercase'
					style={{ y: socialsY, opacity: socialOpacity }}
				>
					Socials
				</motion.p>
				<a
					target='_blank'
					href='https://www.instagram.com/drinkcharlies?igsh=aWprZ2pmNTdndWUw'
					className='text-text-primary group relative inline-block w-fit cursor-pointer text-2xl uppercase'
				>
					Instagram
					<TextUnderlineDeco
						className='absolute bottom-0 left-0 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100'
						preserveAspectRatio='none'
					/>
				</a>
			</div>
			<motion.div
				className='no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto p-6'
				ref={containerRef}
				onMouseDownCapture={onMouseDown}
				onMouseMoveCapture={onMouseMove}
				onMouseUpCapture={onMouseUp}
				onMouseLeave={onMouseLeave}
			>
				{SOCIALS_DATA?.map((item) => (
					<SocialCard
						key={item.id}
						item={item}
						parentRef={parentRef as any}
						containerRef={containerRef as any}
					/>
				))}
			</motion.div>

			<FooterSection />
		</div>
	);
};
