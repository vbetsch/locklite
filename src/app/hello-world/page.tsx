import styles from './page.module.css'
import Title from "@/components/Title";

export default function HelloWorldPage() {
    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            <ul>
              <li>example</li>
              <li>foo</li>
              <li>bar</li>
            </ul>
        </div>
    )
}
