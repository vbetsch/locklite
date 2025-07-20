type UserItemProps = {
    user: string
}

export default function UserItem(props: UserItemProps) {
    return (
        <li>{props.user}</li>
    )
}
