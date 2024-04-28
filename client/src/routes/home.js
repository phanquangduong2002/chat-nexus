const home = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/layouts/Home.vue'),
        children: [
            {
                path: '',
                name: 'home-chat',
                component: () => import('@/pages/Home/Chat.vue')
            }
        ]
    }
]

export default home
