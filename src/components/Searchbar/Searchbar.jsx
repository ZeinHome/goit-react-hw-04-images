import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handelImageChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handelSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Введите текст!');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handelSubmit}>
          <SearchFormBtn type="submit">
            <AiOutlineSearch size={25} />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handelImageChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
