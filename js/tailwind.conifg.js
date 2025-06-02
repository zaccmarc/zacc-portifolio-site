tailwind.config = {
    theme: {
        extend: {
            colors: {
                gray: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#eeeeee',
                    300: '#e0e0e0',
                    400: '#bdbdbd',
                    500: '#9e9e9e',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                },
            },
            fontFamily: {
                'sans': [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'San Francisco',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'sans-serif'
                ],
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-in-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    variants: {
        extend: {
            opacity: ['group-hover'],
            transform: ['group-hover'],
            scale: ['group-hover'],
            translate: ['group-hover'],
        },
    },
};