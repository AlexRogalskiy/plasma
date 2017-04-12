import * as React from 'react';
import { ModalPrompt } from '../ModalPrompt';

export interface IPromptExamplesState {
  isOpened: boolean;
}

export class PromptExamples extends React.Component<any, IPromptExamplesState> {

  constructor(props: any) {
    super(props);
    this.state = { isOpened: false };
  }

  openPrompt() {
    this.setState({ isOpened: true });
  }

  cancel() {
    this.setState({ isOpened: false });
  }

  confirm() {
    this.setState({ isOpened: false });
  }

  render() {
    return (
      <div className='mt2'>
        <div className='form-group'>
          <label className='form-control-label'>Modal prompt</label>
          <div>
            <button
              className='btn mod-primary'
              onClick={() => this.openPrompt()}>
              Open Prompt
            </button>
            <ModalPrompt
              id='prompt-confirmation'
              isOpened={this.state.isOpened}
              message='This is the message.'
              confirmLabel='Confirm'
              title='Confirmation prompt'
              onCancel={() => this.cancel()}
              onConfirm={() => this.confirm()}
              cancelLabel='Cancel'
            />
          </div>
        </div>
      </div>
    );
  };
}
