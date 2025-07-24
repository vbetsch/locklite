import styles from './Loader.module.css';
import type { JSX } from 'react';

export default function Loader(): JSX.Element {
  return <span className={styles.loader} aria-label="Loading" />;
}
