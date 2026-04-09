import TextUnderlineDeco from 'src/assets/text-underline.svg?react';
import DecoIcon from 'src/assets/story-2-deco.svg?react';
import { motion } from 'motion/react';

export const StoryPage2 = () => {
	return (
		<div className='relative flex flex-col-reverse items-start justify-between px-9 md:h-[calc(100vh-15rem)] md:flex-row-reverse md:px-18 lg:flex-row'>
			<motion.div className='mt-14 flex flex-col justify-center md:mt-0 md:w-1/2'>
				<p className='text-text-primary ml-12 md:ml-4 text-2xl font-medium uppercase'>
					<DecoIcon className='absolute left-5 flex w-12 md:hidden' />
					Meet Charlie
				</p>
				<p className='text-text-primary mt-7 text-2xl leading-10 font-medium italic md:text-3xl md:leading-12 lg:w-4/5'>
					<DecoIcon className='absolute left-5 hidden w-12 md:flex' />
					Charlie cares about healthy people on a healthy planet. Inspiring others to do the same.
					Charlie is transparent about what is in the can: SPARKLING WATER with a suqeeze of{' '}
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
					className='bg-button-bg-primary mt-4 w-fit rounded-sm px-4 py-2 text-white uppercase'
				>
					Where to buy
				</button>
			</motion.div>
			<div className='flex w-full -rotate-6 flex-col items-center justify-center overflow-hidden rounded-[100%_0%_100%_0%/100%_10%_100%_59%] bg-yellow-100 md:w-1/2 md:max-w-90 lg:max-w-130'>
				<img src='/images/our-story-deco-2.jpg' />
			</div>
		</div>
	);
};
