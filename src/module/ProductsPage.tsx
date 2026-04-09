/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BOTTLE_PRODUCTS_DATA, CANS_PRODUCTS_DATA } from 'src/constants/productsData';
import { ProductsCard } from 'src/module/components/ProductsCard';
import { Modal } from 'src/shared/Modal';
import { cn } from 'src/utils/cn';
import { useSwipeScroll } from 'src/utils/useSwipeScroll';

export const ProductsPage = () => {
	const [selectedType, setSelectedType] = useState<'cans' | 'bottles'>('cans');
	const [openDetailsModal, setOpenDetailsModal] = useState<string | null>(null);

	const { containerRef, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
		useSwipeScroll<HTMLDivElement>();

	const products =
		selectedType === 'cans'
			? Object.values(CANS_PRODUCTS_DATA)
			: Object.values(BOTTLE_PRODUCTS_DATA);

	return (
		<section className='relative mt-24 flex h-full w-full flex-col overflow-hidden p-6'>
			<div className='mb-14 flex w-full flex-col justify-between sm:flex-row sm:items-center'>
				<p className='text-text-primary text-4xl font-semibold uppercase sm:text-6xl'>Products</p>
				<div className='mt-4 flex gap-x-4 sm:mt-0'>
					<button
						type='button'
						className={cn(
							'text-text-primary border-button-bg-primary h-10 cursor-pointer rounded-md border border-solid px-4 uppercase',
							selectedType === 'cans' && 'bg-button-bg-primary text-text-secondary'
						)}
						onClick={() => setSelectedType('cans')}
					>
						Cans
					</button>

					<button
						type='button'
						className={cn(
							'text-text-primary border-button-bg-primary h-10 cursor-pointer rounded-md border border-solid px-4 uppercase',
							selectedType === 'bottles' && 'bg-button-bg-primary text-text-secondary'
						)}
						onClick={() => setSelectedType('bottles')}
					>
						Bottles
					</button>
				</div>
			</div>

			{/* cans */}
			<div
				className='no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 lg:grid lg:grid-cols-3 lg:gap-3 lg:pb-0'
				ref={containerRef}
				onMouseDownCapture={onMouseDown}
				onMouseMoveCapture={onMouseMove}
				onMouseUpCapture={onMouseUp}
				onMouseLeave={onMouseLeave}
			>
				{products.map((product) => (
					<ProductsCard
						key={product.id}
						product={product}
						onClick={() => setOpenDetailsModal(product.id)}
					/>
				))}
			</div>
			{createPortal(
				<Modal
					opened={Boolean(openDetailsModal)}
					onClose={() => {
						setOpenDetailsModal(null);
					}}
				>
					<img
						src={products.filter((p) => p.id === openDetailsModal)[0]?.detailsImg}
						alt={openDetailsModal || ''}
						className='rounded-[2%_2%_5%_40%/25%_16%_28%_1%]'
					/>
				</Modal>,
				document.body
			)}
		</section>
	);
};
