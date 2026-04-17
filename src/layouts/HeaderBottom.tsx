import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { NAVIGATION_DATA } from 'src/constants/navigationData';
import { cn } from 'src/utils/cn';
import { useMediaQuery } from 'src/utils/useMediaQuery';

export const HeaderBottom = () => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	// 当前激活的 Section
	const [activeId, setActiveId] = useState<string | null>(null);
	const [hasEntered, setHasEntered] = useState(false);

	useEffect(() => {
		const observerOptions = {
			root: null,
			// section进入屏幕中间区域时才触发
			rootMargin: '-40% 0px -40% 0px',
			threshold: 0,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id);
				} else {
					setActiveId(null);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);
		NAVIGATION_DATA.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	if (isMobile) return null;

	// hover 的不是 active 项时，才显示浅色 hover 背景
	const showHoverBg = hoveredId !== null && hoveredId !== activeId;

	return (
		<div className='fixed bottom-20 z-50 flex w-full max-w-[inherit] items-center justify-center'>
			<div
				className='bg-grey-50/50 flex w-full max-w-100 items-center justify-between rounded-[5%_2%_4%_10%/10%_10%_50%_2%] p-2 backdrop-blur'
				onMouseLeave={() => {
					setHoveredId(null);
					setHasEntered(false);
				}}
			>
				{NAVIGATION_DATA?.map((item) => {
					const isActiveSection = activeId === item.id;
					const isHovered = hoveredId === item.id;

					return (
						<div
							key={item.id}
							className='relative cursor-pointer'
							onMouseEnter={() => {
								setHoveredId(item.id);
								if (!hasEntered) setTimeout(() => setHasEntered(true), 300);
							}}
							onClick={() => {
								document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							{/* active section 深色背景：始终存在，不受 hover 影响 */}
							{isActiveSection && (
								<motion.span
									layoutId='nav-active-bg'
									className='absolute inset-0 z-0 rounded-md bg-blue-800'
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									style={{ transformOrigin: 'left' }}
								/>
							)}

							{/* hover 浅色背景：只在 hover 非 active 项时出现，会在项目间滑动 */}
							{showHoverBg && isHovered && (
								<motion.span
									layoutId='nav-hover-bg'
									className='absolute inset-0 z-0 rounded-md bg-blue-300'
									initial={hasEntered ? false : { scaleX: 0 }}
									animate={{ scaleX: 1 }}
									exit={{ scaleX: 0 }}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									style={{ transformOrigin: 'left' }}
								/>
							)}

							<p
								className={cn(
									'relative z-10 h-full px-2 py-4 text-xl font-medium uppercase transition-colors duration-300',
									// active section 文字始终白色，不因 hover 改变
									isActiveSection ? 'text-white' : 'text-text-primary'
								)}
							>
								{item.name}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
