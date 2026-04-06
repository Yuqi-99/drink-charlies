import { MdOutlineCameraAlt } from 'react-icons/md';
import DrinkCharliesLogo from 'src/assets/drink-charlies-logo.svg?react';
import { useMediaQuery } from 'src/utils/useMediaQuery';
// import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_DATA } from 'src/constants/navigationData';
import { AnimatePresence, motion, type Variants } from 'motion/react';

export const Header = () => {
	const navigate = useNavigate();
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [openMobileMenu, setOpenMobileMenu] = useState(false);
	// const [selectedMenu, setSelectedMenu] = useState(0);

	// insta button animation
	const bgVariants = {
		rest: { scale: 0, opacity: 0 },
		hover: {
			scale: 1,
			opacity: 1,
			// transition: { type: 'spring', stiffness: 400, damping: 20 },
		},
	};

	// logo animation
	const logoVariants: Variants = {
		rest: {
			rotate: 0,
			skewX: 0,
			skewY: 0,
			scaleY: 1,
			transition: { type: 'spring', stiffness: 300, damping: 12 },
		},
		hover: {
			rotate: [0, -12, 6, -4, 2, -1, 0], // 右上高左下低 → 反弹
			skewX: [0, -12, 3, -6, 1, 0, 0], // 斜切强调跷跷板感
			scaleY: [1, 0.92, 1.05, 0.97, 1.02, 0.99, 1], // 轻微压缩弹回
			transition: {
				duration: 0.7,
				times: [0, 0.15, 0.35, 0.5, 0.65, 0.82, 1],
				ease: 'easeOut',
			},
		},
	};

	// where to buy button animation
	const navItemVariants: Variants = {
		rest: {},
		hover: {},
	};

	const defaultTextVariants: Variants = {
		rest: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
		hover: { y: '-100%', opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
	};

	const hoverTextVariants: Variants = {
		rest: { y: '100%', opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
		hover: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
	};

	// mobile menu icon variants
	const menuVariants: Variants = {
		closed: {
			backgroundColor: '#ffffff',
			transition: { duration: 0.3 },
		},
		open: {
			backgroundColor: '#22546e', // var(--color-blue-800)
			transition: { duration: 0.3 },
		},
	};

	const lineTopVariants: Variants = {
		closed: {
			rotate: 0,
			top: 11,
			backgroundColor: '#22546e',
			transition: { duration: 0.3 },
		},
		open: {
			rotate: 45,
			top: 17, // Center of 36px is 18, so 17-19 is the 2px line
			backgroundColor: '#ffffff',
			transition: { duration: 0.3 },
		},
	};

	const lineMiddleVariants: Variants = {
		closed: {
			opacity: 1,
			scaleX: 1,
			backgroundColor: '#22546e',
			transition: { duration: 0.2 },
		},
		open: {
			opacity: 0,
			scaleX: 0,
			backgroundColor: '#ffffff',
			transition: { duration: 0.2 },
		},
	};

	const lineBottomVariants: Variants = {
		closed: {
			rotate: 0,
			bottom: 11,
			backgroundColor: '#22546e',
			transition: { duration: 0.3 },
		},
		open: {
			rotate: -45,
			bottom: 17,
			backgroundColor: '#ffffff',
			transition: { duration: 0.3 },
		},
	};

	// mobile menu modal variants
	const menuModalVariants: Variants = {
		closed: {
			y: '-100%',
			opacity: 1,
			transition: { duration: 0.5 },
		},
		open: {
			y: 0,
			opacity: 1,
			transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
		},
		exit: {
			y: '-100%',
			opacity: 1,
			transition: { duration: 0.5 },
		},
	};

	return (
		<>
			<div className='fixed top-10 z-30 flex w-full max-w-[inherit] flex-col items-stretch justify-between px-10'>
				<div className='flex w-full items-start justify-between'>
					<motion.a
						target='_blank'
						href='https://www.instagram.com/drinkcharlies?igsh=aWprZ2pmNTdndWUw'
						className='border-button-bg-primary relative z-10 flex size-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-solid'
						// 取特定的名字 上面的animation就可以用这个名字来进行
						initial='rest'
						whileHover='hover'
						whileTap='tap'
					>
						{/* 从中间 pop 出来的背景层 */}
						<motion.span
							className='absolute inset-0 rounded-full bg-blue-300'
							variants={bgVariants}
						/>

						{/* 图标在背景层上方 */}
						<MdOutlineCameraAlt className='text-button-bg-primary z-20 size-6 min-w-6' />
					</motion.a>

					<motion.div
						className='cursor-pointer'
						variants={logoVariants}
						initial='rest'
						whileHover='hover'
						whileTap={{ y: 2, rotate: 2, scale: 0.96 }} // 点击时轻压下去
						onClickCapture={() => navigate('/')}
					>
						<DrinkCharliesLogo className='w-36 min-w-36' />
					</motion.div>

					{isMobile ? (
						<motion.div
							className='relative flex size-9 min-w-8 cursor-pointer items-center justify-start rounded-full p-2'
							initial='closed'
							animate={openMobileMenu ? 'open' : 'closed'}
							variants={menuVariants}
							whileTap={{ scale: 0.95 }}
							onClickCapture={() => setOpenMobileMenu(!openMobileMenu)}
						>
							<motion.span className='line line-top' variants={lineTopVariants} />
							<motion.span className='line line-middle' variants={lineMiddleVariants} />
							<motion.span className='line line-bottom' variants={lineBottomVariants} />
						</motion.div>
					) : (
						<motion.li
							variants={navItemVariants}
							// 取特定的名字 上面的animation就可以用这个名字来进行
							initial='rest'
							whileHover='hover' // ← 父层触发，子层自动响应
							className='bg-grey-100 text-text-primary relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-2 text-lg font-medium uppercase'
						>
							{/* 写两个同样的字做切换效果 */}
							<motion.span variants={defaultTextVariants} style={{ display: 'block' }}>
								Where to Buy
							</motion.span>

							<motion.span
								variants={hoverTextVariants}
								className='absolute flex items-center justify-center'
							>
								Where to Buy
							</motion.span>
						</motion.li>
					)}
				</div>
			</div>

			<AnimatePresence>
				{openMobileMenu && (
					<motion.div
						initial='closed'
						animate='open'
						exit='exit'
						variants={menuModalVariants}
						className='fixed z-20 h-full w-full p-2'
					>
						<div className='flex h-full w-full flex-col items-center justify-center gap-y-8 rounded-[2%_2%_5%_40%/25%_16%_28%_1%] bg-white'>
							{NAVIGATION_DATA?.map((item) => (
								<p
									className='text-text-primary cursor-pointer text-5xl font-medium uppercase'
									key={item.id}
								>
									{item.name}
								</p>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
