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
    defaultPageSize: DEFAULT_PAGE_SIZE
  }

  componentDidMount() {
    !!this.props.totalCount && this.renderNumerical()
    if(this.props?.defaultPageSize){
      this.setState(state=>({
        ...state,
        defaultPageSize: this.props?.defaultPageSize
      }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (+this.props.currentPage !== +prevProps.currentPage || +this.props.totalCount !== +prevProps.totalCount) {
      this.renderNumerical()
    }
  }
  range = (current_page, total_items) => {
    const maxPages = Math.ceil(total_items / this.state.defaultPageSize); // 2
    let length = maxPages;
    if (maxPages <= MAX_VIEW_ITEM_LAST_PAGE) {
    } else {
      if (maxPages - current_page >= MAX_VIEW_ITEM_LAST_PAGE) {
        length = MAX_VIEW_ITEM_LAST_PAGE
      } else {
        length = MAX_VIEW_ITEM_LAST_PAGE
        // length = MAX_VIEW_ITEM_LAST_PAGE
        // if (maxPages - current_page === 1) {
        //   length = MAX_VIEW_ITEM_LAST_PAGE - 3
        // }
        // if (maxPages - current_page === 0) {
        //   length = MAX_VIEW_ITEM_LAST_PAGE - 4
        // }
      }
    }
    const range = new Array(length)
      .fill()
      .map((_, i) => i + current_page)
      .map((el, i) => {
        console.log(!(this.props.currentPage === 3 || this.props.currentPage ===4 || this.props.currentPage ===5 || this.props.currentPage === 6 || this.props.currentPage === 7))
        if ((this.props.currentPage === 1)) {return el;}
        else if ((this.props.currentPage === 2)) {return el - 1;}
        else
        if (((maxPages - this.props.currentPage) === 0) && (!(this.props.currentPage === 3 || this.props.currentPage ===4 || this.props.currentPage ===5 || this.props.currentPage === 6 || this.props.currentPage === 7))) {return el - 6;}
        else 
        if (((maxPages - this.props.currentPage) === 1)) {return el - 5;}
        if(this.props.currentPage < 5) {
          return el - 2
        }
        if(this.props.currentPage === 5) {
          return el - 4
        }
        if(this.props.currentPage > 5 < 8) {
          return el - 5
        }
        return el - 3;
      })
    return range;
  }

  renderNumerical() {
    let arr = [];
    if (this.props?.totalCount <= MAX_VIEW_ITEM_LAST_PAGE) {
       arr = this.range(1, this.props.totalCount)
    } else {
      const countPage = Math.ceil(this.props.totalCount / this.state.defaultPageSize);
      const arrRangeBehaurePage = this.range(this.props.currentPage, this.props.totalCount);
      if( arrRangeBehaurePage[arrRangeBehaurePage.length-1] === 8 ){
        arr = [1, '...',...arrRangeBehaurePage.slice(4).slice(0,-1), countPage]
      } else if( arrRangeBehaurePage[arrRangeBehaurePage.length-1] === 6 ){
        arr = [1, '...', ...arrRangeBehaurePage.slice(3)]
      } else if( arrRangeBehaurePage[arrRangeBehaurePage.length-1] === 5 ){
        arr = [1,  ...arrRangeBehaurePage.slice(0,-1)]
      } else if( arrRangeBehaurePage.includes(1) && arrRangeBehaurePage.includes(2) && arrRangeBehaurePage.includes(3) && arrRangeBehaurePage.length < 4){
        arr = [...arrRangeBehaurePage]
      } else if( arrRangeBehaurePage.includes(1) && arrRangeBehaurePage.includes(2) && arrRangeBehaurePage.length < 4){
        arr = [...arrRangeBehaurePage]
      } else if( arrRangeBehaurePage.includes(1) || arrRangeBehaurePage.includes(2) && arrRangeBehaurePage.length < 3){
        arr = [...arrRangeBehaurePage.slice(0,-2),'...', countPage]
      }else 
      {
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
    if (this.props.totalCount > this.state.defaultPageSize) {
      if(!this.state.newListItems.length) return;
      return (
        <Pagination
          style={this.props?.style}
          totalCount={this.props?.totalCount ?? 1}
          isLoad={this.props?.isLoad}
          defaultPageSize={this.state.defaultPageSize}
          currentPage={this.props.currentPage ?? 1}
          newListItems={this.state.newListItems}
          changePagination={this.changePagination}
          defoultViewItemPaggination={MAX_VIEW_ITEM_LAST_PAGE}

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