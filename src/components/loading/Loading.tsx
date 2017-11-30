import * as React from 'react';

export interface ILoadingOwnProps extends React.ClassAttributes<Loading> {
  id?: string;
  hide?: boolean;
  // loading table props
  columnsPerRow?: number;
  numberOfRows?: number;
}

export interface ILoadingDispatchProps {
  onRender?: () => void;
  onDestroy?: () => void;
}

export interface ILoadingProps extends ILoadingOwnProps, ILoadingDispatchProps { }

export class Loading extends React.Component<ILoadingProps, any> {

  componentWillMount() {
    if (this.props.onRender) {
      this.props.onRender();
    }
  }

  componentWillUnmount() {
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }

  render() {
    const spinner: JSX.Element = (
      <div className='spinner'>
        <div className='bounce1'></div>
        <div className='bounce2'></div>
        <div className='bounce3'></div>
      </div>
    );

    return this.props.hide ? null : spinner;
  }
}
