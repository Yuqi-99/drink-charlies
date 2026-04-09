import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ScrollRevealText } from 'src/shared/ScrollRevealText';

export const StoryPage = () => {
	const container1Ref = useRef<HTMLDivElement>(null);
	const container2Ref = useRef<HTMLDivElement>(null);

	// 第一幕 scroll（保持原有不变）
	const { scrollYProgress: act1Progress } = useScroll({
		target: container1Ref,
		offset: ['start end', 'end start'],
	});

	// 第二幕 scroll（独立计算）
	const { scrollYProgress: act2Progress } = useScroll({
		target: container2Ref,
		offset: ['start end', 'end start'],
	});

	// ── 第一幕：黄色背景由小变大 ──
	const clipPathYellow = useTransform(
		act1Progress,
		[0, 0.3, 0.5],
		[
			'inset(15% 12.5% 15% 12.5% round 2% 2% 5% 40% / 25% 16% 28% 1%)', // 初始
			'inset(0% 12.5% 0% 12.5% round 2% 2% 5% 40% / 25% 16% 28% 1%)', // 高度填满
			'inset(0% 0% 0% 0% round 0%)', // 宽度也填满
		]
	);

	// 柠檬的图片
	const scaleImg = useTransform(act1Progress, [0.35, 0.65], [0, 0.7]);

	const lines = [
		{ text: 'Sparkling water with a squeeze of real organic fruit.', range: [0.25, 0.65] },
		{ text: 'No added sugars, no sweeteners', range: [0.25, 0.65] },
		{ text: 'No colourants, no preservatives, no concentrates.', range: [0.25, 0.65] },
		{ text: 'Funny we even mention it, no?', range: [0.25, 0.65] },
	];

	// ── 第二幕：蓝色背景从右下角扩散 ──
	// scrollYProgress [0.75, 1] 对应 section 的后半段
	const clipPath = useTransform(
		act2Progress,
		[0, 0.5],
		['circle(0% at 75% 75%)', 'circle(150% at 80% 80%)']
	);

	const scaleImgOut = useTransform(act2Progress, [0, 0.2], [0.7, 0]);

	const secondLines = [
		{ text: "Let's drink harmless!", range: [0.05, 0.2] },
		{ text: "Drink Charlie's, all day, every day.", range: [0.05, 0.2] },
		{ text: 'At work, studying, on the go or at home.', range: [0.05, 0.2] },
		{ text: 'Feeling good and doing good.', range: [0.05, 0.2] },
	];

	const scaleImgFinal = useTransform(() => scaleImg.get() * (scaleImgOut.get() / 0.8));

	const textDecoImg = useTransform(act2Progress, [0.05, 0.2], ['200%', '0%']);

	// 第二幕后半段：蓝色背景缩小成卡片
	const shrinkScale = useTransform(act2Progress, [0.2, 1], [1, 0.8]);
	const shrinkScaleText = useTransform(act2Progress, [0.2, 1], [1, 0.5]);
	const shrinkRadius = useTransform(act2Progress, [0.2, 1], ['0px', '32px']);
	// 同时往上偏移，视觉上像往上浮
	const shrinkY = useTransform(act2Progress, [0.2, 0.6], ['0%', '-10%']);
	const shrinkYText = useTransform(act2Progress, [0.4, 1], ['0%', '-100dvh']);
	const shrinkYDeco = useTransform(act2Progress, [0.4, 1], ['0%', '-100dvh']);
	const shrinkYBgYellow = useTransform(act2Progress, [0.2, 0.3], ['0%', '-100%']);

	return (
		<>
			<div ref={container1Ref} className='relative h-[130vh] w-full max-w-360'>
				{/* sticky 让内容锁在视口中，滚动时不跑走 */}
				<div className='sticky top-0 flex h-full w-full items-center justify-center overflow-hidden'>
					{/* 黄色背景 + 裁切容器 */}
					<motion.div
						style={{
							clipPath: clipPathYellow,
							scale: shrinkScale,
							borderRadius: shrinkRadius,
							y: shrinkYBgYellow,
						}}
						className='bg-yellow-150 absolute inset-0 z-10 overflow-hidden'
					>
						{/* 现在可以直接使用 fixed 布局，内容不会随着 parent 的 scale 变动 */}
						<div className='fixed top-1/2 left-1/2 z-20 flex h-fit w-full -translate-x-1/2 -translate-y-2/3 flex-col items-center justify-center'>
							<ScrollRevealText
								text='The product'
								scrollYProgress={act1Progress}
								range={[0.25, 0.65]}
								className='text-text-primary text-center text-2xl font-medium uppercase'
							/>
							{lines.map((line, i) => (
								<ScrollRevealText
									key={i}
									text={line.text}
									scrollYProgress={act1Progress}
									range={line.range}
									className='text-text-primary text-center text-3xl leading-9 font-medium sm:text-4xl sm:leading-12'
								/>
							))}
						</div>
					</motion.div>
				</div>
				{/* lemon deco */}
				<div className='pointer-events-none fixed inset-0 z-20 mx-auto w-full max-w-360'>
					<motion.img
						src='/images/product-deco-lime.avif'
						alt='deco'
						className='absolute -right-15 -bottom-15 z-20 scale-75 sm:w-120 sm:scale-100 lg:right-0 lg:bottom-0'
						style={{ scale: scaleImgFinal }}
					/>
				</div>
			</div>

			<motion.div
				ref={container2Ref}
				style={{ scale: shrinkScale, borderRadius: shrinkRadius, y: shrinkYBgYellow }}
				className='bg-yellow-150 relative h-[110vh] w-full max-w-[inherit]'
			/>
			{/* ── 第二幕：蓝色背景从右下角扩散 ── */}
			<motion.div
				style={{ clipPath, scale: shrinkScale, borderRadius: shrinkRadius, y: shrinkY }}
				className='absolute inset-0 z-10 bg-blue-800'
			/>
			{/* 第二幕内容，在蓝色背景覆盖后出现 */}
			<motion.div
				style={{ scale: shrinkScaleText, borderRadius: shrinkRadius, y: shrinkYText }}
				className='fixed top-1/2 left-1/2 z-20 flex h-fit w-full -translate-x-1/2 -translate-y-2/3 flex-col items-center justify-center'
			>
				<ScrollRevealText
					text='Mission'
					scrollYProgress={act2Progress}
					range={[0.05, 0.2]}
					className='text-center text-2xl font-medium text-white uppercase'
				/>
				{secondLines.map((line, i) => (
					<ScrollRevealText
						key={i}
						text={line.text}
						scrollYProgress={act2Progress}
						range={line.range}
						className='text-center text-3xl leading-9 font-medium text-white sm:text-4xl sm:leading-12'
					/>
				))}
			</motion.div>

			{/* text deco */}
			<motion.div
				style={{
					scale: shrinkScaleText,
					borderRadius: shrinkRadius,
					y: shrinkYDeco,
				}}
				className='pointer-events-none fixed inset-0 z-20 mx-auto w-full max-w-360'
			>
				<motion.img
					src='/images/let-drink-harmless-white.svg'
					alt='deco'
					className='absolute right-10 bottom-10 z-20 w-75 scale-80 sm:w-90 md:scale-90'
					style={{ y: textDecoImg }}
				/>
			</motion.div>
		</>
	);
};
