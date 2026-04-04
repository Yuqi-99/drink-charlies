import { motion, useTransform, type MotionValue } from 'framer-motion';

interface ScrollRevealTextProps {
	text: string;
	scrollYProgress: MotionValue<number>;
	range: number[]; // [开始触发, 结束触发]
	className?: string;
}

export const ScrollRevealText = ({
	text,
	scrollYProgress,
	range,
	className,
}: ScrollRevealTextProps) => {
	const y = useTransform(scrollYProgress, range, ['100%', '0%']);

	return (
		<div
			style={{
				overflow: 'hidden', // ← 每行独立裁切框
				display: 'block',
				width: '100%',
			}}
		>
			<motion.p
				style={{
					y,
					margin: 0, // ← 清掉默认 margin，否则裁切框会有多余空间
				}}
				className={className}
			>
				{text}
			</motion.p>
		</div>
	);
};
