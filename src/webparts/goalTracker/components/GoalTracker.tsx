import * as React from 'react';
import styles from './GoalTracker.module.scss';
import { IGoalTrackerProps } from './IGoalTrackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import './temp.css';

import App from './App';

export default class GoalTracker extends React.Component<IGoalTrackerProps, {}> {
  public render(): React.ReactElement<IGoalTrackerProps> {
    return (
      <div className={styles.appWrap}>
        <App
          context={this.props.context}
        />
      </div>
    );
  }
}
