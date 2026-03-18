import 'src/App.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { RootLayout } from 'src/layouts/RootLayout';
import { NotFoundPage } from 'src/layouts/NotFoundPage';
import { HomePage } from 'src/module/HomePage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<NotFoundPage />}>
			<Route path='/' element={<RootLayout />}>
				<Route path='/' element={<HomePage />} />
			</Route>
		</Route>
	),
	{
		future: { v7_normalizeFormMethod: true },
	}
);

export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
