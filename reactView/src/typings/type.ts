/**
 * 全局通用的类型定义
 */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface Props {
  children?: JSX.Element[] | JSX.Element | React.ReactNode;
  className?: string;
}

export interface RoutedProps extends Props, RouteComponentProps {}

declare global {
  interface Window {
    smartUtil:any,
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}