import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

type Props = {
  outline?: boolean;
  wide?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick, outline, type, wide, loading }: Props) => {
  const classes = `${styles.btn} ${outline ? styles.btnOutline : ''} ${
    wide ? styles.btnFullWidth : ''
  }`;

  return (
    <button
      onClick={onClick ? onClick : null}
      className={classes}
      type={type ? type : 'button'}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
