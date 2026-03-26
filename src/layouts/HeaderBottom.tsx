import { motion } from 'framer-motion';
import { useState } from 'react';
import { NAVIGATION_DATA } from 'src/constants/navigationData';
import { useMediaQuery } from 'src/utils/useMediaQuery';

export const HeaderBottom = () => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [hasEntered, setHasEntered] = useState(false); // 追踪是否已在 nav 内

	if (isMobile) return null;

	const handleMouseEnter = (id: string) => {
		setHoveredId(id);
		// setHasEntered(true);
		if (!hasEntered) {
			setTimeout(() => setHasEntered(true), 300);
		}
	};

	const handleMouseLeave = () => {
		setHoveredId(null);
		setHasEntered(false); // 离开整个 nav 时重置
	};

	return (
		<div className='absolute flex h-full w-full max-w-[inherit] flex-col justify-end px-10 pb-16'>
			<div className='z-10 flex w-full items-center justify-center'>
				<div
					className='bg-grey-50/50 flex w-full max-w-100 items-center justify-between rounded-[5%_2%_4%_10%/10%_10%_50%_2%] p-2 backdrop-blur'
					// 整个容器监听 mouseleave，避免在 item 之间切换时触发 leave
					onMouseLeave={handleMouseLeave}
				>
					{NAVIGATION_DATA?.map((item) => (
						<div
							key={item.id}
							className='relative cursor-pointer'
							onMouseEnter={() => handleMouseEnter(item.id)}
						>
							{hoveredId === item.id && (
								<motion.span
									layoutId='nav-bg' // ← 重新开启，这是关键
									className='absolute inset-0 z-0 rounded-md bg-blue-300'
									// 第一次进入：从左展开
									// 之后切换 item：layoutId 接管，直接平移，不走这个 initial/animate
									initial={
										hasEntered
											? { scaleX: 1 } // 已在 nav 内：直接全宽，让 layout 动画做位移
											: {
													scaleX: 0,
													transformOrigin: 'left',
													transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
												} // 首次进入：从左展开
									}
									animate={{
										scaleX: 1,
										transformOrigin: 'left',
										transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
									}}
									exit={{
										scaleX: 0,
									}}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									style={{ transformOrigin: 'left' }}
								/>
							)}

							<p className='text-text-primary relative z-10 h-full px-2 py-4 text-xl font-medium text-nowrap uppercase'>
								{item.name}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
