import { JSX } from 'react';

type TitleProps = {
  label: string;
};

export default function Title(props: TitleProps): JSX.Element {
  return <h1>{props.label}</h1>;
}
