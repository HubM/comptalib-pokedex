<script>
import { filterClassProps, mapPropsToClasses } from '~/helpers/grid'

export default {
  name: 'FlexItem',
  functional: true,
  render(h, { props, listeners, children, data }) {
    const classProps = filterClassProps(props)

    const tagProp = props.tag || 'div'
    return h(
      tagProp,
      {
        attrs: {
          class: `${mapPropsToClasses(classProps)} flex-item ${
            data.staticClass || ''
          }`,
        },
        on: listeners,
      },
      children
    )
  },
}
</script>
