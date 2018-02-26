import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';



export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: '',
      inputAuthor: '',
      inputContent: '',
    };
  }

  componentDidMount = () => {
    this.setState({ inputAuthor: localStorage.getItem('Author') || 'Author' });
    this.setState({ inputTitle: localStorage.getItem('Title') || 'Title' });
    this.setState({ inputContent: localStorage.getItem('Content') || 'Content' });
  }
  componentDidUpdate = () => {
  /*  console.log('inputTitle ', this.state.inputTitle);
    console.log('inputName ', this.state.inputAuthor);
    console.log('inputContent ', this.state.inputContent);
    console.log('local', localStorage.getItem("Author"));*/
    localStorage.setItem('Author', this.state.inputAuthor);
    localStorage.setItem('Title', this.state.inputTitle);
    localStorage.setItem('Content', this.state.inputContent);
  }
  handleChange = (event) => {
    if (event.target.name === 'Title') {
      this.setState({ inputTitle: event.target.value });
    }
    if (event.target.name === 'Author') {
      this.setState({ inputAuthor: event.target.value });
    }
    if (event.target.name === 'Content') {
      this.setState({ inputContent: event.target.value });
    }
  }
  handleSubmit = () => {
    localStorage.removeItem('Author');
    localStorage.removeItem('Title');
    localStorage.removeItem('Content');
    console.log('consolouje usuniety tag', localStorage.getItem('Author'));
    this.setState({ inputAuthor: 'Author' });
    this.setState({ inputTitle: 'Title' });
    this.setState({ inputContent: 'Content' });
  }
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
      this.handleSubmit();
    }
  };
  // this.props.intl.messages.authorName  defaultValue={localStorage.getItem("Author")}
  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']} >
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.state.inputAuthor} value={this.state.inputAuthor} className={styles['form-field']} ref="name" name="Author" onChange={this.handleChange} />
          <input placeholder={this.props.intl.messages.postTitle} value={this.state.inputTitle} className={styles['form-field']} ref="title" name="Title" onChange={this.handleChange} />
          <textarea placeholder={this.props.intl.messages.postContent} value={this.state.inputContent} className={styles['form-field']} ref="content" name="Content" onChange={this.handleChange} />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
