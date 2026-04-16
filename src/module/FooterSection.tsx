/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { useRef } from 'react';
import DecoIcon from 'src/assets/story-2-deco.svg?react';

const lines = [
	"Enjoy the pure, organic taste of Charlie's",
	'- no added sugars, no nonsense, just',
	'refreshment in a fully recyclable can',
];

// const AnimatedLine = ({
// 	text,
// 	// index,
// 	// containerRef,
// }: {
// 	text: string;
// 	// index: number;
// 	// containerRef: React.RefObject<HTMLDivElement>;
// }) => {
// 	// const { scrollYProgress } = useScroll({
// 	// 	target: containerRef,
// 	// 	offset: ['start end', 'center center'],
// 	// });

// 	// const start = 0.05 + index * 0.4;
// 	// const end = start + 0.25;

// 	// const y = useTransform(scrollYProgress, [start, 1], ['100%', '0%']);
// 	// const rotate = useTransform(scrollYProgress, [start, 1], [10, 0]);
// 	// const opacity = useTransform(scrollYProgress, [start, 1], [0, 1]);

// 	const containerVariants: Variants = {
// 		rest: {},
// 		inView: {
// 			transition: {
// 				staggerChildren: 0.12, // 每行间隔 0.12s
// 			},
// 		},
// 	};

// 	const textVariants: Variants = {
// 		rest: {
// 			y: '100%',
// 			opacity: 0,
// 		},
// 		inView: {
// 			y: ['100%', '0%'],
// 			rotate: [10, 0],
// 			opacity: [0, 1],
// 			transition: {
// 				duration: 0.7,
// 				ease: 'easeOut',
// 			},
// 		},
// 	};

// 	return (
// 		// overflow-hidden 是关键，裁切掉还没升上来的部分
// 		<span className='block'>
// 			<motion.span variants={textVariants} className='block' initial='rest' whileInView='inView'>
// 				{text}
// 			</motion.span>
// 		</span>
// 	);
// };

export const FooterSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	// 第一幕 scroll（保持原有不变）
	const { scrollYProgress: act1Progress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const scaleTextImg = useTransform(act1Progress, [0.1, 0.5], [0.7, 1]);
	const rotateTextImg = useTransform(act1Progress, [0.1, 0.5], [25, 0]);

	const x = useTransform(act1Progress, [0.2, 1], ['0%', '-30%']);

	const containerVariants: Variants = {
		rest: {},
		inView: {
			transition: {
				staggerChildren: 0.3, // 每行间隔 0.12s
			},
		},
	};

	const lineVariants: Variants = {
		rest: {
			y: '100%',
			rotate: 10,
			opacity: 0,
		},
		inView: {
			y: '0%',
			rotate: 0,
			opacity: 1,
			transition: {
				duration: 0.7,
				ease: 'easeOut',
			},
		},
	};

	return (
		<section className='relative mt-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden md:mt-20'>
			<div
				ref={containerRef}
				className='relative mt-10 flex h-fit min-h-[85vh] w-full flex-col items-center justify-around overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] bg-pink-300 p-6'
			>
				<div className='flex w-full flex-col-reverse items-center justify-center sm:flex-row sm:justify-between'>
					<div className='mt-12 flex sm:mt-0 sm:w-1/2 sm:justify-end'>
						<DecoIcon className='mt-3 hidden w-12 sm:mr-6 sm:flex' />
						<motion.p
							className='text-text-primary text-center text-2xl leading-10 font-medium sm:text-start lg:w-3/4'
							variants={containerVariants}
							initial='rest'
							whileInView='inView'
							viewport={{ once: true, amount: 0.3 }}
						>
							{lines.map((line, i) => (
								<span className='block' key={i}>
									<motion.span
										variants={lineVariants}
										className='block'
										initial='rest'
										whileInView='inView'
									>
										{line}
									</motion.span>
								</span>
							))}
						</motion.p>
					</div>
					<div className='flex w-1/2 justify-center sm:justify-end'>
						<motion.img
							src='/images/let-drink-harmless.svg'
							alt='deco'
							className='w-3/4'
							style={{ scale: scaleTextImg, rotate: rotateTextImg }}
						/>
					</div>
				</div>
				<motion.div
					className='text-text-primary overflow flex items-center text-3xl font-bold text-nowrap sm:text-6xl lg:text-9xl'
					style={{ x }}
				>
					<p className='uppercase'>Follow us</p>
					<img src='/images/product-deco-lime.avif' alt='deco' className='size-36 md:size-48' />
					<p className='uppercase'>Drink Charlie</p>
					<img src='/images/co2.avif' alt='deco' className='size-36 w-42 md:size-48 md:w-54' />

					<p className='uppercase'>Follow us</p>
				</motion.div>

				<div className='text-text-primary flex w-full justify-between text-xs font-medium sm:text-base'>
					<p>@2026</p>
					<a
						href='https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/67dc36536d2d3cc665928760_Privacyverklaring%20Winacties%20%26%20Promoties%20Charlie%27s.pdf'
						target='_blank'
					>
						Privacyvoorwaarden
					</a>
					<a
						href='https://cdn.prod.website-files.com/66dab405fff44f5d08af4edb/688770357969bd46a8ef665d_Actievoorwaarden%20template%202025.pdf'
						target='_blank'
					>
						Actievoorwaarden
					</a>
					<p>Clone by yuqi</p>
				</div>
			</div>
		</section>
	);
};
