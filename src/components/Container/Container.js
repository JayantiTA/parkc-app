import styles from './Container.module.scss';

function Container({ children, className, ...rest }) {
  let containerClassName = styles.container;

  if (className) {
    containerClassName = `${containerClassName} ${className}`;
  }

  return (
    <div className={containerClassName} {...rest}>
      {children}
    </div>
  );
}

export default Container;
