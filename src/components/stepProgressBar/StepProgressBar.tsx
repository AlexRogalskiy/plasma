import * as React from 'react';
import { range } from 'underscore';
import * as classNames from 'classnames';

export interface IStepProgressBarProps {
  /**
   * A positive integer above zero
   */
  numberOfSteps: number;
  /**
   * The 0-based index of the step currently in completion by the user
   */
  currentStep: number;
  className?: string[] | string;
}

export const StepProgressBar = (props: IStepProgressBarProps) => {
    const { numberOfSteps, currentStep } = props;
    const stepProgressBarSteps = range(numberOfSteps).map((stepNumber: number) => (
      <div
        className={classNames('step-progress-bar full-content-x', {
          'step-progress-bar-done': stepNumber < currentStep,
          'step-progress-bar-doing': stepNumber === currentStep,
          'step-progress-bar-to-do': stepNumber > currentStep,
        })}>
      </div>
    ));

    return (
      <div className={classNames('step-progress-bar-container', props.className)}>
        {stepProgressBarSteps}
      </div>
    );
};
