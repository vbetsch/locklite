'use client'
import styles from './page.module.css'
import { useState } from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";

export default function HelloWorldPage() {
    const [users, ] = useState<string[]>(['example', 'foo', 'nar'])

    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            <UsersList users={users}/>
        </div>
    )
}
