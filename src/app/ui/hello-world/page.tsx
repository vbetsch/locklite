'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";
import {UserDto} from "@shared/dto/user.dto";
import {UserService} from "@ui/services/user.service";

export default function HelloWorldPage() {
    const [users, setUsers] = useState<UserDto[]>([])

    useEffect(() => {
        void (async () => {
            try {
                const users: UserDto[] = await UserService.getAll();
                setUsers(users);
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
