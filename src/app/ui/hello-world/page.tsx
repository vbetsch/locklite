'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";
import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {UserService} from "@ui/services/user.service";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";

export default function HelloWorldPage() {
    const [users, setUsers] = useState<UserModelDto[]>([])

    useEffect(() => {
        void (async () => {
            try {
                const data: GetAllUsersResponseDto = await UserService.getAll();
                setUsers(data.users);
            } catch (error) {
                console.error('Error:', error);
            }
        })()
    }, [])

    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            <UsersList users={users}/>
        </div>
    )
}
