import { DescriptionPage } from 'src/module/DescriptionPage';
import { HomeProductsPage } from 'src/module/HomeProductsPage';
import { MarqueesSection } from 'src/module/MarqueesSection';
import { ProductsPage } from 'src/module/ProductsPage';

export const HomePage = () => {
	return (
		<div className='flex h-fit w-full flex-col overflow-y-scroll'>
			<HomeProductsPage />
			<ProductsPage />
			<MarqueesSection />
			<DescriptionPage />
		</div>
	);
};
