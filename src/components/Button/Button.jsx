import { BtnLoader } from './Button.styled';

function Button({ onLoadMore }) {
  return <BtnLoader onClick={onLoadMore}>Load more</BtnLoader>;
}

export default Button;
