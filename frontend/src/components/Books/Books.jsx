import ax from "axios";
import BookItem from "./BookItem";
import React, { Component } from "react";

class Books extends Component {
  state = {
    books: [],
    isLoaded: false
  };

  componentDidMount = () => {
    ax.get("/wp-json/wp/v2/books")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          books: data,
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { books, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          {books.map(book => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      );
    } else {
      return <h5>Loading...</h5>;
    }
  }
}

export default Books;
