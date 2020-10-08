import { extendTheme } from '@chakra-ui/core'

export default extendTheme({
  fontSizes: {
    xs: '16px',
    sm: '18px',
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
        fontSize: '20px',
      },
    },
  },
})
