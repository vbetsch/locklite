import UserItem from "@/components/users/atoms/UserItem";

type UsersListProps = {
    users: string[]
}

export default function UsersList(props: UsersListProps) {
    return (
        <ul>
            {props.users.map((user, index) => (
                <UserItem key={index} user={user}/>
            ))}
        </ul>
    )
}
