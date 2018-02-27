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
    if (localStorage.getItem('myApp')) {
      let appState = localStorage.getItem('myApp');
      appState = JSON.parse(appState);
      this.setState({
        inputAuthor: appState.MyAppFormData.Author,
        inputTitle: appState.MyAppFormData.Title,
        inputContent: appState.MyAppFormData.Content,
      });
    }
    if (!localStorage.getItem('myApp')) {
      this.setState({
        inputAuthor: 'Author',
        inputTitle: 'Title',
        inputContent: 'Content',
      });
    }
  }
  handleChange = (event) => {
    const inputName = event.target.name;
    this.setState({ [inputName]: event.target.value });
    const myApp = {
      MyAppFormData: {
        Title: this.state.inputTitle,
        Content: this.state.inputContent,
        Author: this.state.inputAuthor,
      },
    };
    localStorage.setItem('myApp', JSON.stringify(myApp));
  }
  handleSubmit = () => {
    localStorage.removeItem('myApp');
  //  console.log('consolouje usuniety tag', localStorage.getItem('myApp'));
    this.setState({ 
      inputAuthor: 'Author',
      inputTitle: 'Title',
      inputContent: 'Content',
    });
  }
  addPost = () => {
    if (this.state.inputAuthor && this.state.inputTitle && this.state.inputContent) {
      this.props.addPost(this.state.inputAuthor, this.state.inputTitle, this.state.inputContent);
      this.handleSubmit();
    }
  };
  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']} >
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input value={this.state.inputAuthor} className={styles['form-field']} name="inputAuthor" onChange={this.handleChange} />
          <input value={this.state.inputTitle} className={styles['form-field']} name="inputTitle" onChange={this.handleChange} />
          <textarea value={this.state.inputContent} className={styles['form-field']} name="inputContent" onChange={this.handleChange} />
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
