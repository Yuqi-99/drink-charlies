import { HomeProductsPage } from 'src/module/HomeProductsPage';
import { ProductsPage } from 'src/module/ProductsPage';

export const HomePage = () => {
	return (
		<div className='flex w-full flex-col'>
			<HomeProductsPage />
			<ProductsPage />
		</div>
	);
};
