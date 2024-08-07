import React from "react";

const WithWrapCameback = (Component) =>{

  class WrapCameback extends React.Component {

    render() {
    return (
      <Component
        {...this.props}
      />
    );
  }
}
return WrapCameback;

}
export default (WithWrapCameback);