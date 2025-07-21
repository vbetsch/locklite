import {UserModelDto} from "@shared/dto/models/user.model.dto";

type UserItemProps = {
    user: UserModelDto
}

export default function UserItem(props: UserItemProps) {
    return (
        <li>{props.user.email}</li>
    )
}
