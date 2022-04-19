const getMenuFrontEnd = (role = 'USER_ROLE') => {
	const menu = [
		{
			title: 'Dashboard',
			icon: 'mdi mdi-gauge',
			submenu: [
				{
					title: 'Principal',
					path: '/',
				},
				{
					title: 'ProgressBar',
					path: 'progress',
				},
				{
					title: 'Graficas',
					path: 'grafica1',
				},
			],
		},
		{
			title: 'Mantenimiento',
			icon: 'mdi mdi-folder-lock-open',
			submenu: [
				// {
				// 	title: 'Usuarios',
				// 	path: 'usuarios',
				// },
				{
					title: 'Medicos',
					path: 'medicos',
				},
				{
					title: 'Hospitales',
					path: 'hospitales',
				},
			],
		},
	];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({
            	title: 'Usuarios',
            	path: 'usuarios',
            });
    }

	return menu;
};

module.exports = {
	getMenuFrontEnd,
};
