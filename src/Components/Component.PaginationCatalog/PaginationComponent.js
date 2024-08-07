import React, { PureComponent } from 'react';
import Pagination from '../../View/Pagination/Pagination';
import { connectStoreon } from 'storeon/react';
import { MAX_VIEW_ITEM, DEFAULT_PAGE_SIZE } from '../../helpers/config';
import Offset from '../../View/Offset';
import { smoothTop } from '../../helpers/helpers';

class PaginationComponent extends PureComponent {

  state = {
    newListItems: [],
    currentPage: this.props?.currentPage
  }

  componentDidMount() {
    this.renderNumerical()
  }

  componentDidUpdate(prevProps, prevState) {
    if (+this.props.currentPage !== +prevProps.currentPage || +this.props.totalCount !== +prevProps.totalCount) {
      this.renderNumerical()
    }
  }
  range = (current_page, total_items) => {
    const maxPages = Math.ceil(total_items / (this.props?.defaultPageSize ?? DEFAULT_PAGE_SIZE)); // 2
    let length = maxPages;
    if (maxPages <= MAX_VIEW_ITEM) {
    } else {
      if (maxPages - current_page >= MAX_VIEW_ITEM) {
        length = MAX_VIEW_ITEM
      } else {
        length = MAX_VIEW_ITEM
        if (maxPages - current_page === 1) {
          length = MAX_VIEW_ITEM - 1
        }
        if (maxPages - current_page === 0) {
          length = MAX_VIEW_ITEM - 2
        }
      }
    }
    const range = new Array(length)
      .fill()
      .map((_, i) => i + current_page)
      .map((el, i) => {
        if ((this.props.currentPage === 1)) return el;
        if ((this.props.currentPage === 2)) return el - 1;
        return el - 2
      })
    return range;
  }

  renderNumerical() {
    if (this.props?.totalCount < MAX_VIEW_ITEM) {
      this.state.newListItems = this.range(1, this.props.totalCount)
    } else {
      const arr = this.range(this.props.currentPage, this.props.totalCount)
      this.setState({
        newListItems: [...arr]
      })
    }
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
    if (this.props.totalCount > (this.props?.defaultPageSize ?? DEFAULT_PAGE_SIZE)) {
      return (
        <Pagination
          style={this.props?.style}
          totalCount={this.props?.totalCount ?? 1}
          isLoad={this.props?.isLoad}
          currentPage={this.props.currentPage ?? 1}
          newListItems={this.state.newListItems}
          changePagination={this.changePagination}
          defaultPageSize={this.props?.defaultPageSize ?? DEFAULT_PAGE_SIZE}
        />
      );
    }
    return <Offset mb={30} />

  }
}

export default connectStoreon(
  'tg',
  PaginationComponent
)