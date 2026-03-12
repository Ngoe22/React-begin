const Counter = () => {
    const [num, setNum] = React.useState(0);

    const color = num > 0 ? "green" : num < 0 ? "red" : "gray";

    return (
        <>
            <div className={`counter-num ${color}`}>{num}</div>

            <div className="counter-buttons">
                <button onClick={() => setNum(num + 1)}>increase</button>
                <button onClick={() => setNum(num - 1)}>decrease</button>
                <button onClick={() => setNum(0)}>reset</button>
            </div>
        </>
    );
};
const counter = ReactDOM.createRoot(document.querySelector(`#counter`));
counter.render(<Counter></Counter>);

// ===================================

function Todo() {
    const [list, setList] = React.useState([]);

    const length = list.length;
    const completed = list.reduce((acc, value) => {
        return acc + value.completed;
    }, 0);

    return (
        <>
            <div className="todo-nums">
                <div className="todo-nums-completed">{completed}</div>
                <div className="todo-nums-total">{length}</div>
                <div className="todo-nums-incomplete">{length - completed}</div>
            </div>

            <div className="todo-get">
                <input></input>
                <button
                    onClick={(e) => {
                        const inputNode = e.target.previousElementSibling;
                        if (!inputNode.value) return alert(`Empty title`);
                        setList([
                            ...list,
                            {
                                title: inputNode.value,
                                completed: false,
                            },
                        ]);
                        inputNode.value = ``;
                    }}
                >
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {list.map((item, index) => {
                    return (
                        <li className="todo-item" key={index}>
                            <span
                                className={
                                    `todo-item-title ` +
                                    (item.completed ? `done` : ``)
                                }
                            >
                                {item.title}
                            </span>

                            <span
                                className="todo-item-edit"
                                onClick={(e) => {
                                    const parent = e.target.closest(`li`);
                                    const title =
                                        parent.querySelector(
                                            `.todo-item-title`,
                                        );
                                    if (title.contentEditable === `true`) {
                                        const newTitle =
                                            title.textContent.trim();
                                        setList(
                                            list.map((value, titleIndex) => {
                                                if (titleIndex === index) {
                                                    value.title = newTitle;
                                                }
                                                return value;
                                            }),
                                        );
                                        title.contentEditable = false;
                                        e.target.textContent = `edit`;
                                        return;
                                    }
                                    e.target.textContent = `save`;
                                    title.contentEditable = true;
                                    title.focus();
                                }}
                            >
                                edit
                            </span>

                            <span
                                className={`todo-item-status ${item.completed ? `done` : `undone`}`}
                                onClick={() => {
                                    setList(
                                        list.map((value, statusIndex) => {
                                            if (statusIndex === index) {
                                                value.completed =
                                                    !value.completed;
                                            }
                                            return value;
                                        }),
                                    );
                                }}
                            >
                                {item.completed ? `undone` : `done`}
                            </span>

                            <span
                                className="todo-item-delete"
                                onClick={() => {
                                    setList(
                                        list.filter(
                                            (value, deleteIndex) =>
                                                deleteIndex !== index,
                                        ),
                                    );
                                }}
                            >
                                delete
                            </span>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
const todo = ReactDOM.createRoot(document.querySelector(`#todoList`));
todo.render(<Todo></Todo>);

// ===================================

function Profile() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/2`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                if (!Array.isArray(res) && Object.keys(res).length)
                    setData([...[res]]);
                else if (res.length > 0) setData([...res]);
                else setData(`fail`);
            })
            .catch((error) => {
                console.log(error);
                setData(`fail`);
            });
    }, []);

    const infoList = [
        `name`,
        `username`,
        `email`,
        `phone`,
        `website`,
        `address`,
    ];

    return (
        <ul className="profile-users">
            {data === `fail` ? (
                <li className="profile-user failed">there is no data</li>
            ) : data === null ? (
                <li className="profile-user loading">loading...</li>
            ) : (
                data.map((user, index) => {
                    return (
                        <li className="profile-user" key={index}>
                            {infoList.map((value, infoIndex) => {
                                return (
                                    <div
                                        className="profile-user-info"
                                        key={infoIndex}
                                    >
                                        <span className="profile-title">
                                            {`${value} : `}
                                        </span>
                                        {value === `address`
                                            ? `${user.address.suite} - ${user.address.street} - ${user.address.city}`
                                            : `${user[value]}`}
                                    </div>
                                );
                            })}
                        </li>
                    );
                })
            )}
        </ul>
    );
}

const profile = ReactDOM.createRoot(document.querySelector(`#profile`));
profile.render(<Profile></Profile>);
