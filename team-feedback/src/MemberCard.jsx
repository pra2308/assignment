
export default function MemberCard(props) {
    return (
        <div>
            <h3>Member Name= {props.name}</h3>
            <p>Feedback: {props.count}</p>
            <button onClick={props.onIncrease}>Increase</button>
        </div>
    );
}
