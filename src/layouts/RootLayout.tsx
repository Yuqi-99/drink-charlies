import { Outlet } from 'react-router-dom';
import { useBubbleCursor } from 'src/hooks/useBubbleCursor';
import { Header } from 'src/layouts/Header';
import { HeaderBottom } from 'src/layouts/HeaderBottom';

export const RootLayout = () => {
	useBubbleCursor({
		maxSize: 10,
		density: 10, // 1=很稀疏，10=很密
		rise: 100,
		colors: ['rgba(158, 211, 251, 0.9)'],
	});

	return (
		<main>
			{/* <LoadingScreen /> */}
			{/* <div className='relative flex h-full w-full max-w-360 flex-col items-center justify-center'> */}
			<div className='relative mx-auto flex h-full w-full max-w-360 justify-center'>
				<Header />
				<Outlet />
				<HeaderBottom />
			</div>
		</main>
	);
};
