/*import { Component } from 'react';
import styles from './Filter.module.css';
import { toast } from 'react-toastify';

class Filter extends Component {
  state = {
    toDoText: '',
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({[name]: value})
  };
  
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.toDoText === '') {
      toast.error('ToDo empty')
    }
    else {
      this.props.onSubmit(this.state);
    };
    this.reset();
  };
    
  reset = () => {
    this.setState({ toDoText: '' });
  };
    
  render() {
    return (<>  
      <form className={styles.box}
        onSubmit={this.handleSubmit}
        autoComplete="off">
        <label htmlFor={this.toDoTextId} className={styles.toDo}>
          <input
            type='text'
            name='toDoText'
            value={this.state.toDoText}
            onChange={this.handleChange}
            className={styles.input}
            placeholder='Set your location' />
        </label>
        <button type='search' className={styles.button}>
          Search
        </button>
      </form>
    </>)
  };
};

export default Filter;
*/
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

function Filter({ value, placeholder, onChange }) {
  return (
    <label className={styles.label}>
      <input
        type='text'
        value={value}
        onChange={onChange}
        name='filter'
        className={styles.input}
        placeholder={placeholder}
      />
    </label>
  )
}

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};


export default Filter; 