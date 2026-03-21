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
        <>
            <div className="post">i love meow </div>
            <ul className="comment-list">{commentList}</ul>
            <div className="comment-post-form">
                <label className="comment-post-name">
                    name{" "}
                    <input
                        onChange={(e) => {
                            setInput({ ...input, name: e.target });
                        }}
                        className="input-underline"
                    ></input>
                </label>

                <label className="comment-post-email">
                    email
                    <input
                        onChange={(e) => {
                            setInput({ ...input, email: e.target });
                        }}
                        name="email"
                        className="input-underline"
                    ></input>
                </label>

                <div className="comment-post-content">
                    <textarea
                        name="body"
                        onChange={(e) => {
                            setInput({ ...input, body: e.target });
                        }}
                    ></textarea>
                    <button
                        onClick={() => {
                            if (
                                !input.name?.value ||
                                !input.email?.value ||
                                !input.body?.value
                            )
                                return warning(
                                    `Complete info before post !!!`,
                                    `red`,
                                );

                            setData([
                                ...data,
                                {
                                    id: Math.random() * 10000,
                                    name: input.name.value,
                                    email: input.email.value,
                                    body: input.body.value,
                                },
                            ]);
                            // reset input
                            input.name.value = ``;
                            input.email.value = ``;
                            input.body.value = ``;
                        }}
                        className="comment-post-btn"
                    >
                        Post
                    </button>
                </div>
            </div>
        </>
    );
}

const comment = ReactDOM.createRoot(document.querySelector(`#comment`));
comment.render(
    <Comment api="https://jsonplaceholder.typicode.com/comments?postId=1"></Comment>,
);

// ===================================

const weatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
};

function Weather() {
    const [city, setCity] = React.useState(null);
    const [showList, setShowList] = React.useState(false);

    return (
        <div
            className="weather-section"
            onClick={(e) => {
                const classList = e.target.classList;
                if (classList.contains("wether-city")) {
                    setShowList(true);
                }
            }}
        >
            <div className={`wether-select-list-bg ${showList ? `show` : ``}`}>
                <ul className="wether-select-list">
                    <li className="wether-select-item">hanoi1</li>
                    <li className="wether-select-item">hanoi2</li>
                    <li className="wether-select-item">hanoi3</li>
                </ul>
            </div>
            <div className="wether-body">
                <div className="wether-body-left">
                    <div className="wether-temperature">28°</div>
                </div>
                <div className="wether-body-right">
                    <div className="wether-city">Hanoi</div>
                    <div className="weather-weather">☀️ Nắng</div>
                    <div className="weather-humidity">Độ ẩm : 65%</div>
                    <button className="weather-refresh">Làm mới</button>
                </div>
            </div>
        </div>
    );
}

const weather = ReactDOM.createRoot(document.querySelector(`#weather`));
weather.render(<Weather></Weather>);
