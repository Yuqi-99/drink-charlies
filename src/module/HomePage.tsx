import BringOnCharlies from 'src/assets/bring-on-charlies.svg?react';

export const HomePage = () => {
	return (
		<section className='flex h-full w-full flex-col items-center justify-center p-4'>
			<div className='bg-brand-purple relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2%_2%_5%_40%/25%_16%_28%_1%] p-6'>
				{/* home deco img */}
				<img
					src='/images/home-page-deco.png'
					alt='deco'
					className='absolute right-0 scale-[300%] sm:scale-150 sm:bottom-0 lg:scale-100'
				/>

				<BringOnCharlies className='max-w-155' />

				<video className='absolute h-full w-full lg:max-w-165' autoPlay loop muted playsInline>
					<source
						src='/video/cassis-video.mp4'
						type='video/mp4; codecs="hvc1"'
						className='h-full w-full'
					/>
					<source src='/video/cassis-video.webm' type='video/webm' className='h-full w-full' />
					Your browser does not support the video tag.
				</video>

				<div className='text-text-primary z-10 flex w-full items-start px-10'>
					<p className='text-2xl font-medium uppercase'>Taste</p>
					<p className='mr-3 text-2xl font-medium uppercase'>:</p>
					<div className='border-text-primary w-24 border-b-2 border-solid'>
						<p className='text-lg'>cassis</p>
					</div>
				</div>
			</div>
		</section>
	);
};
