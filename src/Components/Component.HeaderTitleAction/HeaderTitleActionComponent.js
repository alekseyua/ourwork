import React, { Component } from 'react'
import Label from '../../View/Label/Label'

export default class HeaderTitleActionComponent extends Component {
  render() {
    return (
      <Label
        style={{
          fontSize: this.props?.fontSize ?? 16,
          fontWeight: this.props?.fontWeight ?? 700,
          justifyContent: 'space-between',
          alignItems: 'baseline',
          filter: `blur(var(--filter-blur))`
        }}
      >
        {
          this.props.list.map( (item, i) => <React.Fragment key={i}>{item}</React.Fragment>)
        }        
      </Label>
    )
  }
}
