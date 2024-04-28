const auth = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/layouts/Auth.vue'),
        children: [
            {
                path: 'login',
                name: 'auth-login',
                component: () => import('@/pages/Auth/Login.vue')
            },
            {
                path: 'signup',
                name: 'auth-signup',
                component: () => import('@/pages/Auth/Register.vue')
            }
        ]
    }
]

export default auth
