import { EnvironmentPage } from 'src/module/EnvironmentPage';
import { HomeProductsPage } from 'src/module/HomeProductsPage';
import { MarqueesSection } from 'src/module/MarqueesSection';
import { ProductsPage } from 'src/module/ProductsPage';
import { StoryPage } from 'src/module/StoryPage';
import { StoryPage2 } from 'src/module/StoryPage2';

export const HomePage = () => {
	return (
		<div className='flex h-fit w-full max-w-360 flex-col overflow-visible'>
			<HomeProductsPage />
			<ProductsPage />
			<MarqueesSection />
			<StoryPage />
			<StoryPage2 />
			<EnvironmentPage />
		</div>
	);
};
