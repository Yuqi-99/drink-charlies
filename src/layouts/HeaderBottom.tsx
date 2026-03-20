import { useMediaQuery } from 'src/utils/useMediaQuery';

export const HeaderBottom = () => {
	const isMobile = useMediaQuery('(max-width: 1023px)');

	if (isMobile) return null;

	return (
		<div className='absolute flex h-full w-full max-w-[inherit] flex-col justify-end px-10 pb-16'>
			<div className='z-10 flex w-full items-center justify-center'>
				<div className='bg-grey-50/50 text-text-primary flex w-full max-w-100 items-center justify-between rounded-[0%_2%_4%_0%/0%_10%_50%_0%] px-4 py-5 text-xl font-medium uppercase backdrop-blur'>
					<p>Products</p>
					<p>Our Story</p>
					<p>Faq</p>
					<p>Contact</p>
					<p>Store</p>
				</div>
			</div>
		</div>
	);
};
