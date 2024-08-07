import React, { Component } from 'react';
import WrapContainerAccordion from '../../View/Accordion/WrapContainerAccordion'
import ItemAccordionContainer from '../../View/Accordion/ItemAccordionContainer';
import ItemAccordionTitle from '../../View/Accordion/ItemAccordionTitle';
import ItemAccordionIcon from '../../View/Accordion/ItemAccordionIcon';
import ItemAccordionDescription from '../../View/Accordion/ItemAccordionDescription';
import ItemAccordionContainerTitle from '../../View/Accordion/ItemAccordionContainerTitle';
import Offset from '../../View/Offset';

class AccordionContainer extends Component {
  state = {
    listOpenDesc: [],
  }

  componentDidMount(){
    const listItems = this.props?.list;
    if (listItems && listItems?.length > 0) {
      console.log({ listItems });
      for(let i = 0; i < listItems.length; i++){
        if(listItems[i]?.isActive){
          this.setState( state => ({
            ...state,
            listOpenDesc: [i]
          }))
        }
      }
    }
  }
  handlerOpen = even => {
    const elementAccordion = +even.target.getAttribute('data_desc');
    if (this.state.listOpenDesc.includes(+elementAccordion)) {
      this.setState({
        listOpenDesc: []
        })
      this.props.onChange(elementAccordion, 'hide')
      } else {
        this.setState({
          listOpenDesc: [].concat(+elementAccordion)
          })
        this.props.onChange(elementAccordion, 'show')
    }
  }

  render() {
    console.log({p: this.state})
    return (
      <WrapContainerAccordion>
        {
          this.props.list.map((item, i) => {
            return (
              <ItemAccordionContainer
                key={i}
                data_desc={i}
                onClick={this.handlerOpen}
                style={{
                  ...(this.props?.styleItem ?? {}),
                  width: item?.isLittleBlock && !item?.isActive? 170 : '100%',

                  // paddingTop: this.state.listOpenDesc.includes(i)? 14 : 0,
                  // paddingBottom: this.state.listOpenDesc.includes(i)? 14 : 0,
                }}
              >
                <ItemAccordionContainerTitle>
                  <ItemAccordionTitle data_desc={i}>
                    {item.title}
                  </ItemAccordionTitle>
                  <ItemAccordionIcon
                    // isShow={this.state.isShowDescription}
                    data_desc={i}
                    isOpen={this.state.listOpenDesc.includes(i)}
                    image={item.icon}
                    styleItemIcon={{
                      ...(this.props?.styleItemIcon ?? {}),
                    }}
                    // accord={i}
                  />
                </ItemAccordionContainerTitle>
                <ItemAccordionDescription
                  // isOpen={+this.state.isShowDescription.accord === i}

                  isOpen={this.state.listOpenDesc.includes(i)}
                >
                  {item.description}
                </ItemAccordionDescription>
              </ItemAccordionContainer>
            );
          })
        }</WrapContainerAccordion>
    )
  }
}

export default AccordionContainer;