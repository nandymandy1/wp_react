import ax from "axios";
import { Link } from "react-router-dom";
import React, { Component, Fragment } from "react";

class BookPage extends Component {
  state = {
    book: {},
    isLoaded: false
  };

  componentDidMount = async () => {
    try {
      let { data } = await ax.get(
        `/wp-json/wp/v2/books/${this.props.match.params.id}`
      );
      this.setState({
        book: data,
        isLoaded: true
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { book, isLoaded } = this.state;
    return isLoaded ? (
      <Fragment>
        <Link to="/">Go Back</Link>
        <hr />
        <h1>{book.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: book.content.rendered }}></div>
        <h4>Publisher: {book.acf.publisher}</h4>
      </Fragment>
    ) : (
      <h5>Loading...</h5>
    );
  }
}

export default BookPage;
