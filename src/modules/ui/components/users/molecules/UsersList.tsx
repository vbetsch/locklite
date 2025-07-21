import UserItem from "@ui/components/users/atoms/UserItem";
import {UserModelDto} from "@shared/dto/models/user.model.dto";

type UsersListProps = {
    users: UserModelDto[]
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
