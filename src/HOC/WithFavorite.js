import React from 'react'

export const WithFavorite = (Component) => {

  class Favorite extends React.Component {
    toggleFavorite = (data) => {
      this.props.dispatch('togglefavoriteMPCards', { ...data })
    }
    removeFavorite = (data) => {
      this.props.dispatch('removeFavoriteMPCards', { ...data })
    }
    render() {
      return <Component
        toggleFavorite={this.toggleFavorite}
        removeFavorite={this.removeFavorite}
        {...this.props}

      />
    }
  }
  return Favorite;
}


