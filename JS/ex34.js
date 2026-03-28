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
    const [newTask, setNewTask] = React.useState(``);

    const [editContent, setEditContent] = React.useState(``);
    const [editId, setEditId] = React.useState(``);

    const length = list.length;
    const completed = list.reduce((acc, value) => {
        return acc + value.completed;
    }, 0);

    function createId() {
        return `${Math.floor(Math.random() * 1000)}-${Date.now()} `;
    }

    return (
        <>
            <div className="todo-nums">
                <div className="todo-nums-completed">{completed}</div>
                <div className="todo-nums-total">{length}</div>
                <div className="todo-nums-incomplete">{length - completed}</div>
            </div>

            <div className="todo-get">
                <input
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                    }}
                ></input>
                <button
                    onClick={(e) => {
                        if (!newTask) return alert(`Enter your task title`);
                        setList([
                            ...list,
                            {
                                title: newTask,
                                completed: false,
                                id: createId(),
                            },
                        ]);
                        setNewTask(``);
                    }}
                >
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {list.map((item, index) => {
                    const onEditing = editId === item.id;
                    const Tag = onEditing ? "input" : `div`;

                    return (
                        <li className="todo-item" key={item.id}>
                            <Tag
                                className={`todo-item-title${item.completed ? ` done` : ``}${onEditing ? ` onEditing` : ``}`}
                                contentEditable={onEditing}
                                defaultValue={onEditing ? item.title : null}
                                onChange={
                                    onEditing
                                        ? (e) => {
                                              setEditContent(e.target.value);
                                          }
                                        : null
                                }
                            >
                                {onEditing ? null : item.title}
                            </Tag>

                            <button
                                className="todo-item-edit"
                                onClick={(e) => {
                                    if (onEditing) {
                                        setList(
                                            list.map((value) => {
                                                if (editId === value.id) {
                                                    value.title = editContent;
                                                }
                                                return value;
                                            }),
                                        );

                                        setEditContent(``);
                                        setEditId(``);
                                    } else {
                                        setEditContent(item.title);
                                        setEditId(item.id);
                                    }
                                }}
                            >
                                {onEditing ? `save` : `edit`}
                            </button>

                            <button
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
                            </button>

                            <button
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
                            </button>
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

function Profile(props) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch(props.api)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);

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
                <li className="profile-user-failed">there is no data</li>
            ) : data === null ? (
                <li className="profile-user-loading">loading...</li>
            ) : (
                data.map((user, index) => {
                    return (
                        <li className="profile-user" key={index}>
                            {infoList.map((infoName, infoIndex) => {
                                return (
                                    <div
                                        className="profile-user-info"
                                        key={infoIndex}
                                    >
                                        <span className="profile-title">
                                            {`${infoName} : `}
                                        </span>
                                        {infoName === `address`
                                            ? `${user.address.suite} - ${user.address.street} - ${user.address.city}`
                                            : `${user[infoName]}`}
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
profile.render(
    <Profile api="https://jsonplaceholder.typicode.com/users/1"></Profile>,
);

// ===================================

function Production(props) {
    const [data, setData] = React.useState(null);
    const [modal, setModal] = React.useState(null); // index of data

    React.useEffect(() => {
        fetch(props.api)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                setData(res);
            })
            .catch((error) => {
                console.log(`data:fail`, error);
                setData(`fail`);
            });
    }, []);

    return (
        <>
            <ul className="product-list">
                {data === `fail`
                    ? `loading fail`
                    : data === null
                      ? `Loading...`
                      : data.length === 0
                        ? "There is no production"
                        : data.map((item, itemIndex) => {
                              let body = item.body.split(``);
                              let bodyText = ``;
                              if (body.length > 100) {
                                  bodyText = body.slice(0, 99).join(``) + `...`;
                              } else {
                                  bodyText = `item.body`;
                              }

                              return (
                                  <li className="product-item" key={itemIndex}>
                                      <div className="product-id">
                                          {item.id}
                                      </div>
                                      <div
                                          className="product-title"
                                          title={item.title}
                                      >
                                          {item.title}
                                      </div>
                                      <div className="product-preview">
                                          {bodyText}
                                      </div>
                                      <button
                                          className="product-learnMore"
                                          onClick={() => setModal(item)}
                                      >
                                          Learn more
                                      </button>
                                  </li>
                              );
                          })}
            </ul>
            {!modal || !data ? (
                ``
            ) : (
                <div className="product-modal">
                    <div className="product-modal-box">
                        <div className="product-modal-id">{modal.id}</div>
                        <div className="product-modal-title">{modal.title}</div>
                        <div className="product-modal-body">{modal.body}</div>
                        <button
                            className="product-modal-close"
                            onClick={() => setModal(null)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const product = ReactDOM.createRoot(document.querySelector(`#product`));
product.render(
    <Production api="https://jsonplaceholder.typicode.com/posts?_limit=12"></Production>,
);

// ===================================

const mainNotificationNode = document.createElement(`div`);
mainNotificationNode.className = `mainNotificationNode`;

function warning(text, color) {
    document.body.append(mainNotificationNode);
    setTimeout(() => {
        mainNotificationNode.classList.add(`show`);
        mainNotificationNode.classList.add(color);
        mainNotificationNode.textContent = text;
    }, 0);

    setTimeout(() => {
        mainNotificationNode.classList.remove(`show`);
        mainNotificationNode.textContent = ``;
        mainNotificationNode.remove();
    }, 4000);
}

function Comment(props) {
    const [data, setData] = React.useState(null);
    const [input, setInput] = React.useState({ name: "", email: "", body: "" });

    // if (!Comment.input) Comment.input = {};

    React.useEffect(() => {
        fetch(props.api)
            .then((res) => res.json())
            .then((array) => {
                console.log(array);
                setData(array);
            });
    }, []);

    let commentList = data
        ? data.map((item) => {
              return (
                  <li className="comment-item" key={item.id}>
                      <div className="comment-item-head">
                          <div className="comment-item-avatar">
                              <img
                                  src={`https://robohash.org/${item.id}.png`}
                              ></img>
                          </div>
                          <div className="comment-item-head-mid">
                              <div className="comment-item-name">
                                  {item.name}
                              </div>
                              <div className="comment-item-email">
                                  {item.email}
                              </div>
                          </div>
                          <div className="comment-item-postTime">
                              {item.postTime
                                  ? item.postTime
                                  : item.name.split(``).length + `m`}
                          </div>
                      </div>
                      <div className="comment-item-body">{item.body}</div>
                  </li>
              );
          })
        : `loading.....`;

    return (
        <div className="comment-wrap">
            <ul className="comment-list">{commentList}</ul>
            <div className="comment-post-form">
                <label className="comment-post-name">
                    name{" "}
                    <input
                        value={input.name}
                        onChange={(e) => {
                            setInput({ ...input, name: e.target.value });
                        }}
                        className="input-underline"
                    ></input>
                </label>

                <label className="comment-post-email">
                    email
                    <input
                        value={input.email}
                        onChange={(e) => {
                            setInput({ ...input, email: e.target.value });
                        }}
                        name="email"
                        className="input-underline"
                    ></input>
                </label>

                <div className="comment-post-content">
                    <textarea
                        name="body"
                        value={input.body}
                        onChange={(e) => {
                            setInput({ ...input, body: e.target.value });
                        }}
                    ></textarea>
                    <button
                        onClick={() => {
                            if (!input.name || !input.email || !input.body)
                                return warning(
                                    `Complete info before post !!!`,
                                    `red`,
                                );

                            setData([
                                ...data,
                                {
                                    id: Math.random() * 10000,
                                    name: input.name,
                                    email: input.email,
                                    body: input.body,
                                },
                            ]);
                            // reset input
                            setInput({ name: "", email: "", body: "" });
                        }}
                        className="comment-post-btn"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

const comment = ReactDOM.createRoot(document.querySelector(`#comment`));
comment.render(
    <Comment api="https://jsonplaceholder.typicode.com/comments?postId=1"></Comment>,
);

// ===================================

// const weatherData = {
//     hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
//     hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
//     danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
// };

function Weather() {
    const [data, setData] = React.useState({
        hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
        hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
        danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
    });
    const [city, setCity] = React.useState(null);
    const [showList, setShowList] = React.useState(false);

    function addIcon(string) {
        string = string.toLowerCase();

        const list = [
            [`nắng`, `☀️`],
            [`mây`, `🌤️`],
            [`mưa `, `🌧️`],
        ];

        for (let weather of list) {
            if (string.includes(weather[0])) return weather[1];
        }
        return ``;
    }

    return (
        <div
            className="weather-section"
            onClick={(e) => {
                const classList = e.target.classList;
                if (classList.contains("wether-city")) setShowList(true);
            }}
        >
            <div className={`wether-select-list-bg ${showList ? `show` : ``}`}>
                <ul
                    className="wether-select-list"
                    onClick={(e) => {
                        const node = e.target;
                        setShowList(false);
                        setCity(node.getAttribute(`data-weather-city`));
                    }}
                >
                    {Object.entries(data).map((value) => (
                        <li
                            className="wether-select-item"
                            data-weather-city={value[0]}
                            key={value[0]}
                        >
                            {value[1].city}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="wether-body">
                <div className="wether-body-left">
                    <div className="wether-temperature">
                        {`${city ? data[city].temp : `0`}`}
                        <span>°C</span>
                    </div>
                </div>
                <div className="wether-body-right">
                    <div className="wether-city">
                        {city ? data[city].city : `Thành phố`}
                    </div>
                    <div className="weather-weather">
                        {city
                            ? `${addIcon(data[city].weather)} ${data[city].weather}`
                            : `--`}
                    </div>
                    <div className="weather-humidity">
                        {city ? `Độ ẩm :  ${data[city].humidity}%` : `--`}
                    </div>
                    <button
                        className="weather-refresh"
                        onClick={() => {
                            if (!city) return;

                            setData({
                                ...data,
                                [city]: {
                                    ...data[city],
                                    temp:
                                        data[city].temp +
                                        [-2, 2][Math.floor(Math.random() * 2)],
                                    humidity:
                                        data[city].temp +
                                        [-3, 3][Math.floor(Math.random() * 2)],
                                },
                            });
                        }}
                    >
                        Làm mới
                    </button>
                </div>
            </div>
        </div>
    );
}

const weather = ReactDOM.createRoot(document.querySelector(`#weather`));
weather.render(<Weather></Weather>);
