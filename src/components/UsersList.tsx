type UsersListProps = {
    users: string[]
}

export default function UsersList(props: UsersListProps) {
    return (
        <ul>
            {props.users.map((user, index) => (
                <li key={index}>{user}</li>
            ))}
        </ul>
    )
}
