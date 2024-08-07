import React, { PureComponent } from 'react';
import Pagination from '../../View/Pagination/Pagination';
import { connectStoreon } from 'storeon/react';
import { MAX_VIEW_ITEM_LAST_PAGE, DEFAULT_PAGE_SIZE } from '../../helpers/config';
import Offset from '../../View/Offset';
import { smoothTop } from '../../helpers/helpers';

class PaginationComponentAllPages extends PureComponent {

  state = {
    newListItems: [],
    currentPage: this.props?.currentPage,
    defaultPageSize: this.props?.defaultPageSize ?? DEFAULT_PAGE_SIZE
  }

  componentDidMount() {
    !!this.props.totalCount && this.renderNumerical();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (+this.props.currentPage !== +prevProps.currentPage || +this.props.totalCount !== +prevProps.totalCount) {
      this.renderNumerical()
    }
  }
  range = (current_page, total_items) => {// 4 | 5
    const maxPages = Math.ceil(total_items / (this.state.defaultPageSize)); // 2
    let length = maxPages;
    if (maxPages <= MAX_VIEW_ITEM_LAST_PAGE) {
    } else {
      if (maxPages - current_page >= MAX_VIEW_ITEM_LAST_PAGE) {
        length = MAX_VIEW_ITEM_LAST_PAGE
      } else {
        length = MAX_VIEW_ITEM_LAST_PAGE
      }
    }
         
    const range = new Array(length)
      .fill()
      .map((_, i) => i + current_page)
      .map((el, i) => {
        if(maxPages <= MAX_VIEW_ITEM_LAST_PAGE){
          if (current_page === 1) {
            return el;
          } 
          else if (current_page === 2) {
            return el - 1;
          }
          else if (current_page === 3) {
            return el - 2;
          }
          else if (current_page === 4) {
            return el - 3;
          }
          else if (current_page === 5) {
            return el - 4;
          }
          else if (current_page === 6) {
            return el - 5;
          }
          else if (current_page === 7) {
            return el - 6;
          }
        }else{
          if ((current_page === 1)) {return el;}
          else if ((current_page === 2)) {return el - 1;}
          else if (((maxPages - current_page) === 0)) {return el - 6;}
          else if (((maxPages - current_page) === 1)) {return el - 5;}
          if (current_page < 5) {
            return el - 2;
          }
          return el - 3;
        }
      })
    return range;
  }

  renderNumerical() {
    let arr = [];
    
    if (this.props?.totalCount <= MAX_VIEW_ITEM_LAST_PAGE) {
      arr = this.range(1, this.props.totalCount)
    } else {
      const countPage = Math.ceil(this.props.totalCount / (this.state.defaultPageSize)); //5
      const arrRangeBehaurePage = this.range(this.props.currentPage, this.props.totalCount);


      if( arrRangeBehaurePage.includes(1) || arrRangeBehaurePage.includes(2)  || arrRangeBehaurePage.includes(3) && arrRangeBehaurePage.length <= 3){
        arr = [...arrRangeBehaurePage]
      }else if( arrRangeBehaurePage.includes(1) || arrRangeBehaurePage.includes(2)){
        arr = [...arrRangeBehaurePage.slice(0,-2),'...', countPage]
      }else{
        if( arrRangeBehaurePage.includes(countPage - 1) || arrRangeBehaurePage.includes(countPage - 2)){
          arr = [ 1 ,'...',...arrRangeBehaurePage.slice(2)]
        }else{
          arr = [ 1 ,'...',...arrRangeBehaurePage.slice(2).slice(0,-2),'....', countPage,]
        }
      }
   }
    this.setState( state => ({
      ...state,
      newListItems: arr
    }))
  }

  changePagination = (even) => {
    let select = even.target.getAttribute('data-item');
    if (select === 'next') {
      select = +this.props.currentPage + 1
    }
    if (select === 'prev') {
      select = +this.props.currentPage - 1
    }
    this.setState({
      currentPage: +select
    })
    this.props?.onChangePagination && this.props.onChangePagination({
      page: select
    })
    smoothTop()
  }

  render() {
    if (this.props.totalCount > (this.state.defaultPageSize)) {
      if(!this.state.newListItems.length) return;
      return (
        <Pagination
          style={this.props?.style}
          totalCount={this.props?.totalCount ?? 1}
          isLoad={this.props?.isLoad}
          currentPage={this.props.currentPage ?? 1}
          newListItems={this.state.newListItems}
          changePagination={this.changePagination}
          defaultPageSize={this.state.defaultPageSize}
        />

      )
    }
    return <Offset mb={30} />

  }
}

export default connectStoreon(
  'tg',
  PaginationComponentAllPages
)