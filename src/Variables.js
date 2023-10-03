export const StatusesColors = {
  Queue: "#eba946",
  Development: "#00C2E0",
  Done: "#70a138",
  Height: "#f36464"
}



export const getAuthorProject = (project_user_id, usersStore) => {
  if (project_user_id !== null) {
    const author = usersStore.find(user => {
      return user.id === project_user_id;
    })

    if (author !== undefined) {
      return author.username;
    }

    return "Пользователь не найден";
  } else {
    return "Пользователь не найден";
  }
}

export const getUser = (user_id, users) => {
  return users.find(user => {
    return user.id === user_id;
  })
}

export const getUserWithParentID = (currentComment, users, comments) => {
  const comment = comments.filter((comment) => {
    return comment.parent_id === currentComment.parent_id;
  })

  // console.log(comment);

  return {
    username: "test"
  }
}

export const CountSliceFilesTask = 40;


export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export function convertTypeFileToObject(arrayFiles) {
  return arrayFiles.map(file => ({
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModifiedDate),
    webkitRelativePath: file.webkitRelativePath,
    size: file.size,
    type: file.type
  }));
}

export function convertTypeObjectToFile(arrayFiles) {
  return arrayFiles.map(obj => {
    const { name, type, size } = obj;
    const uint8Array = new Uint8Array(size);
    const blobData = new Blob([uint8Array], { type });
    return new File([blobData], name, {type});
  });
}

export const getCurrentDate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${day}\\${month}\\${year}`;
}

