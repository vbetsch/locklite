type TitleProps = {
    label: string
}

export default function Title(props: TitleProps) {
    return (
        <h1>{props.label}</h1>
    )
}
