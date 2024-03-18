import styles from './StudioLogo.module.scss';
export default function StudioLogo(props) {
    return (
        <div style={{ display: 'flex' ,padding:"15px 15px 0 15px"}}>
            <img className={styles.image}
                src="/assets/images/studio/myavaIcon1.svg" alt="MyavaStudioICon" />
            <h2 className={styles.heading} style={{ color: props.color }}>{props.title}</h2>
            <img src={props.src} alt="playIcon" />
        </div>
    )
}