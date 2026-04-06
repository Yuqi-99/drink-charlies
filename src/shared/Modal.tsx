import React from 'react';
import { ModalOverlay } from 'src/shared/ModalOverlay';
import { cn } from 'src/utils/cn';
import { IoClose } from 'react-icons/io5';
import { AnimatePresence, type Variants, motion } from 'motion/react';

type TModal = {
	opened: boolean;
	children: React.ReactNode;
	className?: string;
	blur?: boolean;
	onClose: () => void;
};

export const Modal = ({ children, opened, className, blur = false, onClose }: TModal) => {
	const closeIconVariants: Variants = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.3,
			},
		},
	};
	const modalVariants: Variants = {
		initial: {
			opacity: 0,
			scale: 0.5,
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			scale: 0,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					className='z-modal fixed flex h-full w-full max-w-[inherit] min-w-[inherit]'
					initial='initial'
					animate='animate'
					exit='exit'
				>
					<ModalOverlay opened={opened} onClose={onClose} blur={blur} />
					<motion.div className='z-modal-content fixed top-1/2 left-1/2 flex h-auto max-h-[90vh] w-screen max-w-[inherit] min-w-[inherit] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'>
						<motion.div variants={closeIconVariants}>
							<IoClose
								className='z-modal-content bg-button-bg-primary fixed -top-64 right-6 size-10 min-w-10 cursor-pointer rounded-full p-2 text-white lg:-top-96 lg:right-24 lg:size-12 lg:min-w-12'
								onClick={onClose}
							/>
						</motion.div>
						<motion.div
							className={cn(
								'z-modal-content absolute flex h-auto max-h-[90vh] w-[90%] flex-col items-center justify-center rounded-[2%_2%_5%_20%/25%_16%_18%_1%] bg-yellow-50 text-white lg:w-210',
								className
							)}
							variants={modalVariants}
						>
							<div className='flex w-full flex-col overflow-y-auto p-2'>{children}</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
