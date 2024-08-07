import React from 'react'

export default function WithAccordion(Component) {
  class WrapAccordion extends React.Component {
    state = {
      listOpenDesc: [],
    }

    handlerOpen = even => {
      const elementAccordion = +even.target.getAttribute('data-desc');
      if (this.state.listOpenDesc.includes(+elementAccordion)) {
        this.setState(state => ({
          listOpenDesc: state.listOpenDesc.filter(el=> +el !== +elementAccordion)
        }))
      } else {
        this.setState(state => ({
          listOpenDesc: [...state.listOpenDesc, +elementAccordion]
        }))
      }
    }

    render() {
      return (
        <Component
          handlerOpen={this.handlerOpen}
          listOpenDesc={this.state.listOpenDesc}
          {...this.props}
        />
      )
    }
  }

  return WrapAccordion;
}
