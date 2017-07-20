import * as React from 'react';

export interface ISelectedOptionProps {
  displayValue: string;
  onRemoveClick?: (value: string) => void;
  key: string;
}

export class SelectedOption extends React.Component<ISelectedOptionProps, any> {

  handleOnRemove() {
    if (this.props.onRemoveClick) {
      this.props.onRemoveClick(this.props.displayValue);
    }
  }

  render() {
    return (
      <div className='selected-option' >

        <div className='selected-option-value'>
          {this.props.displayValue}
        </div>

        <div className='selected-option-separator' />

        <div className='remove-option' onClick={() => this.handleOnRemove()} />

      </div>
    );
  }
}
