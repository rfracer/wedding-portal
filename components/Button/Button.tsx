import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

type Props = {
  outline?: boolean;
  wide?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  children?: React.ReactNode;
  color?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  onClick,
  outline,
  type,
  wide,
  loading,
  color,
}: Props) => {
  const classes = `${styles.btn} ${outline ? styles.btnOutline : ''} ${
    wide ? styles.btnFullWidth : ''
  }`;

  return (
    <button
      onClick={onClick ? onClick : null}
      className={classes}
      type={type ? type : 'button'}
      style={{ background: `${color}`, borderColor: `${color}` }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
