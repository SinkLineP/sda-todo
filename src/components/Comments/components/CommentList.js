import React from "react";


const CommentList = ({ data, setData }) => {
  console.log(data);

  if (data.length !== 0) {
    return data.map((comment) => {
      return (
        <div key={comment.id}>
          <p>User ID: {comment.user_id}. Comment: {comment.content}.</p>
        </div>
      );
    })
  } else {
    return <p>Комментариев не найдено!</p>;
  }


}

export default CommentList;