import { MdOutlineCameraAlt } from 'react-icons/md';
import DrinkCharliesLogo from 'src/assets/drink-charlies-logo.svg?react';
import { motion } from 'framer-motion';

export const Header = () => {
	const bgVariants = {
		rest: { scale: 0, opacity: 0 },
		hover: {
			scale: 1,
			opacity: 1,
			// transition: { type: 'spring', stiffness: 400, damping: 20 },
		},
	};

	return (
		<div className='absolute z-20 flex h-full w-full flex-col items-stretch justify-between px-10 pt-10'>
			<div className='flex w-full items-start justify-between'>
				<motion.a
					target='_blank'
					href='https://www.instagram.com/drinkcharlies?igsh=aWprZ2pmNTdndWUw'
					className='border-button-bg-primary relative flex size-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-solid'
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

				<DrinkCharliesLogo className='w-36 min-w-36' />

				<div className='bg-grey-100 flex items-center justify-center rounded-md px-4 py-2'>
					<p className='text-text-primary text-lg uppercase'>Where to Buy</p>
				</div>
			</div>
		</div>
	);
};
