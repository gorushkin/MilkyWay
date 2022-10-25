import styles from './PageLayout.module.scss';

type IWithPagelayout = (Component: React.FunctionComponent | undefined) => React.FunctionComponent;

export const withPagelayout: IWithPagelayout = (Component) => () =>
  Component ? (
    <div className={styles.wrapper}>
      <Component />
    </div>
  ) : null;
