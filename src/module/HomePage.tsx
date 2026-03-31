import { HomeProductsPage } from 'src/module/HomeProductsPage';
import { ProductsPage } from 'src/module/ProductsPage';

export const HomePage = () => {
	return (
		<div className='flex h-fit w-full flex-col overflow-y-scroll'>
			<HomeProductsPage />
			<ProductsPage />
		</div>
	);
};
