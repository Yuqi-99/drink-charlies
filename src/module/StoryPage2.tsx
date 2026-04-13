import { motion } from 'motion/react';
import DecoIcon from 'src/assets/story-2-deco.svg?react';
import TextUnderlineDeco from 'src/assets/text-underline.svg?react';

export const StoryPage2 = () => {
	return (
		<div className='relative z-10 flex min-h-screen flex-col-reverse items-center justify-center gap-8 bg-yellow-50 px-6 py-12 sm:px-9 md:min-h-[calc(100vh-15rem)] md:flex-row-reverse md:items-start md:justify-between md:px-18 lg:flex-row'>
			<motion.div className='mt-14 flex w-full flex-col justify-center md:mt-0 md:w-1/2'>
				<p className='text-text-primary relative mb-2 pl-14 text-xl font-medium uppercase sm:text-2xl md:pl-4'>
					<DecoIcon className='absolute left-0 flex w-12 sm:left-5 md:hidden' />
					Meet Charlie
				</p>
				<p className='text-text-primary mt-4 text-xl leading-9 font-medium italic sm:text-2xl sm:leading-10 md:mt-7 md:text-3xl md:leading-12 lg:w-4/5'>
					<DecoIcon className='absolute left-5 hidden w-12 md:flex' />
					Charlie cares about healthy people on a healthy planet. Inspiring others to do the same.
					Charlie is transparent about what is in the can: SPARKLING WATER with a squeeze of{' '}
					<span className='relative inline-block w-fit'>
						organic
						<TextUnderlineDeco
							className='absolute bottom-0 left-0 w-full'
							preserveAspectRatio='none'
						/>
					</span>{' '}
					fruit.
				</p>
				<button
					type='button'
					className='bg-button-bg-primary mt-6 w-fit rounded-sm px-4 py-2 text-sm text-white uppercase sm:text-base'
				>
					Where to buy
				</button>
			</motion.div>

			<div className='flex min-h-64 w-full max-w-xs -rotate-6 flex-col items-center justify-center overflow-hidden rounded-[100%_0%_100%_0%/100%_10%_100%_59%] bg-yellow-100 sm:min-h-80 sm:max-w-sm md:w-1/2 md:max-w-90 lg:max-w-130'>
				<img src='/images/our-story-deco-2.jpg' className='w-full object-cover' />
			</div>
		</div>
	);
};
