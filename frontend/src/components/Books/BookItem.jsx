import ax from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class BookItem extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  state = {
    author: "",
    imageURL: "",
    isLoaded: false
  };

  componentDidMount = () => {
    const { featured_media, author } = this.props.book;
    const getImageUrl = ax.get(`/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = ax.get(`/wp-json/wp/v2/users/${author}`);
    Promise.all([getImageUrl, getAuthor]).then(res => {
      this.setState({
        imageURL: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true
      });
    });
  };

  render() {
    const { id, title, excerpt } = this.props.book;
    const { author, imageURL, isLoaded } = this.state;
    return isLoaded ? (
      <div style={{ border: "2px solid", marginBottom: "5px", padding: "5px" }}>
        <h3 style={{ marginBottom: "0" }}>{title.rendered}</h3>
        <small>
          Review By <strong>{author}</strong>{" "}
        </small>
        <img style={{ width: "100%" }} src={imageURL} alt={title.rendered} />
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
        <Link to={`/book/${id}`}>Read Review </Link>
        <hr />
      </div>
    ) : null;
  }
}

export default BookItem;
