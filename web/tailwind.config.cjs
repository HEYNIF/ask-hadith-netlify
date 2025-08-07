/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#F9FAFB',
				primary: {
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#2563EB', // Sky Blue
					600: '#1D4ED8',
					700: '#1E40AF',
					800: '#1E3A8A',
					900: '#1E3A8A',
				},
				secondary: {
					50: '#ECFDF5',
					100: '#D1FAE5',
					200: '#A7F3D0',
					300: '#6EE7B7',
					400: '#34D399',
					500: '#10B981', // Emerald Green
					600: '#059669',
					700: '#047857',
					800: '#065F46',
					900: '#064E3B',
				},
				surface: '#FFFFFF',
				text: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827', // Main text color
				},
			},
			fontFamily: {
				english: ['Inter', 'Poppins', 'Lato', 'sans-serif'],
				arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
			},
			fontSize: {
				reading: '1.05rem',
			},
		},
		fontFamily: {
			sans: ['Inter', 'Poppins', 'Lato', 'sans-serif'],
			serif: ['Amiri', 'Noto Naskh Arabic', 'serif'],
			english: ['Inter', 'Poppins', 'Lato', 'sans-serif'],
			arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
		},
		fontSize: {
			xs: ['10px', '12px'],
			sm: ['12px', '16px'],
			base: ['14px', '20px'],
			lg: ['16px', '24px'],
			xl: ['18px', '28px'],
			'2xl': ['20px', '32px'],
			'3xl': ['24px', '36px'],
			'4xl': ['30px', '42px'],
			'5xl': ['36px', '48px'],
			'6xl': ['48px', '56px'],
			'7xl': ['64px', '72px'],
			'8xl': ['72px', '80px'],
			'9xl': ['96px', '104px'],
		},
	},
	plugins: [],
	darkMode: 'media',
};
