/* eslint-disable @typescript-eslint/no-unused-vars */
import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useMediaQuery } from 'src/utils/useMediaQuery';

const cards = [
	{
		id: '01',
		title: 'Yes we can. Can!',
		img: '/images/environment/env-1.svg',
		desc: 'Cans, crafted from permanent aluminum, offer unique recycling advantages. Unlike plastic bottles, cans can be recycled endlessly, contributing to a circular economy.',
	},
	{
		id: '02',
		title: 'Organic Fruits',
		img: '/images/environment/env-2.svg',
		desc: 'Organic farming reduces pollution, erosion, and energy use, yet improves soil, health for insects and birds, conserving water on the way. We keep supporting our farmers and soil.',
	},
	{
		id: '03',
		title: 'Harmless Hydration',
		img: '/images/environment/env-3.svg',
		desc: 'Unsweetened, zero sugar. Vegan. Harmless and never boring. To keep our planet healthy and beautiful!',
	},
];

export const EnvironmentPage = () => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const parentRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	// Track scroll progress of the tall parent container
	const { scrollYProgress: scrollProgress } = useScroll({
		target: parentRef,
		offset: ['start start', 'end end'],
	});

	// Track entry progress for the background scale animation
	const { scrollYProgress: entryProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	});

	const scaleBg = useTransform(entryProgress, [0, 0.4], [0.7, 1]);

	// Translate the cards container vertically based on scroll progress
	// With 3 cards, moving up by around 60-70% should reveal them all if they are tall.
	const cardY = useTransform(scrollProgress, [0.1, 0.9], ['0%', '-60%']);

	const rawProgress = scrollProgress; // 原始值

	// 用 spring 包装，damping 越高越少弹跳，stiffness 越低越慢
	const smoothProgress = useSpring(rawProgress, {
		stiffness: 80,
		damping: 20,
		restDelta: 0.001,
	});
	const cardYMobile = useTransform(smoothProgress, [0.28, 0.9], ['0%', '-60%']);

	const titleOpacity = useTransform(smoothProgress, [0, 0.05, 0.25], [1, 1, 0]);
	const marginTop = useTransform(smoothProgress, [0.28, 0.9], ['400px', '200px', '0%']);

	return (
		<div ref={parentRef} className='relative h-[200dvh] w-full p-6'>
			<motion.div
				ref={targetRef}
				className='flex-gap-x-3 sticky top-6 z-0 flex h-[calc(100dvh-3rem)] w-full flex-col justify-between overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] bg-green-200 p-6 pt-12 lg:flex-row'
				style={{ scaleX: scaleBg }}
			>
				{/* title section - stays stationary */}
				<motion.div
					style={
						isMobile
							? {
									position: 'absolute',
									opacity: titleOpacity,
									height: '100%',
									// width: '85%',
								}
							: undefined
					}
					className='flex w-[85%] flex-col pb-12 sm:w-1/2 lg:flex lg:w-1/2 lg:items-center lg:justify-between'
				>
					<div className='mt-4 flex flex-col sm:mt-10 lg:mt-20 lg:items-center'>
						<div className='w-fit rotate-3 rounded-[2%_2%_5%_40%/25%_16%_28%_1%] bg-green-100 p-4 lg:w-1/2'>
							<p className='text-text-primary text-2xl font-medium uppercase'>
								We care about our planet!
							</p>
						</div>
						<p className='text-text-primary mt-6 text-4xl leading-10 font-medium md:text-5xl lg:w-1/2 lg:leading-14'>
							Charlie wants a healthy environment for everybody
						</p>
					</div>

					<button className='text-text-primary mt-4 flex w-fit items-center rounded-full bg-yellow-100 p-1 lg:mt-0'>
						<div className='flex size-8 items-center justify-center rounded-full bg-[#849FA8]'>
							💧
						</div>
						<p className='mx-4 w-full'>Need hydration NOW? to storefinder!</p>
						<IoClose className='mr-2 min-w-4' />
					</button>
				</motion.div>

				{/* cards section - translates vertically */}
				<div className='relative h-full overflow-hidden sm:px-6 lg:mt-0 lg:w-1/2'>
					<motion.div
						style={{ y: isMobile ? cardYMobile : cardY, marginTop: isMobile ? marginTop : 0 }}
						className='flex flex-col gap-12'
					>
						{cards.map((card) => (
							<div
								key={card.id}
								className='flex flex-col justify-between rounded-[2%_2%_5%_40%/25%_16%_28%_1%] bg-green-100 p-8 sm:min-h-[80vh] lg:min-h-[60vh]'
							>
								<div className='flex justify-between'>
									<p className='text-5xl font-medium text-green-300 sm:text-9xl'>{card.id}</p>
									<img src={card.img} alt={`deco${card.id}`} className='size-48 sm:size-68' />
								</div>
								<div>
									<p className='text-text-primary py-4 text-4xl uppercase sm:text-7xl'>
										{card.title}
									</p>
									<p className='text-text-primary text-xl sm:text-3xl'>{card.desc}</p>
								</div>
							</div>
						))}
						{/* Extra padding space at bottom */}
						<div className='h-[20vh] sm:h-[80vh] lg:h-[40vh]' />
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};
