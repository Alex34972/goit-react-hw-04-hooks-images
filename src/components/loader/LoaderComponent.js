import Loader from 'react-loader-spinner';
import { Component } from 'react';
import s from './LoaderComponent.module.css';
export default class LoaderComponent extends Component {
  render() {
    return (
      <div className={s.Loader}>
        <Loader type="Bars" color="#00BFFF" height={80} width={80} />;
      </div>
    );
  }
}
