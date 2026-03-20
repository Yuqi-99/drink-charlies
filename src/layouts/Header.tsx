import { MdOutlineCameraAlt } from 'react-icons/md';
import DrinkCharliesLogo from 'src/assets/drink-charlies-logo.svg?react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'src/utils/useMediaQuery';
// import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { useState } from 'react';

export const Header = () => {
	const isMobile = useMediaQuery('(max-width: 1023px)');
	const [openMobileMenu, setOpenMobileMenu] = useState(false);
	const bgVariants = {
		rest: { scale: 0, opacity: 0 },
		hover: {
			scale: 1,
			opacity: 1,
			// transition: { type: 'spring', stiffness: 400, damping: 20 },
		},
	};

	console.log(openMobileMenu, 'openMobileMenu');

	return (
		<div className='absolute flex h-full w-full max-w-[inherit] flex-col items-stretch justify-between px-10 pt-10'>
			<div className='flex w-full items-start justify-between z-20'>
				{isMobile ? (
					// add for spacing
					<div className='' />
				) : (
					<motion.a
						target='_blank'
						href='https://www.instagram.com/drinkcharlies?igsh=aWprZ2pmNTdndWUw'
						className='border-button-bg-primary relative z-10 flex size-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-solid'
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
				)}

				<DrinkCharliesLogo className='w-36 min-w-36' />

				{isMobile ? (
					<div
						className='relative flex size-9 min-w-8 cursor-pointer items-center justify-start rounded-full bg-white p-2'
						onClickCapture={() => setOpenMobileMenu(true)}
					>
						<span className='line line-top' />
						<span className='line line-middle' />
						<span className='line line-bottom' />
					</div>
				) : (
					<div className='bg-grey-100 flex items-center justify-center rounded-md px-4 py-2'>
						<p className='text-text-primary text-lg uppercase'>Where to Buy</p>
					</div>
				)}
			</div>
		</div>
	);
};
