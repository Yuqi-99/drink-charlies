import { motion, type Variants } from 'framer-motion';

type TProductsCard = {
	product: {
		id: string;
		displayName: string;
		bgColor: string;
		productImage: string;
		bgImage: string;
		detailsImg: string;
	};
	onClick: () => void;
};

export const ProductsCard = ({ product, onClick }: TProductsCard) => {
	const infoButtonVariants: Variants = {
		rest: {
			scaleX: 1,
			scaleY: 1,
		},
		hover: {
			scaleX: [1, 1.1, 1],
			scaleY: [1, 0.8, 1],
			transition: {
				duration: 0.5,
			},
		},
	};

	const bottleVariants: Variants = {
		rest: {
			rotate: 0,
		},
		hover: {
			rotate: 10,
			transition: {
				duration: 0.2,
			},
		},
	};

	const bgImgVariants: Variants = {
		rest: {
			scale: 1,
		},
		hover: {
			scale: 1.05,
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<motion.div
			key={product.id}
			className={`${product.bgColor} relative flex min-w-78 cursor-pointer snap-center flex-col items-center justify-center overflow-hidden rounded-[4%_4%_5%_4%/15%_16%_5%_4%] p-10 lg:min-w-full`}
			initial='rest'
			whileHover='hover'
			onClick={() => onClick()}
		>
			<motion.div
				className='hover:bg-button-bg-primary text-text-primary absolute top-5 right-5 z-10 flex size-12 items-center justify-center rounded-full bg-white hover:text-white'
				variants={infoButtonVariants}
				initial='rest'
				whileHover='hover'
			>
				<p className='font-mono font-semibold'>i</p>
			</motion.div>

			<motion.img
				src={product.productImage}
				alt={product.displayName}
				className='z-10 h-76 lg:h-90'
				variants={bottleVariants}
			/>
			<motion.img
				src={product.bgImage}
				alt={product.displayName}
				className='absolute inset-0 bottom-0 h-full w-full object-cover'
				variants={bgImgVariants}
			/>
			<motion.img
				src='/images/products/products-bg-deco.png'
				alt='products-bg-deco'
				className='absolute bottom-0 h-fit object-contain'
				variants={bgImgVariants}
			/>

			<div className='z-10 flex flex-col items-center justify-center pt-8'>
				<p className='text-text-primary pb-3 text-2xl font-medium uppercase'>
					{product.displayName}
				</p>
				<p className='text-white uppercase'>0 sugar</p>
			</div>
		</motion.div>
	);
};
