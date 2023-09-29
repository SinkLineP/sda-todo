import React, {useEffect, useRef, useState} from "react";
import "./CascadeComments.css";
import Action from "../Action/Action";


export default function CascadeComments({ comment, handleDeleteNode, handleEditNode, handleInsertNode }) {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(comment.id === 1);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand); // Обновляем состояние expand сначала
    if (!expand) {
      setShowInput(true); // Показываем поле ответа только если expand стал true
    }
  }
  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setInput("")
      setShowInput(false);
    }

    if (editMode) {
      setEditMode(false)
    }
  };

  return (
    <>
      <div>
        <div className={comment.id === 1 ? "" : "comment-container"}>
          {comment.id === 1 ? (
            <>
            <textarea
              className={"task-comment-input"}
              autoFocus
              placeholder={"Введите комментарий.."}
              value={input}
              onChange={(val) => setInput(val.target.value)}
            />

              <div className={"container-button-send"}>
                <button className={"button-send"} onClick={onAddComment}>
                  Отправить
                </button>
              </div>
            </>
          ) : (
            <>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                style={{ wordWrap: "break-word" }}
                ref={inputRef}
              >
                {comment.name}
              </span>

              <div style={{
                display: 'flex',
                marginTop: '5px'
              }}>
                {
                  editMode ? (
                    <>
                      <Action
                        className={"reply no-select-text"}
                        type={"Сохранить"}
                        handleClick={onAddComment}
                      />
                      <Action
                        className={"reply no-select-text"}
                        type={"Отменить"}
                        handleClick={() => {
                          if (inputRef.current) {
                            inputRef.current.innerText = comment.name;
                          }

                          setEditMode(false)
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Action
                        className={"reply no-select-text"}
                        type={
                          <>
                            {expand ? ("▲") : ("▼")}
                          </>
                        }
                        handleClick={handleNewComment} />
                      <Action
                        className={"reply no-select-text"}
                        type={"Редактировать"}
                        handleClick={() => {
                          setEditMode(true)
                        }}
                      />
                      <Action className={"reply no-select-text"} type={"Удалить"} />
                    </>
                  )
                }
              </div>
            </>
          )}
        </div>

        <div style={{
          display: expand ? "block" : "none",
          paddingLeft: "25px"
        }}>
          {showInput && (
            <div className={"input-container"}>
              <input
                type={"text"}
                className={"input-container__input"}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div style={{
                display: "flex"
              }}>
                <Action
                  className={"reply no-select-text"}
                  type={"Ответить"}
                  handleClick={onAddComment}
                />
                <Action
                  className={"reply no-select-text"}
                  type={"Отменить"}
                  handleClick={() => {
                    setShowInput(false)
                  }}
                />
              </div>

            </div>
          )}

          {comment?.items?.map((c) => {
            return <CascadeComments
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              key={c.id}
              comment={c}
            />
          })}
        </div>

      </div>
    </>
  );
}