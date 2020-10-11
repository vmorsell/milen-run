import { Text, Link } from '@chakra-ui/core'

export default {
  paragraph: (props) => <Text my={4}>{props.children}</Text>,
  link: Link,
}
