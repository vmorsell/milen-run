import { extendTheme } from '@chakra-ui/core'

export default extendTheme({
  fontSizes: {
    xs: '13px',
    sm: '16px',
    md: '20px',
    lg: '22px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '36px',
    '4xl': '48px',
    '5xl': '64px',
    '6xl': '70px',
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: 'md',
      },
      sizes: {
        xs: {
          fontSize: 'xs',
        },
        sm: {
          fontSize: 'sm',
        },
        md: {
          fontSize: 'md',
        },
        lg: {
          fontSize: 'lg',
        },
        xl: {
          fontSize: 'xl',
        },
      },
    },
  },
})
